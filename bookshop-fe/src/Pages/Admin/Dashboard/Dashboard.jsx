import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { getAllOrders } from '../../../api';
import './Dashboard.css';

Chart.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại (0-11 nên +1)
  const currentYear = new Date().getFullYear(); // Năm hiện tại

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [orderData, setOrderData] = useState({
    labels: [],
    datasets: [],
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    placedOrders: 0,
    shippingOrders: 0,
    cancelledOrders: 0,
    completedOrders: 0,
    failedOrders: 0,
    totalRevenue: 0,
    maxOrderValue: 0,
  });

  const fetchData = async (month, year) => {
    try {
      const orders = await getAllOrders();
      const labels = [];
      const placedOrderData = [];
      const shippingOrderData = [];
      const cancelledOrderData = [];
      const completedOrderData = [];
      const failedOrderData = [];
      const revenueData = [];
      const groupedData = {};
      let totalOrders = 0;
      let placedOrders = 0;
      let shippingOrders = 0;
      let cancelledOrders = 0;
      let completedOrders = 0;
      let failedOrders = 0;
      let totalRevenue = 0;
      let maxOrderValue = 0;

      // Lọc và nhóm dữ liệu theo ngày trong tháng đã chọn
      orders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const orderMonth = orderDate.getMonth() + 1;
        const orderYear = orderDate.getFullYear();

        if (orderMonth === month && orderYear === year) {
          totalOrders += 1;
          const date = orderDate.toLocaleDateString('vi-VN');
          if (!groupedData[date]) {
            groupedData[date] = {
              placed: 0,
              shipping: 0,
              cancelled: 0,
              completed: 0,
              failed: 0,
              revenue: 0,
            };
          }

          switch (order.status) {
            // case 'PLACED':
            //   placedOrders += 1;
            //   groupedData[date].placed += 1;
            //   break;
            case 'CONFIRMED':
              placedOrders += 1;
              groupedData[date].placed += 1;
              break;
            case 'SHIPPING':
              shippingOrders += 1;
              groupedData[date].shipping += 1;
              break;
            case 'CANCELLED':
              cancelledOrders += 1;
              groupedData[date].cancelled += 1;
              break;
            case 'COMPLETED':
              completedOrders += 1;
              groupedData[date].completed += 1;
              groupedData[date].revenue += order.total; // Tính doanh thu cho đơn hàng đã giao thành công
              totalRevenue += order.total;
              if (order.total > maxOrderValue) {
                maxOrderValue = order.total;
              }
              break;
            case 'FAILED':
              failedOrders += 1;
              groupedData[date].failed += 1;    
              break;
            default:
              break;
          }
        }
      });

      // Tạo dữ liệu cho biểu đồ
      Object.keys(groupedData).forEach(date => {
        labels.push(date);
        placedOrderData.push(groupedData[date].placed);
        shippingOrderData.push(groupedData[date].shipping);
        cancelledOrderData.push(groupedData[date].cancelled);
        completedOrderData.push(groupedData[date].completed);
        failedOrderData.push(groupedData[date].failed);  
        revenueData.push(groupedData[date].revenue);
      });
      console.log(failedOrders);
      console.log(typeof(failedOrders));

      setOrderData({
        labels,
        datasets: [
          {
            label: 'Đơn hàng đã duyệt',
            data: placedOrderData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y1',
          },
          {
            label: 'Đơn hàng đang giao',
            data: shippingOrderData,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            yAxisID: 'y1',
          },
          {
            label: 'Đơn hàng đã hủy',
            data: cancelledOrderData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y1',
          },
          {
            label: 'Đơn hàng đã giao',
            data: completedOrderData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            yAxisID: 'y1',
          },

          {
            label: 'Đơn hàng thất bại',
            data: failedOrderData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            yAxisID: 'y1',
          },
          {
            label: 'Tổng thu (VND)',
            data: revenueData,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            yAxisID: 'y2',
          },
        ],
      });

      setStats({
        totalOrders,
        placedOrders,
        shippingOrders,
        cancelledOrders,
        completedOrders,
        failedOrders,
        totalRevenue,
        maxOrderValue,
      });
    } catch (error) {
      console.error('Failed to fetch order data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  return (
    <div className="dashboard-page">
      <h2>Thống kê đơn hàng</h2>
      <div className="filters">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              Tháng {index + 1}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          min="2000"
          max={new Date().getFullYear()}
        />
      </div>
      <div className="chart-container">
        <Line
          data={orderData}
          options={{
            responsive: true,
            scales: {
              y1: {
                type: 'linear',
                position: 'left',
                ticks: {
                  beginAtZero: true,
                },
                title: {
                  display: true,
                  text: 'Số lượng đơn hàng',
                },
              },
              y2: {
                type: 'linear',
                position: 'right',
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                  },
                },
                title: {
                  display: true,
                  text: 'Giá trị (VND)',
                },
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          }}
        />
      </div>
      <div className="stats-container">
        <h3>Thống kê tháng {selectedMonth}/{selectedYear}</h3>
        <p><strong>Tổng số đơn hàng:</strong> {stats.totalOrders}</p>
        <p><strong>Đơn hàng khách đã duyệt:</strong> {stats.placedOrders}</p>
        <p><strong>Đơn hàng đang giao:</strong> {stats.shippingOrders}</p>
        <p><strong>Đơn hàng đã hủy:</strong> {stats.cancelledOrders}</p>
        <p><strong>Đơn hàng đã giao thành công:</strong> {stats.completedOrders}</p>
        <p><strong>Đơn hàng giao thất bại:</strong> {stats.failedOrders}</p>
        <p><strong>Tổng giá trị đã thu về:</strong> {stats.totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        <p><strong>Giá trị đơn hàng cao nhất đã hoàn thành:</strong> {stats.maxOrderValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
      </div>
    </div>
    );
  };


export default Dashboard;