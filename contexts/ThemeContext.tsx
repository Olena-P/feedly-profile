import React, { createContext, useContext, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../store/slices/themeSlice";
import { lightTheme, darkTheme } from "../constants/GlobalStyles";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const theme = isDarkMode
    ? { ...darkTheme, textColor: "#fff" }
    : { ...lightTheme, textColor: "#000" };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme: handleToggleTheme, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
