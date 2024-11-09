/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../apis/util/instance";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

Chart.register(LinearScale, CategoryScale, BarElement, ArcElement, Title, Tooltip, Legend);
function IndexPage(props) {
    const [selectedOption, setSelectedOption] = useState("totalSales");
    const [selectYear, setDateType] = useState(2024);
    const [salse, setData] = useState({
        totalAmount: "",
        orderCount: "",
        refundAmount: "",
        refundCount: "",
        todayTotalAmount: "",
        todayOrderCount: "",
        todayRefundAmount: "",
        todayRefundCount: "",
    });

    // 매출 정보 조회
    const saleInfo = useQuery(
        ["saleIngoQuery", selectYear],
        async () => await instance.get(`/admin/sales/manage/${selectYear}/dashboard`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setData(response?.data)
            }
        }
    )
    const saleList = salse?.monthly?.map(item => item.totalSales);
    const menuList = salse?.mostMenus?.map(item => item.menuName);
    const rankList = salse?.mostMenus?.map(item => item.rank);

    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        datasets: [{
            label: "Sales",
            data: saleList,
            borderColor: "rgb(12, 7, 8)",
            backgroundColor: "#036635",
        }],
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "월별 매출 현황",
                font: {
                    size: 20, 
                    weight: "bold",
                },
            }
        }
    }

    const doudata = {
        labels: menuList,
        datasets: [{
            label: "My First Dataset",
            data: rankList,
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(86, 244, 255)",
                "rgb(86, 255, 151)",
                "rgb(255, 205, 86)",
            ],
            hoverOffset: 4
        }]
    };
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                position: "right", 
                align: "center",
                labels: {
                    boxWidth: 25,
                    padding: 25,
                    usePointStyle: true,
                    font: {
                        size: 15, 
                        weight: 600 
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || "";
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    }
                }
            },
            title: {
                display: true,
                text: "메뉴별 판매 현황",
                font: {
                    size: 20,
                    weight: "bold" 
                },
            }
        }
    };

    const handleToggle = (option) => {
        setSelectedOption(option);
    };

    const handleDateTypeChange = (e) => {
        setDateType(e.target.value);
    };

    return (
        <>
            <div css={s.layout}>
                <div css={s.container}>

                    <div css={s.salesTableBox}>
                        <div css={s.selectedYear}>
                            <select onChange={handleDateTypeChange} value={selectYear}>
                                {
                                    saleInfo?.data?.data.yearCount.map(year =>
                                        <option key={uuidv4()} value={year}>{year}</option>
                                    )

                                }
                            </select>
                        </div>
                        <div css={s.toggleContainer}>
                            <div
                                css={[s.toggleButton, selectedOption === "totalSales" ? s.activeButton : s.inactiveButton]}
                                onClick={() => handleToggle("totalSales")}
                            >
                                총 매출
                            </div>
                            <div
                                css={[s.toggleButton, selectedOption === "dailySales" ? s.activeButton : s.inactiveButton]}
                                onClick={() => handleToggle("dailySales")}
                            >
                                금일 매출
                            </div>
                        </div>

                        <table css={s.tableLayout}>
                            <thead>
                                <tr>
                                    {selectedOption === "totalSales" ? (
                                        <>
                                            <th>총 매출</th>
                                            <th>총 결제 완료 건</th>
                                            <th>총 환불 금액</th>
                                            <th>총 환불 건 수</th>
                                        </>
                                    ) : (
                                        <>
                                            <th>금일 매출</th>
                                            <th>금일 결제 완료 건</th>
                                            <th>금일 환불 금액</th>
                                            <th>금일 환불 건</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {selectedOption === "totalSales" ? (
                                        <>
                                            <td>{(salse?.respSaleDto?.totalAmount.toLocaleString() || 0) + "원"}</td>
                                            <td>{salse?.respSaleDto?.orderCount}건</td>
                                            <td>{(salse?.respSaleDto?.refundAmount.toLocaleString() || 0) + "원"}</td>
                                            <td>{salse?.respSaleDto?.refundCount}건</td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{(salse?.respSaleDto?.todayTotalAmount.toLocaleString() || 0) + "원"}</td>
                                            <td>{salse?.respSaleDto?.todayOrderCount}건</td>
                                            <td>{(salse?.respSaleDto?.todayRefundAmount.toLocaleString() || 0) + "원"}</td>
                                            <td>{salse?.respSaleDto?.todayRefundCount}건</td>
                                        </>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <div css={s.salesInfoBox}>
                        <img src="/KakaoTalk_Photo_2024-10-17-16-40-07.jpg" alt="" />

                    </div> */}
                </div>
                <div css={s.container}>
                    <div css={s.menuInfoBox}>
                        <Bar data={data} options={options} />
                    </div>
                    <div css={s.chartInfoBox}>
                        {menuList && menuList.length > 0 ? (
                            <Doughnut data={doudata} options={doughnutOptions} />
                        ) : (
                            <img src="/ggg.jpg" alt="" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default IndexPage;