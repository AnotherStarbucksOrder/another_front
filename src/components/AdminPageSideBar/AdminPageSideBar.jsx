/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
import Swal from "sweetalert2";

function AdminPageSideBar(props) {
    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate("/admin/menu");
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
    const handleLogOutClick = () => {
        Swal.fire({
            title: "로그아웃 하시겠습니끼?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
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
                <button>매출 관리</button>
                <button>주문 관리</button>
                <button>회원 관리</button>
                <button>카테 고리 관리</button>
                <button onClick={handleLogOutClick}>로그아웃</button>
            </div>
        </div>
    );
}

export default AdminPageSideBar;