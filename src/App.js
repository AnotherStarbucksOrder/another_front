import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import MainTop from "./components/MainTop/MainTop";
import MainTopBar from "./components/MainTopBar/MainTopBar";
import TestPage from "./TestPage";
import MainFooter from "./components/MainFooter/MainFooter";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/test1" element={<MainTop />} />
        <Route path="/test2" element={<MainTopBar />} />
        <Route path="/test3" element={<MainFooter />} />
        <Route path="/" element={<TestPage/>} />
      </Routes>
    </>
  );
}

export default App;
