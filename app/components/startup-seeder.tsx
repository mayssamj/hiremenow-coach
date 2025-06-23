
'use client';

import { useEffect, useState } from 'react';

export function StartupSeeder() {
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function ensureSeeding() {
      try {
        console.log('🚀 Checking database seeding status...');
        
        // Call the seeding API endpoint
        const response = await fetch('/api/admin/seed-database', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (isMounted) {
          if (response.ok) {
            const result = await response.json();
            console.log('✅ Startup seeding result:', result.message);
          } else {
            console.warn('⚠️ Seeding check failed, but continuing...');
          }
          setSeeded(true);
        }
      } catch (error) {
        console.warn('⚠️ Startup seeding error (non-critical):', error);
        if (isMounted) {
          setSeeded(true);
        }
      }
    }

    // Only run seeding check once when component mounts
    if (!seeded) {
      ensureSeeding();
    }

    return () => {
      isMounted = false;
    };
  }, [seeded]);

  // This component doesn't render anything visible
  return null;
}
