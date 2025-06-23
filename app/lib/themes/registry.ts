
import { ThemeDefinition } from './types';
import { abacusAITheme } from './abacus-ai';
import { modernVibrantTheme } from './modern-vibrant';
import { minimalFuturisticTheme } from './minimal-futuristic';
import { abstractCreativeTheme } from './abstract-creative';

// Theme registry - all available themes
export const themeRegistry: ThemeDefinition[] = [
  abacusAITheme,
  modernVibrantTheme,
  minimalFuturisticTheme,
  abstractCreativeTheme,
];

export function getThemeById(id: string): ThemeDefinition | undefined {
  return themeRegistry.find(theme => theme.id === id);
}

export function getDefaultTheme(): ThemeDefinition {
  return themeRegistry.find(theme => theme.isDefault) || abacusAITheme;
}

export function getAllThemes(): ThemeDefinition[] {
  return themeRegistry;
}
