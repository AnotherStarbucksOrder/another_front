import { useQuery } from 'react-query';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../../apis/util/instance';
import IndexPage from "../../pages/adminPage/IndexPage/IndexPage";
import AdminSalespage from "../../pages/adminPage/AdminSalesPage/AdminSalesPage";
import AdminSaleDetailPage from "../../pages/adminPage/AdminSaleDetailPage/AdminSaleDetailPage";
import AdminCategoryUpdatePage from "../../pages/adminPage/AdminCategoryUpdatePage/AdminCategoryUpdatePage";
import AdminCategoryAddPage from "../../pages/adminPage/AdminCategoryAddPage/AdminCategoryAddPage";
import AdminCategoryPage from "../../pages/adminPage/AdminCategoryPage/AdminCategoryPage";
import AdminOptionPage from "../../pages/adminPage/AdminOptionPage/AdminOptionPage";
import AdminOptionUpdatePage from "../../pages/adminPage/AdminOptionUpdatePage/AdminOptionUpdatePage";
import AdminOptionAddPage from "../../pages/adminPage/AdminOptionAddPage/AdminOptionAddPage";
import AdminMenuPage from "../../pages/adminPage/AdminMenuPage/AdminMenuPage";
import AdminOrderpage from "../../pages/adminPage/AdminOrderPage/AdminOrderPage";
import AdminUserPage from "../../pages/adminPage/AdminUserPage/AdminUserPage";
import AdminMenuAddPage from "../../pages/adminPage/AdminMenuAddPage/AdminMenuAddPage";
import AdminMenuDetailPage from "../../pages/adminPage/AdminMenuDetailPage/AdminMenuDetailPage";
import AdminOrderDetailPage from "../../pages/adminPage/AdminOrderDetailPage/AdminOrderDetailPage";
import AdminUserAddPage from "../../pages/adminPage/AdminUserAddPage/AdminUserAddPage";
import AdminUserDetailPage from "../../pages/adminPage/AdminUserDetailPage/AdminUserDetailPage";
import SignInPage from "../../pages/adminPage/SignInPage/SignInPage";
import AdminPageSideBar from '../../components/AdminPageSideBar/AdminPageSideBar';

function AdminRoutes(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const accessTokenValid = useQuery(
        ["accessTokenValidQuery", location.pathname],
        async () => {
            return await instance.get("/admin/auth/access", {
                params: {
                    accessToken: localStorage.getItem("accessToken")
                }
            });
        },
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                if(location.pathname === "/admin/auth/signin") {
                    navigate("/admin");
                }
            },
            onError: e => {
                if(location.pathname !== "/admin/auth/signin" || !localStorage.getItem("accessToken")) {
                    navigate("/admin/auth/signin");
                }
                if(e.response.status === 403) {
                    alert("접근 권한이 없습니다.")
                    localStorage.removeItem("accessToken")
                    navigate("/")
                }
            }
        }
    );

    return (
        <>
            {
                accessTokenValid.isLoading ? <></> : 
                <Routes>
                    <Route path="/auth/signin" element={<SignInPage />} />
                    <Route path="/*" element={<>
                        <AdminPageSideBar />    
                        <Routes>
                            <Route path="/" element={<IndexPage />} />
                            <Route path="/menus" element={<AdminMenuPage />} />
                            <Route path="/menu/add" element={<AdminMenuAddPage />} />
                            <Route path="/menu/detail/:menuId" element={<AdminMenuDetailPage />} />
                            <Route path="/sales" element={<AdminSalespage />} />
                            <Route path="/sale/detail/:orderId" element={<AdminSaleDetailPage />} />
                            <Route path="/order" element={<AdminOrderpage />} />
                            <Route path="/order/detail/:orderId" element={<AdminOrderDetailPage />} />
                            <Route path="/user" element={<AdminUserPage />} />
                            <Route path="/user/detail/:userId" element={<AdminUserDetailPage />} />
                            <Route path="/user/add" element={<AdminUserAddPage />} />
                            <Route path="/category" element={<AdminCategoryPage />} />
                            <Route path="/category/update/:categoryId" element={<AdminCategoryUpdatePage />} />
                            <Route path="/category/add" element={<AdminCategoryAddPage />} />
                            <Route path="/option" element={<AdminOptionPage />} />
                            <Route path="/option/update/:optionId" element={<AdminOptionUpdatePage />} />
                            <Route path="/option/add" element={<AdminOptionAddPage />} />
                        </Routes>
                    </>} />
                </Routes>
            }
        </>
    );
}

export default AdminRoutes;