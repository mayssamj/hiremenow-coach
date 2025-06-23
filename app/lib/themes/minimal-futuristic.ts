
import { ThemeDefinition } from './types';

// Minimal Futuristic theme - Clean, sophisticated design with subtle cyan accents
export const minimalFuturisticTheme: ThemeDefinition = {
  id: 'minimal-futuristic',
  name: 'minimal-futuristic',
  displayName: 'Minimal Futuristic',
  description: 'Ultra-clean, sophisticated design with subtle accents and premium feel',
  preview: '#06B6D4',
  colors: {
    light: {
      // Primary cool cyan/teal
      primary: '188 100% 42%', // #06B6D4 - Cool cyan
      primaryForeground: '0 0% 100%', // White text on primary
      
      // Secondary neutral
      secondary: '0 0% 96%', // Very light neutral
      secondaryForeground: '0 0% 13%', // Dark text on secondary
      
      // Background and surface colors - pure and clean
      background: '0 0% 100%', // Pure white
      foreground: '0 0% 13%', // Very dark text for contrast
      
      // Card colors - subtle and clean
      card: '0 0% 100% / 0.6', // Semi-transparent white
      cardForeground: '0 0% 13%', // Dark text on cards
      
      // Popover colors
      popover: '0 0% 100%', // Pure white popover
      popoverForeground: '0 0% 13%', // Dark text
      
      // Muted colors - very subtle
      muted: '0 0% 98%', // Barely tinted background
      mutedForeground: '0 0% 45%', // Medium gray text
      
      // Accent colors - minimal but present
      accent: '0 0% 97%', // Very subtle accent
      accentForeground: '0 0% 13%', // Dark text on accent
      
      // Status colors - muted versions
      destructive: '0 65% 51%', // Muted red
      destructiveForeground: '0 0% 100%', // White text
      
      success: '142 69% 58%', // Muted green
      successForeground: '0 0% 100%', // White text
      
      warning: '38 92% 50%', // Muted orange
      warningForeground: '0 0% 100%', // White text
      
      info: '188 100% 42%', // Same as primary cyan
      infoForeground: '0 0% 100%', // White text
      
      // Border and input colors - very subtle
      border: '0 0% 91%', // Light border
      input: '0 0% 91%', // Input border
      ring: '188 100% 42%', // Focus ring (same as primary)
    },
    dark: {
      // Dark mode - sophisticated and clean
      primary: '188 100% 42%', // Same cool cyan
      primaryForeground: '0 0% 13%', // Dark text on primary
      
      secondary: '0 0% 14%', // Very dark neutral
      secondaryForeground: '0 0% 98%', // Light text
      
      background: '0 0% 9%', // Very dark background
      foreground: '0 0% 98%', // Light text
      
      card: '0 0% 9% / 0.6', // Semi-transparent dark
      cardForeground: '0 0% 98%', // Light text on cards
      
      popover: '0 0% 9%', // Dark popover
      popoverForeground: '0 0% 98%', // Light text
      
      muted: '0 0% 14%', // Dark muted
      mutedForeground: '0 0% 63%', // Light gray text
      
      accent: '0 0% 14%', // Dark accent
      accentForeground: '0 0% 98%', // Light text on accent
      
      destructive: '0 65% 51%', // Muted red
      destructiveForeground: '0 0% 100%', // White text
      
      success: '142 69% 58%', // Muted green
      successForeground: '0 0% 100%', // White text
      
      warning: '38 92% 50%', // Muted orange
      warningForeground: '0 0% 100%', // White text
      
      info: '188 100% 42%', // Same as primary
      infoForeground: '0 0% 13%', // Dark text
      
      border: '0 0% 14%', // Dark border
      input: '0 0% 14%', // Dark input border
      ring: '188 100% 42%', // Cyan ring
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Clean, futuristic font
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.5rem',  // 40px - Clean hero text
    },
    fontWeight: {
      normal: '300',    // Lighter weight for minimal feel
      medium: '400',
      semibold: '500',
      bold: '600',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.6',    // More spacious
      relaxed: '1.8',
    },
  },
  spacing: {
    borderRadius: '0.75rem', // 12px - More rounded for soft feel
    spacing: {
      xs: '0.75rem',   // 12px - More generous spacing
      sm: '1.25rem',   // 20px
      md: '2rem',      // 32px
      lg: '3rem',      // 48px
      xl: '4rem',      // 64px
      '2xl': '6rem',   // 96px
      '3xl': '8rem',   // 128px
    },
  },
  effects: {
    boxShadow: {
      sm: '0 1px 2px 0 rgb(6 182 212 / 0.05)',
      md: '0 4px 8px -2px rgb(6 182 212 / 0.1), 0 2px 4px -1px rgb(6 182 212 / 0.06)',
      lg: '0 8px 16px -4px rgb(6 182 212 / 0.1), 0 4px 8px -2px rgb(6 182 212 / 0.05)',
      xl: '0 16px 32px -8px rgb(6 182 212 / 0.1), 0 8px 16px -4px rgb(6 182 212 / 0.05)',
    },
    backdropBlur: {
      sm: 'blur(2px)',  // Subtle blur
      md: 'blur(4px)',
      lg: 'blur(8px)',
    },
    transition: {
      fast: '200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      normal: '400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth, refined
      slow: '600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },
};
