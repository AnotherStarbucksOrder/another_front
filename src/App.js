import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Global styles={reset} />
        <div>test</div>
        <Routes>
          <Route/>
          <Route/>
          <Route/>
        </Routes>
    </>
  );
}

export default App;
