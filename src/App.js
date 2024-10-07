import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import TestPage from "./TestPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/test" element={<HomePage />} />
        <Route path="/main" element={<TestPage/>} />
      </Routes>
    </>
  );
}

export default App;
