/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
import Swal from "sweetalert2";

function AdminPageSideBar(props) {
    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate("/admin/menus?page=1");
    }
    const handleSalesClick = () => {
        navigate("/admin/sales");
    }
    const handleOrderClick = () => {
        navigate("/admin/order");
    }
    const handleUserClick = () => {
        navigate("/admin/user");
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

    return (
        <div css={s.layout}>
            <div css={s.titleBox}>
                <Link to={"/admin"}><p>관리자 모드</p></Link>
            </div>
            <div css={s.buttonContainer}>
                <button onClick={handleMenuClick}>메뉴 관리</button>
                <button onClick={handleCategoryClick}>카테 고리 관리</button>
                <button onClick={handleOptionClick}>옵션 관리</button>
                <button onClick={handleSalesClick}>매출 관리</button>
                <button onClick={handleOrderClick}>주문 관리</button>
                <button onClick={handleUserClick}>회원 관리</button>
                <button onClick={handleLogOutClick}>로그아웃</button>
            </div>
        </div>
    );
}

export default AdminPageSideBar;