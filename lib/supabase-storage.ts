'use client';

import { SupabaseClient } from '@supabase/supabase-js';

export async function uploadAvatar(supabase: SupabaseClient, file: File, userId: string) {
  try {
    console.log('Starting avatar upload for user:', userId);
    console.log('File to upload:', file.name, file.size, file.type);

    // Verify that the user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user || user.id !== userId) {
      throw new Error('User not authenticated or invalid user ID');
    }

    console.log('User authenticated successfully, proceeding with upload');

    const fileExt = file.name.split('.').pop();
    // Use the folder format consistent with your example
    const fileName = `avatar.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    console.log('Attempting to upload to path:', filePath);

    const { error } = await supabase.storage
      .from('user_avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Replace file if exists
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      throw new Error(`Error uploading avatar: ${error.message}`);
    }

    console.log('Avatar uploaded successfully to path:', filePath);
    return filePath;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

export async function deleteAvatar(supabase: SupabaseClient, filePath: string) {
  try {
    const { error } = await supabase.storage
      .from('user_avatars')
      .remove([filePath]);

    if (error) {
      throw new Error(`Error deleting avatar: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting avatar:', error);
    throw error;
  }
}

export async function getPublicUrl(supabase: SupabaseClient, filePath: string) {
  try {
    const { data, error } = await supabase.storage
      .from('user_avatars')
      .createSignedUrl(filePath, 60 * 60); // 1 hour expiry

    if (error) {
      throw new Error(`Error getting public URL: ${error.message}`);
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error getting public URL:', error);
    throw error;
  }
}