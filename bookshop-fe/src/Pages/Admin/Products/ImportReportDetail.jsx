import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchImportReportById, getImportReportDetailByImportReportId } from '../../../api';
import './ImportReportDetail.css';
import { Card, CardContent, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ImportReportDetail = () => {
    const { id } = useParams(); 
    const [importReport, setImportReport] = useState(null);
    const [reportDetails, setReportDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const reportData = await fetchImportReportById(id);
                const detailsData = await getImportReportDetailByImportReportId(id);

                setImportReport(reportData);
                setReportDetails(detailsData);
            } catch (error) {
                console.error('Error fetching import report details:', error);
            }
        };

        fetchReportData();
    }, [id]);

    if (!importReport || !reportDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="import-report-detail">
            <Card className="report-info">
                <CardContent>
                    <Typography variant="h4" className="report-title">
                        {/* Chi tiết phiếu nhập #{importReport.id} */}
                        CHI TIẾT PHIẾU NHẬP
                    </Typography>
                    <Divider className="divider" />
                    {/* <Typography variant="body1" className="report-detail">
                        <strong>Người tạo:</strong> {importReport.user.fullname} ({importReport.user.username})
                    </Typography>
                    <Typography variant="body1" className="report-detail">
                        <strong>Email:</strong> {importReport.user.email}
                    </Typography> */}
                    <Typography variant="body1" className="report-detail">
                        <strong>Mã phiếu:</strong> {importReport.id} 
                    </Typography>
                    <Typography variant="body1" className="report-detail">
                        <strong>Ngày tạo:</strong> {new Date(importReport.createdAt).toLocaleString()}
                    </Typography>
                    {/* <Typography variant="body1" className="report-detail">
                        <strong>Ngày cập nhật:</strong> {new Date(importReport.updatedAt).toLocaleString()}
                    </Typography> */}
                </CardContent>
            </Card>

            <TableContainer component={Paper} className="report-details-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Ảnh</TableCell>
                            <TableCell align="center">Tên sản phẩm</TableCell>
                            <TableCell align="center">Số lượng nhập</TableCell>
                            <TableCell align="center">Giá nhập</TableCell>
                            <TableCell align="center">Thành tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportDetails.map((detail, index) => (
                            <TableRow key={detail.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">
                                         <Link to={`/product/${detail.productId}`}>
                                           <img src={detail.image} alt={detail.productName} className="product-image" />
                                         </Link>                                 
                             </TableCell>
                                <TableCell align="center">{detail.productName}</TableCell>
                                <TableCell align="center">{detail.quantity}</TableCell>
                                <TableCell align="center">{detail.price.toLocaleString('vi-VN')} VND</TableCell>
                                <TableCell align="center">
                                    {(detail.price * detail.quantity).toLocaleString('vi-VN')} VND
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="total-price">
                    <strong>Tổng tiền:</strong> {reportDetails.reduce((total, detail) => total + (detail.price * detail.quantity), 0).toLocaleString('vi-VN')} VND
                </div>
            </TableContainer>
        </div>
    );
};

export default ImportReportDetail;
