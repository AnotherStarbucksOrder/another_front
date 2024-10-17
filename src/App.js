import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MainHomePage from "./pages/MainHomePage/MainHomePage";
import TestPage from "./TestPage";
import MenuDetailPage from "./pages/MenuDetailPage/MenuDetailPage";
import PayMentTypePage from "./pages/PayMentPage/PayMentTypePage/PayMentTypePage";
import CardPaymentPage from "./pages/PayMentPage/CardPaymentPage/CardPaymentPage";
import RewardPage from "./pages/PayMentPage/RewardPage/RewardPage";
import PointPaymentPage from "./pages/PayMentPage/PointPaymentPage/PointPaymentPage";






function App() {
    return (
        <>
        <Global styles={reset} />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<MainHomePage/>} />
            <Route path="/menu/detail/:menuId" element={<MenuDetailPage/>} />
            <Route path="/payment" element={<PayMentTypePage/>} />
            <Route path="/payment/card" element={<CardPaymentPage/>} />
            <Route path="/payment/point" element={<PointPaymentPage/>} />
            <Route path="/reward" element={<RewardPage/>} />
            
            {/* admin 페이지 */}

            {/* 나중에 지울 예정 */}
            <Route path="/test" element={<TestPage/>}/>



            
        </Routes>
        </>
    );
}

export default App;
