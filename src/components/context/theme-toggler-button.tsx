import { useContext, VFC } from "react";
import { ThemeContext } from "./theme-context";

const ThemeTogglerButton: VFC = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <button
      onClick={themeContext.toggleTheme}
      style={{
        backgroundColor: themeContext.theme.background,
        color: themeContext.theme.foreground,
      }}
    >
      Toggle Theme
    </button>
  );
};
export default ThemeTogglerButton;
