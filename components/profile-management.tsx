'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { User, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddressSuggestion {
  properties: {
    name: string;
    state?: string;
    country?: string;
  };
}

const ProfileManagement = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { locale, t } = useI18n();
  const [avatar, setAvatar] = useState<string | null>(null); // Default to null to show icon
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState(''); // No default role
  const [selectedGender, setSelectedGender] = useState(''); // No default gender
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
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
  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{t('welcome')}</CardTitle>
          <CardDescription>{t('info')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Avatar Selection Modal */}
            {showAvatarModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[60vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{t('chooseAvatar')}</h3>
                    <button 
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setShowAvatarModal(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, index) => {
                      const avatarPath = `/avatar/male${index}.png`;
                      return (
                        <div 
                          key={index}
                          className="flex flex-col items-center cursor-pointer p-2 rounded-md hover:bg-accent transition-colors"
                          onClick={() => {
                            setAvatar(avatarPath);
                            setPreviewImage(null);
                            setShowAvatarModal(false);
                          }}
                        >
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <Image 
                              src={avatarPath} 
                              alt={`Avatar ${index+1}`} 
                              width={64} 
                              height={64} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs mt-1">{t('avatar')} {index+1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Two-column layout: Avatar on left, Form on right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Avatar Section - Left Column */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/30 relative">
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
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => setShowAvatarModal(true)}
                  >
                    {t('chooseAvatar')}
                  </button>
                  <span className="text-muted-foreground">|</span>
                  <button 
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={triggerFileInput}
                  >
                    {t('uploadPhoto')}
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

              {/* Profile Form Section - Right Column */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input
                    type="text"
                    id="fullName"
                    placeholder={t('enterFullName')}
                  />
                </div>

                
                  <div className="grid gap-2">
                    <Label>{t('gender')}</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          <span>{selectedGender || (locale === 'id' ? 'Pilih Jenis Kelamin' : 'Select Gender')}</span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuItem onSelect={() => setSelectedGender(locale === 'id' ? 'Laki-laki' : 'Male')}>
                          {locale === 'id' ? 'Laki-laki' : 'Male'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedGender(locale === 'id' ? 'Perempuan' : 'Female')}>
                          {locale === 'id' ? 'Perempuan' : 'Female'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">{t('phone')}</Label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder={locale === 'id' ? "+62 ..." : "+62 ..."}
                    />
                  </div>
               
                <div className="grid gap-2 relative">
                  <Label htmlFor="address">{t('address')}</Label>
                  <Input
                    type="text"
                    id="address"
                    placeholder={locale === 'id' ? "Masukkan alamat Anda" : "Enter your address"}
                    value={address}
                    onChange={handleAddressChange}
                    autoComplete="off"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute mt-1 w-full bg-popover text-popover-foreground border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto overflow-x-hidden">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-accent cursor-pointer border-b last:border-b-0 truncate"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.properties.name}, {suggestion.properties.state || suggestion.properties.country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">{t('role')}</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        id="role"
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <span>{selectedRole || (locale === 'id' ? 'Pilih Peran' : 'Select Role')}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem onSelect={() => setSelectedRole(locale === 'id' ? 'Petani' : 'Farmer')}>
                        {locale === 'id' ? 'Petani' : 'Farmer'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole(locale === 'id' ? 'Petugas Lapangan' : 'Field Officer')}>
                        {locale === 'id' ? 'Petugas Lapangan' : 'Field Officer'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole(locale === 'id' ? 'Peneliti' : 'Researcher')}>
                        {locale === 'id' ? 'Peneliti' : 'Researcher'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole(locale === 'id' ? 'Investor' : 'Investor')}>
                        {locale === 'id' ? 'Investor' : 'Investor'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole(locale === 'id' ? 'Pembeli' : 'Buyer')}>
                        {locale === 'id' ? 'Pembeli' : 'Buyer'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedRole(locale === 'id' ? 'Lainnya' : 'Other')}>
                        {locale === 'id' ? 'Lainnya' : 'Other'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

              

                

                <div className="grid gap-2">
                  <Button type="button">
                    {t('save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;