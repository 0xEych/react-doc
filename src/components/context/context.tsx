import React, { useState, VFC } from "react";
import { ThemeContext, themes } from "./theme-context";
import ThemeTogglerButton from "./theme-toggler-button";
import ThemedButton from "./themed-button";

const Toolbar: VFC<{ changeTheme: () => void }> = ({ changeTheme }) => {
  return <ThemedButton onClick={changeTheme}>Change Theme</ThemedButton>;
};

const ContextApp: VFC = () => {
  const toggleTheme = () => {
    setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
      toggleTheme: toggleTheme,
    }));
  };
  const [state, setState] = useState({
    theme: themes.light,
    toggleTheme: toggleTheme,
  });
  return (
    <Page>
      <ThemeContext.Provider
        value={{ theme: state.theme, toggleTheme: toggleTheme }}
      >
        <Toolbar changeTheme={toggleTheme} />
      </ThemeContext.Provider>
      <ThemeContext.Provider value={state}>
        <ThemeTogglerButton />
      </ThemeContext.Provider>
    </Page>
  );
};

const Page: VFC<{ children: React.ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default ContextApp;
