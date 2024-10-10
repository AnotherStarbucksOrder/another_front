import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MainHomePage from "./pages/MainHomePage/MainHomePage";
import TestPage from "./TestPage";
import MenuDetailPage from "./pages/MenuDetailPage/MenuDetailPage";
import IndexPage from "./pages/adminPage/IndexPage/IndexPage";
import MenuPage from "./pages/adminPage/MenuPage/MenuPage";
import AdminMenuDatailPage from "./pages/adminPage/AdminMenuDetailPage/AdminMenuDatailPage";

function App() {
    return (
        <>
        <Global styles={reset} />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<MainHomePage/>} />
            <Route path="/main/detail/1" element={<MenuDetailPage/>} />
            <Route path="/test" element={<TestPage/>}/>


            <Route path="/admin" element={<IndexPage />}/>
            <Route path="/admin/menu" element={<MenuPage />}/>
            <Route path="/admin/menu/detail/:menuId" element={<AdminMenuDatailPage />}/>
        </Routes>
        </>
    );
}

export default App;
