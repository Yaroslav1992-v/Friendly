import React from "react";
import { Route, Routes } from "react-router-dom";
import "./style/index.scss";
import { StartPage } from "./pages/start/StartPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
    </Routes>
  );
}

export default App;
