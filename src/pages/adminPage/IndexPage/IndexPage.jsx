/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../../apis/util/instance";
import { useState, useTransition } from "react";
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

Chart.register(LinearScale, CategoryScale, BarElement, ArcElement, Title, Tooltip, Legend);
function IndexPage(props) {
    const [selectedOption, setSelectedOption] = useState('totalSales');
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

    console.log(salse);

    const reqData = {
        page: 1,
        limit: 13,
        startDate: "",
        endDate: "2024-10-31",
    }

    const saleInfo = useQuery(
        ["saleIngoQuery"],
        async () => await instance.get("/admin/sales/manage/dashboard"),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response)
                setData(response?.data)

            }
        }
    )
    const saleList = salse?.monthly?.map(item => item.totalSales);
    const menuList = salse?.mostMenus?.map(item => item.menuName);
    const rankList = salse?.mostMenus?.map(item => item.rank);

    console.log(saleList);
    console.log(menuList);
    console.log(rankList);

    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [{
            label: 'Sales',
            data: saleList,
            borderColor: 'rgb(12, 7, 8)',
            backgroundColor: '#036635',
        }],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    const doudata = {
        labels: menuList,
        datasets: [{
            label: 'My First Dataset',
            data: rankList,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(86, 244, 255)',
                'rgb(86, 255, 151)',
                'rgb(255, 205, 86)',
            ],
            hoverOffset: 4
        }]
    };
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false, // 비율 유지하지 않음
        plugins: {
            legend: {
                display: true,
                position: 'right', // 범례를 오른쪽에 배치
                align: 'center',
                labels: {
                    boxWidth: 25,
                    padding: 25,
                    usePointStyle: true,
                    font: {
                        size: 16, // 원하는 폰트 크기 설정 (예: 14px)
                        weight: 500 // 원하는 폰트 두께 설정
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        }
    };

    const handleToggle = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div css={s.layout}>
                <div css={s.container}>

                    <div css={s.salesTableBox}>
                        <div css={s.toggleContainer}>
                            <div
                                css={[s.toggleButton, selectedOption === 'totalSales' ? s.activeButton : s.inactiveButton]}
                                onClick={() => handleToggle('totalSales')}
                            >
                                총 매출
                            </div>
                            <div
                                css={[s.toggleButton, selectedOption === 'dailySales' ? s.activeButton : s.inactiveButton]}
                                onClick={() => handleToggle('dailySales')}
                            >
                                금일 매출
                            </div>
                        </div>

                        <table css={s.tableLayout}>
                            <thead>
                                <tr>
                                    {selectedOption === 'totalSales' ? (
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
                                    {selectedOption === 'totalSales' ? (
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
                    <div css={s.salesInfoBox}>
                    <img src="/KakaoTalk_Photo_2024-10-17-16-40-07.jpg" alt="" />

                    </div>
                </div>
                <div css={s.container}>
                    <div css={s.menuInfoBox}>
                        <Bar data={data} options={options} />
                    </div>
                    <div css={s.menuInfoBox}>
                        <Doughnut data={doudata} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default IndexPage;