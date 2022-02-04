import { VFC } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Advanced from "./Advanced";

import Main from "./Main";
import Mock from "./mock";

const App: VFC = () => {
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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="mock" element={<Mock />} />
        <Route path="advanced" element={<Advanced />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
