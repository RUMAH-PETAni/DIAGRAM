// lib/supabase/types.ts
export interface ServiceRequest {
  id: string;
  user_id: string | null;
  service_titles: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  additional_notes?: string;
  created_at: string;
  updated_at: string;
}

// lib/services/requests.ts
import { createClient } from '@/lib/supabase/client';

export interface CreateServiceRequestParams {
  serviceTitles: string[];
  additionalNotes?: string;
}

export const createServiceRequest = async ({
  serviceTitles,
  additionalNotes
}: CreateServiceRequestParams): Promise<{ success: boolean; error?: string; requestId?: string }> => {
  try {
    const supabase = createClient();
    
    // Using the custom function created in the migration
    const { data, error } = await supabase
      .rpc('create_service_request', {
        p_service_titles: serviceTitles,
        p_additional_notes: additionalNotes || null
      });

    if (error) {
      console.error('Error creating service request:', error);
      return { success: false, error: error.message };
    }

    return { success: true, requestId: data as unknown as string };
  } catch (error) {
    console.error('Unexpected error creating service request:', error);
    return { success: false, error: (error as Error).message };
  }
};

export const getUserServiceRequests = async (): Promise<{ 
  requests: ServiceRequest[]; 
  success: boolean; 
  error?: string 
}> => {
  try {
    const supabase = createClient();
    
    // Using the custom function or direct table access with RLS
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching service requests:', error);
      return { requests: [], success: false, error: error.message };
    }

    return { requests: data as ServiceRequest[], success: true };
  } catch (error) {
    console.error('Unexpected error fetching service requests:', error);
    return { requests: [], success: false, error: (error as Error).message };
  }
};

// To update request status (typically called by admin/service team)
export const updateServiceRequestStatus = async (
  requestId: string,
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .rpc('update_service_request_status', {
        p_request_id: requestId,
        p_status: status
      });

    if (error) {
      console.error('Error updating service request status:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating service request status:', error);
    return { success: false, error: (error as Error).message };
  }
};