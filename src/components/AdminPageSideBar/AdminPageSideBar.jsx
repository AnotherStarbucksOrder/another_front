/** @jsxImportSource @emotion/react */
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./style";
import Swal from "sweetalert2";

function AdminPageSideBar(props) {
    const navigate = useNavigate();
    const location = useLocation(); 

    
    const handleMenuClick = () => {
        navigate("/admin/menus?page=1");
    }

    const handleSalesClick = () => {
        navigate("/admin/sales?page=1");
    }

    const handleOrderClick = () => {
        navigate("/admin/order?page=1");
    }

    const handleUserClick = () => {
        navigate("/admin/user?page=1");
    }

    const handleCategoryClick = () => {
        navigate("/admin/category");
    }

    const handleOptionClick = () => {
        navigate("/admin/option");
    }

    const handleLogOutClick = () => {
        Swal.fire({
            title: "로그아웃 하시겠습니끼?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("accessToken");
                navigate("/");
            }
        })
    }


    const isActive = (path) => location.pathname.includes(path);

    return (
        <div css={s.layout}>
            <div css={s.titleBox}>
                <Link to={"/admin"}><img src="https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg" alt="" /></Link>
            </div>
            <div css={s.buttonContainer}>
                <button onClick={handleMenuClick} css={isActive("/admin/menu") ? s.activeButton : null} >메뉴 관리</button>
                <button onClick={handleCategoryClick} css={isActive("/admin/category") ? s.activeButton : null}>카테 고리 관리</button>
                <button onClick={handleOptionClick} css={isActive("/admin/option") ? s.activeButton : null}>옵션 관리</button>
                <button onClick={handleSalesClick} css={isActive("/admin/sales") ? s.activeButton : null}>매출 관리</button>
                <button onClick={handleOrderClick} css={isActive("/admin/order") ? s.activeButton : null}>주문 관리</button>
                <button onClick={handleUserClick} css={isActive("/admin/user") ? s.activeButton : null}>회원 관리</button>
                <button onClick={handleLogOutClick}>로그아웃</button>
            </div>
        </div>
    );
}

export default AdminPageSideBar;