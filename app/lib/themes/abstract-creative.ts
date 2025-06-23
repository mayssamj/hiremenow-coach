
import { ThemeDefinition } from './types';

// Abstract Creative theme - Artistic, unconventional design with bold color combinations
export const abstractCreativeTheme: ThemeDefinition = {
  id: 'abstract-creative',
  name: 'abstract-creative',
  displayName: 'Abstract Creative',
  description: 'Artistic and unconventional design with bold color combinations and creative layouts',
  preview: '#FF6B6B',
  colors: {
    light: {
      // Primary coral/salmon
      primary: '0 69% 67%', // #FF6B6B - Coral/salmon
      primaryForeground: '0 0% 100%', // White text on primary
      
      // Secondary with lime green accent
      secondary: '84 81% 44%', // #7CB342 - Lime green
      secondaryForeground: '0 0% 100%', // White text on secondary
      
      // Background and surface colors
      background: '45 100% 99%', // Warm off-white
      foreground: '260 10% 13%', // Deep purple-tinted dark
      
      // Card colors with creative flair
      card: '45 100% 99% / 0.7', // Semi-transparent warm white
      cardForeground: '260 10% 13%', // Dark text on cards
      
      // Popover colors
      popover: '45 100% 99%', // Warm white popover
      popoverForeground: '260 10% 13%', // Dark text
      
      // Muted colors with creative tint
      muted: '45 50% 95%', // Warm muted background
      mutedForeground: '260 6% 46%', // Purple-tinted gray text
      
      // Accent colors - deep purple
      accent: '260 60% 65%', // Deep purple accent
      accentForeground: '0 0% 100%', // White text on accent
      
      // Status colors - creative versions
      destructive: '0 69% 67%', // Same as primary coral
      destructiveForeground: '0 0% 100%', // White text
      
      success: '84 81% 44%', // Same as secondary lime
      successForeground: '0 0% 100%', // White text
      
      warning: '38 100% 60%', // Bright orange
      warningForeground: '0 0% 100%', // White text
      
      info: '260 60% 65%', // Same as accent purple
      infoForeground: '0 0% 100%', // White text
      
      // Border and input colors
      border: '45 30% 85%', // Warm-tinted border
      input: '45 30% 85%', // Input border
      ring: '0 69% 67%', // Focus ring (same as primary)
    },
    dark: {
      // Dark mode with creative flair
      primary: '0 69% 67%', // Same coral
      primaryForeground: '260 10% 13%', // Dark text on primary
      
      secondary: '260 15% 20%', // Deep purple-tinted background
      secondaryForeground: '45 50% 95%', // Warm light text
      
      background: '260 10% 13%', // Deep purple-tinted dark
      foreground: '45 50% 95%', // Warm light text
      
      card: '260 10% 13% / 0.7', // Semi-transparent dark
      cardForeground: '45 50% 95%', // Warm light text
      
      popover: '260 10% 13%', // Dark popover
      popoverForeground: '45 50% 95%', // Warm light text
      
      muted: '260 15% 20%', // Purple-tinted muted
      mutedForeground: '260 10% 65%', // Light purple-gray text
      
      accent: '84 81% 44%', // Lime green accent in dark mode
      accentForeground: '260 10% 13%', // Dark text on bright accent
      
      destructive: '0 69% 67%', // Same coral
      destructiveForeground: '0 0% 100%', // White text
      
      success: '84 81% 44%', // Same lime green
      successForeground: '260 10% 13%', // Dark text
      
      warning: '38 100% 60%', // Bright orange
      warningForeground: '0 0% 100%', // White text
      
      info: '260 60% 65%', // Purple
      infoForeground: '0 0% 100%', // White text
      
      border: '260 15% 20%', // Purple-tinted border
      input: '260 15% 20%', // Dark input border
      ring: '0 69% 67%', // Coral ring
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Clean base font for readability
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.625rem', // 26px
      '3xl': '2.5rem',  // 40px
      '4xl': '4rem',    // 64px - Bold artistic hero text
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '800',      // Extra bold for artistic impact
    },
    lineHeight: {
      tight: '1.1',     // Tighter for impact
      normal: '1.5',
      relaxed: '1.8',
    },
  },
  spacing: {
    borderRadius: '1rem', // 16px - More rounded for creative feel
    spacing: {
      xs: '0.5rem',   // 8px
      sm: '1rem',     // 16px
      md: '1.5rem',   // 24px
      lg: '2.5rem',   // 40px - Varied spacing for creativity
      xl: '3.5rem',   // 56px
      '2xl': '5rem',  // 80px
      '3xl': '7rem',  // 112px
    },
  },
  effects: {
    boxShadow: {
      sm: '0 2px 8px 0 rgb(255 107 107 / 0.15)',
      md: '0 8px 24px -4px rgb(255 107 107 / 0.2), 0 4px 8px -2px rgb(124 179 66 / 0.15)',
      lg: '0 16px 48px -8px rgb(255 107 107 / 0.25), 0 8px 16px -4px rgb(124 179 66 / 0.1)',
      xl: '0 32px 64px -16px rgb(255 107 107 / 0.3), 0 16px 32px -8px rgb(124 179 66 / 0.15)',
    },
    backdropBlur: {
      sm: 'blur(8px)',  // Stronger artistic blur
      md: 'blur(12px)',
      lg: 'blur(20px)',
    },
    transition: {
      fast: '150ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      normal: '300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy, creative easing
      slow: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};
