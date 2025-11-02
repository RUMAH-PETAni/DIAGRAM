-- Create service_requests table
CREATE TABLE public.service_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_titles TEXT[] NOT NULL, -- Array of requested service titles
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own service requests" ON public.service_requests
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own service requests" ON public.service_requests
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own service requests" ON public.service_requests
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own service requests" ON public.service_requests
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger to update 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_requests_updated_at 
  BEFORE UPDATE ON public.service_requests 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: If you want to allow service team to view all requests
CREATE POLICY "Service team can view all service requests" ON public.service_requests
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND (profiles.role = 'admin' OR profiles.role = 'service_team')
  ));

-- Optional: If you want to allow service team to update all requests
CREATE POLICY "Service team can update all service requests" ON public.service_requests
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND (profiles.role = 'admin' OR profiles.role = 'service_team')
  ));