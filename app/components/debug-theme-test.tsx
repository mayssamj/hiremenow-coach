
'use client';

import { useEffect, useState } from 'react';

export function DebugThemeTest() {
  const [result, setResult] = useState<string>('Testing...');

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Attempting to fetch theme preference...');
        const response = await fetch('/api/user/theme-preference');
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Response data:', data);
          setResult(`SUCCESS: ${JSON.stringify(data)}`);
        } else {
          setResult(`ERROR: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setResult(`FETCH ERROR: ${error}`);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', background: 'white', padding: '10px', border: '1px solid black', zIndex: 9999 }}>
      <h4>Theme API Test</h4>
      <div>{result}</div>
    </div>
  );
}
