import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import MainTop from "./components/MainTop/MainTop";
import MainTopBar from "./components/MainTopBar/MainTopBar";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path="/test1" element={<MainTop />} />
        <Route path="/test2" element={<MainTopBar />} />
        <Route path="" element={<></>} />
      </Routes>
    </>
  );
}

export default App;
