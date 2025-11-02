-- Create function to insert service request
CREATE OR REPLACE FUNCTION create_service_request(
  p_service_titles TEXT[],
  p_additional_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_request_id UUID;
BEGIN
  INSERT INTO public.service_requests (user_id, service_titles, additional_notes)
  VALUES (auth.uid(), p_service_titles, p_additional_notes)
  RETURNING id INTO new_request_id;
  
  RETURN new_request_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_service_request(TEXT[], TEXT) TO authenticated;

-- Create function to update service request status
CREATE OR REPLACE FUNCTION update_service_request_status(
  p_request_id UUID,
  p_status TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_user_id UUID;
  team_user_role TEXT;
BEGIN
  -- Get the user_id of the request to verify ownership
  SELECT user_id INTO request_user_id FROM public.service_requests WHERE id = p_request_id;
  
  -- Check if current user is the owner OR has service_team/admin role
  IF (request_user_id = auth.uid()) OR
     (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'service_team'))) 
  THEN
    UPDATE public.service_requests 
    SET status = p_status, updated_at = NOW()
    WHERE id = p_request_id;
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_service_request_status(UUID, TEXT) TO authenticated;

-- Create function to get user's service requests
CREATE OR REPLACE FUNCTION get_user_service_requests()
RETURNS TABLE (
  id UUID,
  service_titles TEXT[],
  status TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.id,
    sr.service_titles,
    sr.status,
    sr.additional_notes,
    sr.created_at,
    sr.updated_at
  FROM public.service_requests sr
  WHERE sr.user_id = auth.uid()
  ORDER BY sr.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_service_requests() TO authenticated;