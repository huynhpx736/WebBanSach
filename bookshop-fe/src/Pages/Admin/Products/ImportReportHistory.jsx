import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {fetchAllImportReports, fetchImportReportById, getImportReportDetailByImportReportId} from '../../../api';
import { Link } from 'react-router-dom';
// import './ImportReportManagement.css';
import '../Orders/OrderManagement.css';
import './ImportReportHistory.css';
const ImportReportHistory = () => {
  const [importReports, setImportReports] = useState([]);
  const [filteredImportReports, setFilteredImportReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [searchProductID, setSearchProductID] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchImportReports = async () => {
      try {
        const data = await fetchAllImportReports();
        const sortedData = data.sort(
          (a, b) => new Date(b.id) - new Date(a.id) 
        );
        setImportReports(sortedData);
        setFilteredImportReports(sortedData);
      } catch (error) {
        console.error('Failed to fetch accepted importReports:', error);
      }
    };
    fetchImportReports();
  }, []);


    const navigate = useNavigate();
    const handleCreateImport = () => {
        navigate('/admin/create-import-report');
    };

  const handleSearch = () => {
    let results = importReports;

    if (searchKeyword) {
      results = results.filter(importReport =>
        importReport.id.toString().includes(searchKeyword.trim())
      );
    }

    if (searchDate) {
      results = results.filter(importReport =>
        new Date(importReport.createdAt).toLocaleDateString('vi-VN') ===
        new Date(searchDate).toLocaleDateString('vi-VN')
      );
    }

    if (searchCustomer) {
      results = results.filter(importReport =>
        importReport.user.fullname.toLowerCase().includes(searchCustomer.trim().toLowerCase())
      );
    }

    if (searchProductID) {
      navigate(`/admin/history-import-product/${searchProductID}`);      
    }

    setFilteredImportReports(results);
    setCurrentPage(1); 
  };

  const resetSearch = () => {
    setSearchKeyword('');
    setSearchDate('');
    setSearchCustomer('');
    setFilteredImportReports(importReports);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(filteredImportReports.length / itemsPerPage);
  const currentImportReports = filteredImportReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  

  return (
    <div className="importReports-page">
      <h2>LỊCH SỬ NHẬP HÀNG</h2>
      
      <div className="search-bar">
                    <Button id="btn-create-import"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateImport}
                    style={{ backgroundColor: '#1976d2', color: '#fff' }}
                >
                    Tạo phiếu nhập
                </Button>
                <div> &emsp;&emsp;&emsp;&emsp;</div>
        <input
          type="text"
          placeholder="Tìm theo mã phiếu.."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Tìm theo người nhập..."
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        /> */}
        <input
          type="text"
          placeholder="Tìm theo mã sản phẩm..."
          value={searchProductID}
          onChange={(e) => setSearchProductID(e.target.value)}
        />

        <button onClick={handleSearch}>Tìm kiếm</button>
        <button onClick={resetSearch}>Đặt lại</button>
      </div>

      {currentImportReports.length === 0 ? (
        <p className="no-importReports">Không có phiếu nhập nào</p>
      ) : (
        <>
          <table className="importReports-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Ngày tạo</th>
                {/* <th>Tổng tiền</th> */}
                {/* <th>Người nhập</th> */}
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentImportReports.map(importReport => (
                <tr key={importReport.id}>
                  <td>
                    <Link to={`/admin/import-report-detail/${importReport.id}`}>{importReport.id}</Link>
                  </td>
                  <td>{new Date(importReport.createdAt).toLocaleString()}</td>
                  {/* <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(importReport.total)}</td> */}
                  {/* <td>{importReport.user.fullname}</td> */}
                  {/* <td>{importReport.shipper ? importReport.shipper.fullname : 'Chưa phân công'}</td> */}
                  <td>
                    <button className="btn-view-detail" onClick={() => window.open(`/admin/import-report-detail/${importReport.id}`)}>Xem chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

     
    </div>
  );
};

export default ImportReportHistory;
