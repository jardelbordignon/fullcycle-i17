'use client'

import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ReactNode, createContext, useMemo, useState } from 'react'

import { darkTheme, lightTheme } from '@/themes'

interface ThemeContextProps {
  theme: typeof lightTheme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

interface MyThemeProviderProps {
  children: ReactNode
}

export function MuiProvider({ children }: MyThemeProviderProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme)

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme)
      },
    }),
    [theme]
  )

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <>{children}</>
        </ThemeProvider>
      </ThemeContext.Provider>
    </AppRouterCacheProvider>
  )
}
