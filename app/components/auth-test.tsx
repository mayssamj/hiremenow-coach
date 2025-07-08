
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function AuthTest() {
  const [authStatus, setAuthStatus] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setAuthStatus(data);
      } else {
        setAuthStatus({ error: 'Not authenticated' });
      }
    } catch (error) {
      setAuthStatus({ error: 'Failed to check auth' });
    }
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        const error = await response.json();
        setCompanies([{ error: error.error || 'Failed to fetch' }]);
      }
    } catch (error) {
      setCompanies([{ error: 'Network error' }]);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'AdminAdmin'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        await checkAuth();
        await fetchCompanies();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchCompanies();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Authentication Test</h2>
      
      <div className="space-y-2">
        <Button onClick={checkAuth}>Check Auth Status</Button>
        <Button onClick={fetchCompanies} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Companies'}
        </Button>
        <Button onClick={testLogin}>Test Login</Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Auth Status:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify(authStatus, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">Companies ({companies.length}):</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm max-h-40 overflow-y-auto">
            {JSON.stringify(companies.slice(0, 3), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
