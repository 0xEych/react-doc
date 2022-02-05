import { VFC, createContext, useContext } from "react";

const ThemeContext = createContext("light");

const UserContext = createContext({
  name: "Guest",
});

const ContextsApp: VFC<{ theme: string; signedInUser: { name: string } }> = ({
  theme,
  signedInUser,
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={signedInUser}>
        <Layout />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

const Layout: VFC = () => {
  const Sidebar: VFC = () => <div>SideBAR</div>;
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
};

const Content: VFC = () => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const ProfilePage: VFC<{ user: { name: string }; theme: string }> = ({
    user,
    theme,
  }) => {
    return (
      <div>
        <div>User: {user.name}</div>
        <div>Theme: {theme}</div>
      </div>
    );
  };
  return <ProfilePage user={user} theme={theme} />;
};

export default ContextsApp;
