import { createContext, useState } from "react";


type Theme = "light" | "dark";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

interface ThemePrviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: ThemePrviderProps) => {

    const [theme, setTheme] = useState<Theme>("light")


    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme === "dark" ? "dark" : ""}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeContext;