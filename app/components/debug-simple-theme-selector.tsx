
'use client';

import { useTheme } from '@/contexts/theme-context';

export function DebugSimpleThemeSelector() {
  const { availableThemes, currentTheme } = useTheme();

  console.log('Available themes:', availableThemes);
  console.log('Current theme:', currentTheme);

  return (
    <div className="p-4 border">
      <h3>Debug Theme Selector</h3>
      <p>Available themes count: {availableThemes.length}</p>
      <div className="space-y-2">
        {availableThemes.map((theme: any, index: number) => (
          <div key={theme.id} className="p-2 border bg-gray-100">
            <p><strong>#{index + 1}: {theme.displayName}</strong></p>
            <p>ID: {theme.id}</p>
            <p>Description: {theme.description}</p>
            <p>Active: {theme.id === currentTheme.id ? 'YES' : 'NO'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
