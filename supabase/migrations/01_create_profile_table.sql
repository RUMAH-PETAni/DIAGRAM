-- 1) Create profiles table (no FK to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  email text,
  full_name text,
  phone text,
  gender text CHECK (gender IN ('Male', 'Female', 'Laki-laki', 'Perempuan')),
  address text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- 2) Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3) Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4) RLS policies
-- Allow authenticated users to SELECT only their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT TO authenticated
USING ((id = (SELECT auth.uid())));

-- Allow authenticated users to INSERT a profile for themselves (and prevent inserting for others)
CREATE POLICY "profiles_insert_own" ON public.profiles
FOR INSERT TO authenticated
WITH CHECK ((id = (SELECT auth.uid())));

-- Allow authenticated users to UPDATE their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE TO authenticated
USING ((id = (SELECT auth.uid())))
WITH CHECK ((id = (SELECT auth.uid())));

-- Allow authenticated users to DELETE their own profile (optional; remove if you don't want users deleting)
CREATE POLICY "profiles_delete_own" ON public.profiles
FOR DELETE TO authenticated
USING ((id = (SELECT auth.uid())));

-- 5) Helpful index on role for lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);

-- 6) SECURITY DEFINER function to create a profile when an auth user is created
-- Note: This function should be owned by the DB owner / service-role owner for safety.
CREATE OR REPLACE FUNCTION public.handle_auth_user_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Try to insert a profile row for the new user. If a profile already exists, do nothing.
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, now(), now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- IMPORTANT: After creating the function, change its owner to the DB owner (example below).
-- Replace "postgres" with your database owner role if different.
-- ALTER FUNCTION public.handle_auth_user_created() OWNER TO postgres;

-- Revoke execute from anon/authenticated to prevent misuse (keep only superuser/owner or service_role)
REVOKE EXECUTE ON FUNCTION public.handle_auth_user_created() FROM anon, authenticated;

-- 7) Trigger on auth.users inserts to call the handler
-- Depending on your Supabase setup, auth.users might be in "auth" schema. Use the correct schema if different.
DO $$
BEGIN
  -- Drop existing trigger if present
  PERFORM 1 FROM pg_trigger WHERE tgname = 'auth_user_created_profile_trigger';
  IF FOUND THEN
    EXECUTE 'DROP TRIGGER IF EXISTS auth_user_created_profile_trigger ON auth.users;';
  END IF;
EXCEPTION WHEN undefined_table THEN
  -- If auth.users doesn't exist in this environment, skip
  RAISE NOTICE 'auth.users table not found; skipping trigger creation. Create trigger manually if needed.';
END;
$$;

-- Create trigger only if auth.users exists
CREATE OR REPLACE FUNCTION public._create_auth_trigger_if_exists()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF to_regclass('auth.users') IS NOT NULL THEN
    -- Drop if exists then create
    DROP TRIGGER IF EXISTS auth_user_created_profile_trigger ON auth.users;
    CREATE TRIGGER auth_user_created_profile_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_auth_user_created();
  ELSE
    RAISE NOTICE 'auth.users does not exist in this database; trigger not created.';
  END IF;
END;
$$;

SELECT public._create_auth_trigger_if_exists();
DROP FUNCTION public._create_auth_trigger_if_exists();

-- 8) Optional: Grant minimal SELECT/INSERT/UPDATE privileges to authenticated role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

-- Finished
COMMENT ON TABLE public.profiles IS 'User profile records; id = auth.uid(). No FK to auth.users to avoid cross-schema permission issues.';