import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import TestPage from "./TestPage";
import HomePage from "./pages/HomePage/HomePage";
import IndexPage from "./pages/adminPage/IndexPage/IndexPage";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/test" element={<HomePage />} />
        <Route path="/main" element={<TestPage/>} />
        <Route path="/admin/index" element={<IndexPage/>} />
      </Routes>
    </>
  );
}

export default App;
