import React, { createContext, useState, useEffect } from 'react';
import { StatusBar ,Appearance} from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import lightTheme from './Light';
import darkTheme from './Dark';
import AppearanceProvider from '../Components/appearanceProvider/AppearanceProvider';

const defaultMode = Appearance.getColorScheme() || 'light'

const ThemeContext = createContext({
  mode: defaultMode,
  setMode: mode => console.log(mode)
})

const useTheme = () => React.useContext(ThemeContext)

const ManageThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState(defaultMode)
  const setMode = mode => {
    setThemeState(mode)
  }
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme)
    })
    return () => subscription.remove()
  }, [])
  return (
    <ThemeContext.Provider value={{ mode: themeState, setMode }}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme : lightTheme}>
        <>
          <StatusBar
            barStyle={themeState === 'light' ? 'dark-content' : 'light-content'}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const ThemeManager = ({ children }) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
)

export { useTheme, lightTheme, darkTheme};

export default ThemeManager