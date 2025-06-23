
'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('adminadmin');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const testLogin = async () => {
    setLoading(true);
    setResult(null);
    setLogs([]);
    
    try {
      addLog('🔄 Starting authentication...');
      addLog(`Username: ${username}, Password: ${password}`);
      
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      
      addLog(`🔄 SignIn result: ${JSON.stringify(result, null, 2)}`);
      setResult(result);
      
      if (result?.ok) {
        addLog('✅ Authentication successful, getting session...');
        const session = await getSession();
        addLog(`Session: ${JSON.stringify(session, null, 2)}`);
      } else {
        addLog(`❌ Authentication failed: ${result?.error}`);
      }
      
    } catch (error) {
      addLog(`❌ Exception: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testApiAuth = async () => {
    try {
      addLog('🔄 Testing API auth...');
      const response = await fetch('/api/debug-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      addLog(`API Auth result: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addLog(`❌ API Auth error: ${error}`);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Authentication Debug Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label>Username:</label>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label>Password:</label>
            <Input 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={testLogin} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Testing...' : 'Test NextAuth Login'}
            </Button>
            
            <Button 
              onClick={testApiAuth}
              variant="outline"
            >
              Test API Auth
            </Button>
          </div>
          
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold">NextAuth Result:</h3>
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
          
          {logs.length > 0 && (
            <div className="mt-4 p-4 bg-black text-green-400 rounded font-mono text-sm max-h-64 overflow-y-auto">
              <h3 className="font-bold text-white mb-2">Debug Logs:</h3>
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
