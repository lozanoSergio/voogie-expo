import { default as appTheme } from "./appTheme.json";
import { light, dark } from '@eva-design/eva';

export const themes = {
  "Eva Light": light,
  "Eva Dark": dark,
  "App Theme": appTheme
};
export { ThemeContext } from "./themeContext";
export { ThemeStore } from "./themeStore";
export { ThemeService } from "./themeService";


