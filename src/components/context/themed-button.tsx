import React, { VFC } from "react";
import { useContext } from "react";
import { ThemeContext } from "./theme-context";

const ThemedButton: VFC<{
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ onClick, children }) => {
  const theme = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: theme.theme.background,
        color: theme.theme.foreground,
      }}
    >
      {children}
    </button>
  );
};

export default ThemedButton;
