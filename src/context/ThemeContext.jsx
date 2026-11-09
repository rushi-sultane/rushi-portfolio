
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const getInitialTheme = () => {
    try {
        const savedTheme = localStorage.getItem('portfolio-theme')
        return savedTheme === 'light' || savedTheme === 'dark'
            ? savedTheme
            : 'dark'
    } catch {
        return 'dark'
    }
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)

        try {
            localStorage.setItem('portfolio-theme', theme)
        } catch {
            // Theme still works if storage is unavailable.
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(current => current === 'dark' ? 'light' : 'dark')
    }

    const contextValue = useMemo(
        () => ({ theme, toggleTheme }),
        [theme]
    )

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }

    return context
}
