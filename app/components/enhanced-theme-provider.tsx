
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ThemeProvider } from "@/contexts/theme-context"

export function EnhancedThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextThemesProvider>
  )
}
