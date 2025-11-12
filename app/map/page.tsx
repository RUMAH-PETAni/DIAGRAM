'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MapPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the proper TerraDraw map page
    router.push('/features/tools/land-mapping-terradraw');
  }, [router]);

  return null; // Render nothing while redirecting
}