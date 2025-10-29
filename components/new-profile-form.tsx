'use client';
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserRoundPen } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Profile {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone: string;
  gender: string;
  address: string;
  role: string;
  avatar_url: string;
}

export function NewProfileForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFiles, setAvatarFiles] = useState<any[]>([]);
  const [publicAvatars, setPublicAvatars] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const [hasConsented, setHasConsented] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, username, full_name, phone, gender, address, role, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(data as Profile);
        setFormData(data as Profile);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Initialize public avatars from the local public/avatar folder
  useEffect(() => {
    // Define the local avatar filenames in the public/avatar folder
    const localAvatars = [
      'male.webp', 'male1.webp', 'male2.webp', 'male3.webp', 'male4.webp',
      'female.webp', 'female1.webp', 'female2.webp', 'female3.webp', 'female4.webp'
    ];
    
    const avatarObjects = localAvatars.map((filename, index) => ({
      id: `local-${index}`,
      name: filename,
      publicUrl: `/avatar/${filename}` // Path in the public folder
    }));
    
    setPublicAvatars(avatarObjects);
  }, []);

  const fetchUserAvatars = async () => {
    if (!profile) return;

    try {
      setIsLoading(true);
      const supabase = createClient();

      // List all files in the user's folder in the 'profile_picture' bucket
      const { data, error } = await supabase
        .storage
        .from('profile_picture')
        .list(profile.id, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      setAvatarFiles(data || []);
    } catch (error) {
      console.error('Error fetching avatars:', error);
      setError('Failed to load avatars. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg'];
    
    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (!validImageTypes.includes(file.type) || !validExtensions.includes(`.${fileExtension}`)) {
      setError('Please select a valid image file (JPEG, PNG, WebP, GIF, BMP, SVG)');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Import image compression library dynamically
      const imageCompression = (await import('browser-image-compression')).default;
      
      // Compression options to ensure file is under 200KB
      const options = {
        maxSizeMB: 0.195, // ~195KB to stay comfortably under 200KB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      
      let compressedFile = file;
      
      // Only attempt compression if the original file is larger than 200KB
      if (file.size > 200 * 1024) {
        try {
          compressedFile = await imageCompression(file, options);
          console.log('Original file size:', file.size);
          console.log('Compressed file size:', compressedFile.size);
        } catch (compressionError) {
          console.warn('Image compression failed, using original file:', compressionError);
          // If compression fails, we'll still use the original file
          compressedFile = file;
        }
      }

      const supabase = createClient();
      
      // Upload the (potentially compressed) file to Supabase storage in the 'profile_picture' bucket
      // Using the format: user_id/filename to match RLS policy
      const fileName = `${profile.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase
        .storage
        .from('profile_picture')
        .upload(fileName, compressedFile, { 
          upsert: true,
          contentType: compressedFile.type
        });

      if (uploadError) throw uploadError;

      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: fileName })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      // Update local state
      setProfile(prev => prev ? { ...prev, avatar_url: fileName } : null);
      setFormData(prev => ({ ...prev, avatar_url: fileName }));
      
      // Close the modal and refresh the avatar list
      setIsModalOpen(false);
      await fetchUserAvatars();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Failed to upload avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarSelect = async (fileName: string) => {
    if (!profile) return;

    try {
      setIsLoading(true);
      const supabase = createClient();

      // Update the profile with the selected avatar
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: fileName })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      // Update local state
      setProfile(prev => prev ? { ...prev, avatar_url: fileName } : null);
      setFormData(prev => ({ ...prev, avatar_url: fileName }));
      
      // Close the modal
      setIsModalOpen(false);
      
      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Error updating avatar:', error);
      setError('Failed to update avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAvatarModal = async () => {
    if (profile) {
      await fetchUserAvatars();
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has given consent
    if (!hasConsented) {
      setError('You must agree to the profile consent to save your profile.');
      return;
    }

    // Validate that all required fields are filled
    if (!formData.full_name || !formData.phone || !formData.gender || !formData.address) {
      setError('Please fill in all required fields: full name, phone, gender, and address.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      const supabase = createClient();
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          full_name: formData.full_name,
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address,
        })
        .eq('id', profile?.id);

      if (error) throw error;

      // Update the profile state with the new data
      setProfile(prev => prev ? { ...prev, ...formData } as Profile : null);
      
      // Navigate to home page after successful save
      router.push('/explore');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !isInitialized) {
    return (
      <div className={cn("flex flex-col gap-6 items-center justify-center", className)} {...props}>
        <p>Loading profile...</p>
      </div>
    );
  }


 

  const SHORT_PROFILE_CONSENT = `
  I agree to the collection and use of my personal data for account management and service personalization.
  `;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8  ">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  Setup account profile 
                </h1>
              </div>
              <p className="text-muted-foreground text-sm text-balance">
                Please fill in and complete your profile
              </p>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary/10">
                {profile?.avatar_url ? (
                  <img 
                    src={`https://sqbogrsoqrgnfkxmmhmf.supabase.co/storage/v1/object/public/profile_picture/${profile.avatar_url}`} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-3xl">
                      {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={openAvatarModal}
                >
                  Change
                </Button>
              </div>
            </div>
            
            <div className="mt-5">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  value={profile?.email || ''}
                  disabled
                  className="mt-1 bg-muted"
                />
              </div>
          </div>
          
          <div className="p-6 md:p-8">
            <FieldGroup>
              <div>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Input
                  id="full_name"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                  <Select 
                    name="gender" 
                    value={formData.gender || ''} 
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full">
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="mt-1 w-full"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter address"
                />
              </div>
              
              
              
              <Field>
                <Button 
                  type="button" 
                  onClick={handleSubmit} 
                  disabled={isSaving || !formData.full_name || !formData.phone || !formData.gender || !formData.address}
                  className="w-full"
                >
                  {isSaving ? "Saving profile..." : "Save profile"}
                </Button>
              </Field>
              
              {error && (
                <div className="text-sm text-red-500 text-center mt-2">
                  {error}
                </div>
              )}
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            
            
            {/* Public avatars */}
            <div>
              <h3 className="text-sm font-medium mb-2">Public Avatars</h3>
              <div className="grid grid-cols-3 gap-4 max-h-40 overflow-y-auto">
                {publicAvatars.map((avatar) => (
                  <div 
                    key={avatar.id} 
                    className={`cursor-pointer rounded-lg border-2 p-2 ${selectedAvatar === avatar.name ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setSelectedAvatar(avatar.name)}
                  >
                    <img 
                      src={avatar.publicUrl} 
                      alt={avatar.name}
                      className="w-full h-20 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Upload New Avatar</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={handleAvatarUpload}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={() => selectedAvatar && handleAvatarSelect(selectedAvatar)}
              disabled={!selectedAvatar}
            >
              Select Avatar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <label className="flex items-center text-center justify-center space-x-2 px-6">
        <input 
          type="checkbox" 
          checked={hasConsented}
          onChange={(e) => setHasConsented(e.target.checked)}
          className="cursor-pointer"
        />
        <span className="text-sm text-muted-foreground cursor-pointer">
          {SHORT_PROFILE_CONSENT}
        </span>
      </label>
    </div>
  )
}
