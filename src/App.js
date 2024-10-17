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
import IndexPage from "./pages/adminPage/IndexPage/IndexPage";
import AdminSalespage from "./pages/adminPage/AdminSalesPage/AdminSalesPage";
import AdminSaleDetailPage from "./pages/adminPage/AdminSaleDetailPage/AdminSaleDetailPage";
import AdminCategoryUpdatePage from "./pages/adminPage/AdminCategoryUpdatePage/AdminCategoryUpdatePage";
import AdminCategoryAddPage from "./pages/adminPage/AdminCategoryAddPage/AdminCategoryAddPage";
import AdminCategoryPage from "./pages/adminPage/AdminCategoryPage/AdminCategoryPage";
import AdminOptionPage from "./pages/adminPage/AdminOptionPage/AdminOptionPage";
import AdminOptionUpdatePage from "./pages/adminPage/AdminOptionUpdatePage/AdminOptionUpdatePage";
import AdminOptionAddPage from "./pages/adminPage/AdminOptionAddPage/AdminOptionAddPage";
import AdminMenuPage from "./pages/adminPage/AdminMenuPage/AdminMenuPage";
import AdminOrderpage from "./pages/adminPage/AdminOrderPage/AdminOrderPage";
import AdminUserPage from "./pages/adminPage/AdminUserPage/AdminUserPage";
import AdminMenuAddPage from "./pages/adminPage/AdminMenuAddPage/AdminMenuAddPage";
import AdminMenuDetailPage from "./pages/adminPage/AdminMenuDetailPage/AdminMenuDetailPage";
import AdminOrderDetailPage from "./pages/adminPage/AdminOrderDetailPage/AdminOrderDetailPage";
import AdminUserAddPage from "./pages/adminPage/AdminUserAddPage/AdminUserAddPage";
import AdminUserDetailPage from "./pages/adminPage/AdminUserDetailPage/AdminUserDetailPage";
import SignInPage from "./pages/adminPage/SignInPage/SignInPage";






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
            <Route path="/auth/signin" element={<SignInPage />}/>
            <Route path="/admin" element={<IndexPage />}/>
            <Route path="/admin/menu" element={<AdminMenuPage />}/>
            <Route path="/admin/menu/add" element={<AdminMenuAddPage />}/>
            <Route path="/admin/menu/detail/:menuId" element={<AdminMenuDetailPage />}/>
            <Route path="/admin/sales" element={<AdminSalespage />}/>
            <Route path="/admin/sale/detail/:orderId" element={<AdminSaleDetailPage />}/>
            <Route path="/admin/order" element={<AdminOrderpage />}/>
            <Route path="/admin/order/detail/:orderId" element={<AdminOrderDetailPage />}/>
            <Route path="/admin/user" element={<AdminUserPage />}/>
            <Route path="/admin/user/detail/:userId" element={<AdminUserDetailPage />}/>
            <Route path="/admin/user/add" element={<AdminUserAddPage />}/>
            <Route path="/admin/category" element={<AdminCategoryPage />}/>
            <Route path="/admin/category/update/:orderId" element={<AdminCategoryUpdatePage />}/>
            <Route path="/admin/category/add" element={<AdminCategoryAddPage />}/>
            <Route path="/admin/option" element={<AdminOptionPage />}/>
            <Route path="/admin/option/update/:orderId" element={<AdminOptionUpdatePage />}/>
            <Route path="/admin/option/add" element={<AdminOptionAddPage />}/>


            {/* 나중에 지울 예정 */}
            <Route path="/test" element={<TestPage/>}/>

        </Routes>
        </>
    );
}

export default App;
