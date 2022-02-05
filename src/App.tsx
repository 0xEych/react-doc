import React, { useState, VFC } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Advanced from "./Advanced";
import ContextApp from "./components/context/context";
import ContextsApp from "./components/contexts/contexts";

import Main from "./Main";
import Mock from "./mock";

const App: VFC = () => {
  const [state, setState] = useState({ user: "Default User" });
  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ user: e.target.value });
  };
  return (
    <BrowserRouter>
      <nav
        style={{ position: "fixed", top: 0, right: 0, backgroundColor: "gray" }}
      >
        <ul style={{ display: "flex" }}>
          <li style={{ marginRight: "2rem", listStyle: "none" }}>
            <Link to="/">MAIN</Link>
          </li>
          <li style={{ marginRight: "2rem", listStyle: "none" }}>
            <Link to="/mock">MOCK</Link>
          </li>
          <li style={{ marginRight: "2rem", listStyle: "none" }}>
            <Link to="/advanced">ADVANCED</Link>
          </li>
          <li style={{ marginRight: "2rem", listStyle: "none" }}>
            <Link to="/context">CONTEXT</Link>
          </li>
          <li style={{ marginRight: "2rem", listStyle: "none" }}>
            <Link to="/contexts">CONTEXTs</Link>
            <input type="text" value={state.user} onChange={handleChangeUser} />
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="mock" element={<Mock />} />
        <Route path="advanced" element={<Advanced />} />
        <Route path="context" element={<ContextApp />} />
        <Route
          path="contexts"
          element={
            <ContextsApp theme="dark" signedInUser={{ name: state.user }} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
