
import { ThemeDefinition } from './types';

// Modern Vibrant theme - Bold, contemporary colors with high contrast and energy
export const modernVibrantTheme: ThemeDefinition = {
  id: 'modern-vibrant',
  name: 'modern-vibrant',
  displayName: 'Modern Vibrant',
  description: 'Bold, energetic design with vibrant colors and contemporary aesthetics',
  preview: '#8B5CF6',
  colors: {
    light: {
      // Primary vibrant purple/magenta
      primary: '262 83% 58%', // #8B5CF6 - Vibrant purple
      primaryForeground: '0 0% 100%', // White text on primary
      
      // Secondary with orange accent
      secondary: '24 95% 53%', // #FF8C00 - Vibrant orange background
      secondaryForeground: '0 0% 100%', // White text on secondary
      
      // Background and surface colors
      background: '0 0% 99%', // Near white background
      foreground: '224 71% 4%', // Very dark text
      
      // Card colors with vibrant glassmorphism
      card: '0 0% 100% / 0.8', // Semi-transparent white
      cardForeground: '224 71% 4%', // Dark text on cards
      
      // Popover colors
      popover: '0 0% 100%', // White popover
      popoverForeground: '224 71% 4%', // Dark text on popover
      
      // Muted colors
      muted: '270 20% 98%', // Very light purple tint
      mutedForeground: '215 16% 47%', // Medium gray text
      
      // Accent colors with energy
      accent: '280 100% 70%', // Bright magenta accent
      accentForeground: '0 0% 100%', // White text on accent
      
      // Status colors - vibrant versions
      destructive: '0 100% 67%', // Bright red
      destructiveForeground: '0 0% 100%', // White text
      
      success: '142 86% 28%', // Vibrant green
      successForeground: '0 0% 100%', // White text
      
      warning: '38 100% 50%', // Bright orange
      warningForeground: '0 0% 100%', // White text
      
      info: '262 83% 58%', // Same as primary purple
      infoForeground: '0 0% 100%', // White text
      
      // Border and input colors
      border: '270 20% 88%', // Light purple-tinted border
      input: '270 20% 88%', // Input border
      ring: '262 83% 58%', // Focus ring (same as primary)
    },
    dark: {
      // Dark mode with vibrant accents
      primary: '262 83% 58%', // Same vibrant purple
      primaryForeground: '0 0% 100%', // White text on primary
      
      secondary: '240 21% 15%', // Dark background with slight purple tint
      secondaryForeground: '0 0% 98%', // Light text
      
      background: '224 71% 4%', // Very dark background
      foreground: '0 0% 98%', // Light text
      
      card: '224 71% 4% / 0.8', // Semi-transparent dark
      cardForeground: '0 0% 98%', // Light text on cards
      
      popover: '224 71% 4%', // Dark popover
      popoverForeground: '0 0% 98%', // Light text
      
      muted: '240 21% 15%', // Dark muted with purple tint
      mutedForeground: '237 13% 63%', // Light gray text
      
      accent: '280 100% 70%', // Bright magenta accent
      accentForeground: '224 71% 4%', // Dark text on bright accent
      
      destructive: '0 100% 67%', // Bright red
      destructiveForeground: '0 0% 100%', // White text
      
      success: '142 86% 28%', // Vibrant green
      successForeground: '0 0% 100%', // White text
      
      warning: '38 100% 50%', // Bright orange
      warningForeground: '0 0% 100%', // White text
      
      info: '262 83% 58%', // Same as primary
      infoForeground: '0 0% 100%', // White text
      
      border: '240 21% 15%', // Dark border with purple tint
      input: '240 21% 15%', // Dark input border
      ring: '262 83% 58%', // Vibrant ring
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2.25rem', // 36px
      '4xl': '3.5rem',  // 56px - Bold hero text
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.7',
    },
  },
  spacing: {
    borderRadius: '0.375rem', // 6px - Sharper corners for modern feel
    spacing: {
      xs: '0.5rem',   // 8px
      sm: '1rem',     // 16px
      md: '1.5rem',   // 24px
      lg: '2rem',     // 32px
      xl: '3rem',     // 48px
      '2xl': '4rem',  // 64px
      '3xl': '6rem',  // 96px
    },
  },
  effects: {
    boxShadow: {
      sm: '0 2px 4px 0 rgb(139 92 246 / 0.1)',
      md: '0 8px 16px -4px rgb(139 92 246 / 0.15), 0 4px 8px -2px rgb(139 92 246 / 0.1)',
      lg: '0 16px 32px -8px rgb(139 92 246 / 0.2), 0 8px 16px -4px rgb(139 92 246 / 0.1)',
      xl: '0 24px 48px -12px rgb(139 92 246 / 0.25), 0 12px 24px -6px rgb(139 92 246 / 0.1)',
    },
    backdropBlur: {
      sm: 'blur(6px)',  // Stronger blur for energy
      md: 'blur(12px)',
      lg: 'blur(16px)',
    },
    transition: {
      fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)', // Snappy transitions
      slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};
