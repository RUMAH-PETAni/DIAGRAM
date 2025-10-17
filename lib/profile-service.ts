'use client';

import { SupabaseClient } from '@supabase/supabase-js';

export type ProfileData = {
  full_name?: string | null;
  phone?: string | null;
  gender?: string | null;
  address?: string | null;

  avatar_url?: string | null;
};

export async function fetchProfile(supabase: SupabaseClient) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, phone, gender, address, role, avatar_url, created_at, updated_at')
      .eq('id', user.id)
      .single();

    // Handle table not found error
    if (error && error.code === '42P01') { // 42P01 is the error code for undefined table
      console.warn('Profiles table does not exist. Please run migrations.');
      return { 
        id: user.id,
        email: user.email || null,
        full_name: null,
        phone: null,
        gender: null,
        address: null,

        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    if (error && error.code !== 'PGRST116') { // PGRST116 is for no rows returned
      throw new Error(`Error fetching profile: ${error.message}`);
    }

    // If no profile exists, return a complete object with empty fields
    if (!data) {
      return { 
        id: user.id,
        email: user.email || null,
        full_name: null,
        phone: null,
        gender: null,
        address: null,
     
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    return data;
  } catch (error) {
    // Check if it's a table not found error
    if (error instanceof Error && (error.message.includes('42P01') || error.message.includes('could not find the table'))) {
      console.warn('Profiles table does not exist. Please run migrations.');
      return { 
        id: null,
        email: null,
        full_name: null,
        phone: null,
        gender: null,
        address: null,

        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function updateProfile(supabase: SupabaseClient, profileData: ProfileData) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // First, check if table exists by attempting to select from it
    const { error: tableCheckError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .limit(1);

    if (tableCheckError && tableCheckError.code === '42P01') { // Table doesn't exist
      throw new Error('Profiles table does not exist. Please run migrations.');
    }

    // Check if profile exists
    const { data: existingProfile, error: selectError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      throw new Error(`Error checking profile: ${selectError.message}`);
    }

    if (existingProfile) {
      // Update only the fields that are provided
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {};
      if (profileData.full_name !== undefined) updateData.full_name = profileData.full_name;
      if (profileData.phone !== undefined) updateData.phone = profileData.phone;
      if (profileData.gender !== undefined) updateData.gender = profileData.gender;
      if (profileData.address !== undefined) updateData.address = profileData.address;
     
      if (profileData.avatar_url !== undefined) updateData.avatar_url = profileData.avatar_url;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        throw new Error(`Error updating profile: ${error.message}`);
      }
    } else {
      // Create new profile with provided fields
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const insertData: any = {
        id: user.id,
        email: user.email || null,
        full_name: profileData.full_name,
        phone: profileData.phone,
        gender: profileData.gender,
        address: profileData.address,

        avatar_url: profileData.avatar_url
      };

      const { error } = await supabase
        .from('profiles')
        .insert([insertData]);

      if (error) {
        throw new Error(`Error creating profile: ${error.message}`);
      }
    }

    return { success: true };
  } catch (error) {
    // Check if it's a table not found error
    if (error instanceof Error && (error.message.includes('42P01') || error.message.includes('could not find the table'))) {
      throw new Error('Profiles table does not exist. Please run migrations.');
    }
    
    console.error('Error updating profile:', error);
    throw error;
  }
}

// Function to get user's profile data specifically for the form
export async function getUserProfile(supabase: SupabaseClient) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, phone, gender, address, role, avatar_url')
      .eq('id', user.id)
      .single();

    if (error && error.code === '42P01') { // 42P01 is the error code for undefined table
      console.warn('Profiles table does not exist. Please run migrations.');
      return { 
        full_name: null,
        phone: null,
        gender: null,
        address: null,

        avatar_url: null
      };
    }

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Error fetching profile: ${error.message}`);
    }

    return data || { 
      full_name: null,
      phone: null,
      gender: null,
      address: null,

      avatar_url: null
    };
  } catch (error) {
    // Check if it's a table not found error
    if (error instanceof Error && (error.message.includes('42P01') || error.message.includes('could not find the table'))) {
      console.warn('Profiles table does not exist. Please run migrations.');
      return { 
        full_name: null,
        phone: null,
        gender: null,
        address: null,
   
        avatar_url: null
      };
    }
    
    console.error('Error getting user profile:', error);
    throw error;
  }
}