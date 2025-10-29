-- =======================================================
-- 1. CREATE profiles TABLE (kalau belum ada)
-- =======================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  email text,
  username text,
  full_name text,
  phone text,
  gender text CHECK (gender IN ('Male', 'Female')),
  address text,
  role text CHECK (role IN ('Admin', 'Field Officer', 'Guest')),
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- =======================================================
-- 2. TRIGGER updated_at otomatis
-- =======================================================
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

-- =======================================================
-- 3. ENABLE RLS & BUAT POLICIES
-- =======================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT TO authenticated
USING (id = auth.uid());

CREATE POLICY "profiles_insert_own" ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

-- =======================================================
-- 4. FUNCTION: dari auth.users ke profiles
-- =======================================================
CREATE OR REPLACE FUNCTION public.handle_auth_user_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  display_name text;
BEGIN
  display_name := NEW.raw_user_meta_data->>'display_name';

  INSERT INTO public.profiles (id, email, username, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    display_name,
    display_name,
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auth_user_created_profile_trigger ON auth.users;
CREATE TRIGGER auth_user_created_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_auth_user_created();

-- =======================================================
-- 5. FUNCTION: dari profiles ke auth.users (sinkron dua arah)
-- =======================================================
CREATE OR REPLACE FUNCTION public.sync_profile_to_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{display_name}',
        to_jsonb(NEW.username)
      )
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profile_update_auth_meta_trigger ON public.profiles;
CREATE TRIGGER profile_update_auth_meta_trigger
AFTER UPDATE OF username, full_name ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_to_auth_user();

-- =======================================================
-- 6. INDEX & COMMENT (opsional)
-- =======================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);
COMMENT ON TABLE public.profiles IS 'Extended user profile data synced two-way with auth.users.';
