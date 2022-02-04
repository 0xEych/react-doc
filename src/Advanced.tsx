import { createContext, useContext, VFC } from "react";

const ThemeContext = createContext("light");

const Advanced: VFC = () => {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
};

const Toolbar: VFC = () => {
  return (
    <div>
      <ThemedButton />
    </div>
  );
};

const ThemedButton: VFC = () => {
  const theme = useContext(ThemeContext);
  return <Button theme={theme} />;
};

const Button: VFC<{ theme: string }> = ({ theme }) => {
  const defaultTheme: React.CSSProperties = {
    backgroundColor: "white",
    color: "gray",
  };
  const darkTheme: React.CSSProperties = {
    backgroundColor: "gray",
    color: "white",
  };
  return (
    <button style={theme === "dark" ? darkTheme : defaultTheme}>Button</button>
  );
};

export default Advanced;
