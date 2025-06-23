
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/theme-context';
import { Palette, Check, Eye, Settings } from 'lucide-react';

// Helper functions for theme display
const getThemePersonality = (themeId: string): string[] => {
  switch (themeId) {
    case 'abacus-ai':
      return ['Professional', 'Clean', 'Corporate', 'Trustworthy'];
    case 'modern-vibrant':
      return ['Energetic', 'Bold', 'Creative', 'Tech-Forward'];
    case 'minimal-futuristic':
      return ['Minimal', 'Sophisticated', 'Premium', 'Futuristic'];
    case 'abstract-creative':
      return ['Artistic', 'Unconventional', 'Bold', 'Inspiring'];
    default:
      return ['Custom'];
  }
};

const getThemeGradient = (themeId: string): string => {
  switch (themeId) {
    case 'abacus-ai':
      return 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
    case 'modern-vibrant':
      return 'linear-gradient(135deg, #8B5CF6 0%, #FF8C00 100%)';
    case 'minimal-futuristic':
      return 'linear-gradient(135deg, #06B6D4 0%, #0891b2 100%)';
    case 'abstract-creative':
      return 'linear-gradient(135deg, #FF6B6B 0%, #7CB342 50%, #9C27B0 100%)';
    default:
      return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
  }
};

const getThemeColorPalette = (themeId: string): string[] => {
  switch (themeId) {
    case 'abacus-ai':
      return ['#2563eb', '#1d4ed8', '#f1f5f9', '#0f172a'];
    case 'modern-vibrant':
      return ['#8B5CF6', '#FF8C00', '#A855F7', '#F59E0B'];
    case 'minimal-futuristic':
      return ['#06B6D4', '#0891b2', '#f8fafc', '#1e293b'];
    case 'abstract-creative':
      return ['#FF6B6B', '#7CB342', '#9C27B0', '#FF9800'];
    default:
      return ['#6b7280', '#4b5563', '#f9fafb', '#111827'];
  }
};

export function ThemeSelector() {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);

  const handleThemeSwitch = async (themeId: string) => {
    await setTheme(themeId);
    setPreviewTheme(null);
  };

  const handlePreview = (themeId: string) => {
    setPreviewTheme(themeId);
    setTheme(themeId);
  };

  const cancelPreview = () => {
    if (previewTheme) {
      setTheme(currentTheme.id);
      setPreviewTheme(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Theme Management</h3>
        <Badge variant="secondary" className="ml-auto">Admin Only</Badge>
      </div>

      {/* Current Theme Status */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Current Theme
          </CardTitle>
          <CardDescription>
            Active theme configuration for the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{currentTheme.displayName}</p>
              <p className="text-sm text-muted-foreground">{currentTheme.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: currentTheme.preview }}
              />
              <Badge variant={currentTheme.isDefault ? "default" : "secondary"}>
                {currentTheme.isDefault ? "Default" : "Custom"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mode Selector - Removed for now, focusing on user-specific themes */}

      {/* Theme Selection - Fixed Height with Scroll */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Available Themes ({availableThemes.length})</CardTitle>
          <CardDescription>
            Select and preview different design themes - each with unique personalities and visual styles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
            {availableThemes.map((theme: any, index: number) => {
              const isActive = theme.id === currentTheme.id;
              const themePersonality = getThemePersonality(theme.id);
              
              return (
                <div
                  key={theme.id}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'border-primary bg-primary/10 shadow-lg' 
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* Enhanced Preview */}
                      <div className="flex flex-col items-center gap-2">
                        <div 
                          className="w-12 h-12 rounded-xl border-2 border-white shadow-lg transition-transform hover:scale-105"
                          style={{ 
                            backgroundColor: theme.preview,
                            background: getThemeGradient(theme.id)
                          }}
                        />
                        <div className="flex gap-1">
                          {getThemeColorPalette(theme.id).map((color, i) => (
                            <div 
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Theme Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-lg">{theme.displayName}</p>
                          {isActive && (
                            <Badge variant="default" className="flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{theme.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {themePersonality.map((trait, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {!isActive && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(theme.id)}
                            className="flex items-center gap-1 w-full"
                          >
                            <Eye className="h-3 w-3" />
                            Preview
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleThemeSwitch(theme.id)}
                            className="btn-primary-enhanced w-full"
                          >
                            Switch to {theme.displayName}
                          </Button>
                        </>
                      )}
                      {isActive && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="w-full"
                        >
                          Currently Active
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Preview Controls */}
      {previewTheme && (
        <div className="fixed bottom-6 right-6 bg-background border border-border rounded-lg p-4 shadow-lg z-50">
          <p className="text-sm font-medium mb-3">Theme Preview Active</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={cancelPreview}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleThemeSwitch(previewTheme)}
              className="btn-primary-enhanced"
            >
              Apply Theme
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
