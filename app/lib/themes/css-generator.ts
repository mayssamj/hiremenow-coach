
import { ThemeDefinition, ThemeColors } from './types';

// Generate CSS custom properties from theme definition
export function generateThemeCSS(theme: ThemeDefinition): string {
  const lightVariables = generateColorVariables(theme.colors.light);
  const darkVariables = generateColorVariables(theme.colors.dark);
  
  return `
    :root[data-theme="${theme.id}"] {
      ${lightVariables}
      ${generateTypographyVariables(theme)}
      ${generateSpacingVariables(theme)}
      ${generateEffectVariables(theme)}
    }
    
    .dark[data-theme="${theme.id}"] {
      ${darkVariables}
    }
    
    /* Glassmorphism utilities for ${theme.name} */
    .glass-card {
      background: hsl(var(--card));
      backdrop-filter: var(--backdrop-blur-sm);
      border: 1px solid hsl(var(--border) / 0.2);
      transition: var(--transition-normal);
    }
    
    .glass-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
    
    /* Enhanced button styles for ${theme.name} */
    .btn-primary-enhanced {
      background: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border-radius: var(--radius);
      padding: 0.5rem 1rem;
      font-weight: var(--font-weight-medium);
      transition: var(--transition-normal);
      border: none;
    }
    
    .btn-primary-enhanced:hover {
      background: hsl(var(--primary) / 0.9);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    
    /* Enhanced input styles for ${theme.name} */
    .input-enhanced {
      background: hsl(var(--background));
      border: 1.5px solid hsl(var(--border));
      border-radius: var(--radius);
      padding: 0.5rem 1rem;
      transition: var(--transition-normal);
    }
    
    .input-enhanced:focus {
      outline: none;
      border-color: hsl(var(--ring));
      box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
    }
  `;
}

function generateColorVariables(colors: ThemeColors): string {
  const entries = Object.entries(colors);
  return entries
    .map(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  --${cssVar}: ${value};`;
    })
    .join('\n');
}

function generateTypographyVariables(theme: ThemeDefinition): string {
  const { typography } = theme;
  
  const fontSizes = Object.entries(typography.fontSize)
    .map(([key, value]) => `  --font-size-${key}: ${value};`)
    .join('\n');
    
  const fontWeights = Object.entries(typography.fontWeight)
    .map(([key, value]) => `  --font-weight-${key}: ${value};`)
    .join('\n');
    
  const lineHeights = Object.entries(typography.lineHeight)
    .map(([key, value]) => `  --line-height-${key}: ${value};`)
    .join('\n');
  
  return `
  --font-family: ${typography.fontFamily};
${fontSizes}
${fontWeights}
${lineHeights}`;
}

function generateSpacingVariables(theme: ThemeDefinition): string {
  const { spacing } = theme;
  
  const spacingVars = Object.entries(spacing.spacing)
    .map(([key, value]) => `  --spacing-${key}: ${value};`)
    .join('\n');
  
  return `
  --radius: ${spacing.borderRadius};
${spacingVars}`;
}

function generateEffectVariables(theme: ThemeDefinition): string {
  const { effects } = theme;
  
  const shadows = Object.entries(effects.boxShadow)
    .map(([key, value]) => `  --shadow-${key}: ${value};`)
    .join('\n');
    
  const blurs = Object.entries(effects.backdropBlur)
    .map(([key, value]) => `  --backdrop-blur-${key}: ${value};`)
    .join('\n');
    
  const transitions = Object.entries(effects.transition)
    .map(([key, value]) => `  --transition-${key}: ${value};`)
    .join('\n');
  
  return `
${shadows}
${blurs}
${transitions}`;
}
