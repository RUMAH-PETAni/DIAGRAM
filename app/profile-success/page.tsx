'use client';

import { useEffect, useState } from 'react';
import { 
  Empty, 
  EmptyContent, 
  EmptyDescription, 
  EmptyHeader, 
  EmptyMedia, 
  EmptyTitle 
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useRouter } from 'next/navigation';

export default function ProfileSuccessPage() {
  const { t } = useI18n();
  const [showCheckmark, setShowCheckmark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Show spinner for 2 seconds, then show checkmark for 2 seconds before redirecting
    const timer1 = setTimeout(() => {
      setShowCheckmark(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      router.push('/protected'); // Redirect back to profile page or dashboard
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Empty className="w-full max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            {showCheckmark ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            ) : (
              <Spinner className="size-10" />
            )}
          </EmptyMedia>
          <EmptyTitle>
            {showCheckmark ? t('profileSaved') : t('savingProfile')}
          </EmptyTitle>
          <EmptyDescription>
            {showCheckmark ? t('profileSavedDescription') : t('savingProfileDescription')}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {!showCheckmark && (
            <p className="text-sm text-muted-foreground">{t('pleaseWait')}</p>
          )}
        </EmptyContent>
      </Empty>
    </div>
  );
}