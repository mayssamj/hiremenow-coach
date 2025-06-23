
import { ThemeDefinition } from './types';

// AbacusAI-inspired theme based on design research
export const abacusAITheme: ThemeDefinition = {
  id: 'abacus-ai',
  name: 'abacus-ai',
  displayName: 'AbacusAI Professional',
  description: 'Modern, clean design with glassmorphism effects and professional blue accent',
  preview: '#2563eb',
  isDefault: true,
  colors: {
    light: {
      // Primary brand colors based on AbacusAI research
      primary: '214 100% 59%', // #2563eb - Primary blue
      primaryForeground: '0 0% 100%', // White text on primary
      
      // Secondary colors
      secondary: '210 40% 96%', // Light gray background
      secondaryForeground: '222 47% 11%', // Dark text on secondary
      
      // Background and surface colors
      background: '0 0% 100%', // Pure white background
      foreground: '0 0% 7%', // Very dark text (rgb(2, 8, 23) equivalent)
      
      // Card colors with glassmorphism support
      card: '0 0% 100% / 0.7', // Semi-transparent white for glassmorphism
      cardForeground: '0 0% 7%', // Dark text on cards
      
      // Popover colors
      popover: '0 0% 100%', // White popover background
      popoverForeground: '0 0% 7%', // Dark text on popover
      
      // Muted colors for less important content
      muted: '210 40% 96%', // Light muted background
      mutedForeground: '220 13% 46%', // Medium gray text (rgb(100, 116, 139) equivalent)
      
      // Accent colors
      accent: '210 40% 96%', // Light accent background
      accentForeground: '222 47% 11%', // Dark text on accent
      
      // Destructive/error colors
      destructive: '0 84% 60%', // Red for errors
      destructiveForeground: '0 0% 100%', // White text on destructive
      
      // Success colors
      success: '142 76% 36%', // Green for success
      successForeground: '0 0% 100%', // White text on success
      
      // Warning colors
      warning: '38 92% 50%', // Orange for warnings
      warningForeground: '0 0% 100%', // White text on warning
      
      // Info colors
      info: '199 89% 48%', // Light blue for info
      infoForeground: '0 0% 100%', // White text on info
      
      // Border and input colors
      border: '214 32% 91%', // Light border color (rgb(226, 232, 240) equivalent)
      input: '214 32% 91%', // Input border color
      ring: '214 100% 59%', // Focus ring color (same as primary)
    },
    dark: {
      // Dark mode colors based on AbacusAI principles
      primary: '214 100% 59%', // Same primary blue
      primaryForeground: '0 0% 7%', // Dark text on primary
      
      secondary: '217 33% 17%', // Dark secondary background
      secondaryForeground: '210 40% 98%', // Light text on secondary
      
      background: '0 0% 7%', // Very dark background
      foreground: '210 40% 98%', // Light text
      
      card: '0 0% 7% / 0.8', // Semi-transparent dark for glassmorphism
      cardForeground: '210 40% 98%', // Light text on cards
      
      popover: '0 0% 7%', // Dark popover background
      popoverForeground: '210 40% 98%', // Light text on popover
      
      muted: '217 33% 17%', // Dark muted background
      mutedForeground: '215 20% 65%', // Light gray text
      
      accent: '217 33% 17%', // Dark accent background
      accentForeground: '210 40% 98%', // Light text on accent
      
      destructive: '0 63% 31%', // Darker red for dark mode
      destructiveForeground: '210 40% 98%', // Light text on destructive
      
      success: '142 76% 36%', // Same green for success
      successForeground: '0 0% 100%', // White text on success
      
      warning: '38 92% 50%', // Same orange for warnings
      warningForeground: '0 0% 100%', // White text on warning
      
      info: '199 89% 48%', // Same light blue for info
      infoForeground: '0 0% 100%', // White text on info
      
      border: '217 33% 17%', // Dark border color
      input: '217 33% 17%', // Dark input border
      ring: '212 27% 84%', // Light ring for dark mode
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '3rem',    // 48px - Hero text
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  spacing: {
    borderRadius: '0.5rem', // 8px default border radius
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
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    backdropBlur: {
      sm: 'blur(4px)',  // Standard glassmorphism
      md: 'blur(8px)',
      lg: 'blur(12px)',
    },
    transition: {
      fast: '150ms ease-in-out',
      normal: '300ms ease-in-out', // AbacusAI standard
      slow: '500ms ease-in-out',
    },
  },
};
