import { DefaultTheme, DarkTheme } from "@react-navigation/native";

// Modify default theme
export const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "#EAFBFF",
    background: "#1E2F37",
  },
};
