import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MainHomePage from "./pages/MainHomePage/MainHomePage";
import TestPage from "./TestPage";
import MenuDetailPage from "./pages/MenuDetailPage/MenuDetailPage";

function App() {
    return (
        <>
        <Global styles={reset} />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainHomePage/>} />
            <Route path="/main/detail/1" element={<MenuDetailPage/>} />
            <Route path="/test" element={<TestPage/>}/>
        </Routes>
        </>
    );
}

export default App;
