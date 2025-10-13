'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { User, ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const ProfileManagement = () => {
  const [avatar, setAvatar] = useState<string | null>(null); // Default to null to show icon
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState('Petani'); // Default role
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle address input changes with debouncing
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    // Clear previous timeout
    if (addressTimeoutRef.current) {
      clearTimeout(addressTimeoutRef.current);
    }

    // Set new timeout for API call
    addressTimeoutRef.current = setTimeout(async () => {
      if (value.length > 3) { // Only search if more than 3 characters
        try {
          const response = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}`
          );
          const data = await response.json();
          setSuggestions(data.features || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching address suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // Debounce for 300ms
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    setAddress(suggestion.properties.name + ', ' + (suggestion.properties.state || suggestion.properties.country));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('#address')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (addressTimeoutRef.current) {
        clearTimeout(addressTimeoutRef.current);
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setAvatar(reader.result as string); // Use the preview as the avatar
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-4 ">Profil Pengguna</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4 overflow-hidden border-2 border-dashed border-muted-foreground/30 relative">
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Preview" 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover"
                  />
                ) : avatar ? (
                  <Image 
                    src={avatar} 
                    alt="User Avatar" 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={64} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center justify-center gap-2 w-full">
                <button 
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowAvatarModal(true)}
                >
                  Pilih Avatar
                </button>
                <div className="h-4 w-px bg-border" />
                <button 
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={triggerFileInput}
                >
                  Unggah Foto
                </button>
                <input 
                  ref={fileInputRef}
                  id="file-input" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            
            {/* Avatar Selection Modal */}
            {showAvatarModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Pilih Avatar</h3>
                    <button 
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setShowAvatarModal(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {[
                      '/avatar/male.png',
                      '/avatar/male1.png',
                      '/avatar/male2.png',
                      '/avatar/male3.png',
                      '/avatar/male4.png',
                      '/avatar/female.png',
                      '/avatar/female1.png',
                      '/avatar/female2.png',
                      '/avatar/female3.png',
                      '/avatar/female4.png'
                    ].map((avatarPath, index) => (
                      <div 
                        key={index}
                        className="flex flex-col items-center cursor-pointer p-2 rounded-md hover:bg-accent transition-colors"
                        onClick={() => {
                          setAvatar(avatarPath);
                          setPreviewImage(null);
                          setShowAvatarModal(false);
                        }}
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-colors">
                          <Image 
                            src={avatarPath} 
                            alt={`Avatar ${index+1}`} 
                            width={64} 
                            height={64} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs mt-1">Avatar {index+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Form Section */}
          <div className="md:col-span-2">
            <form className="space-y-4">
               <div>
                <label htmlFor="userName" className="block text-sm font-medium mb-1">Nama Pengguna</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded-md"
                
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">Nama depan</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border rounded-md"
                
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Nama belakang</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border rounded-md"
                  
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">No Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border rounded-md"
                  placeholder="+62 ..."
                />
              </div>
              
              <div className="relative">
                <label htmlFor="address" className="block text-sm font-medium mb-1">Alamat</label>
                <input
                  type="text"
                  id="address"
                  className="w-full p-2 border rounded-md"
                  placeholder="Masukkan alamat Anda"
                  value={address}
                  onChange={handleAddressChange}
                  autoComplete="off"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute mt-1 w-full bg-popover text-popover-foreground border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-accent cursor-pointer border-b last:border-b-0"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.properties.name}, {suggestion.properties.state || suggestion.properties.country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Peran</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        id="role"
                        className="w-full flex justify-between items-center p-2 border rounded-md hover:bg-accent"
                      >
                        <span>{selectedRole}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem onSelect={() => setSelectedRole('Petani')}>Petani</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole('Penyuluh')}>Penyuluh</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole('Peneliti')}>Peneliti</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole('Investor')}>Investor</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole('Pembeli')}>Pembeli</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole('Lainnya')}>Lainnya</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;