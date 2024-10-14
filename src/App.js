import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MainHomePage from "./pages/MainHomePage/MainHomePage";
import TestPage from "./TestPage";
import MenuDetailPage from "./pages/MenuDetailPage/MenuDetailPage";
import IndexPage from "./pages/adminPage/IndexPage/IndexPage";
import PayMentPage from "./pages/PayMentPage/PayMentPage";



function App() {
    return (
        <>
        <Global styles={reset} />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menus" element={<MainHomePage/>} />
            <Route path="/menu/detail/1" element={<MenuDetailPage/>} />
            <Route path="/payment" element={<PayMentPage/>} />
            
            {/* admin 페이지 */}
            <Route path="/admin" element={<IndexPage/>} />

            {/* 나중에 지울 예정 */}
            <Route path="/test" element={<TestPage/>}/>
        </Routes>
        </>
    );
}

export default App;
