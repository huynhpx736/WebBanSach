import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getImportReportDetailByProductId } from '../../../api';
import './ImportReportDetail.css';
import { Card, CardContent, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const HistoryImportProductID = () => {
    const { productId} = useParams(); 
    const [reportDetails, setReportDetails] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const detailsData = await getImportReportDetailByProductId(productId);

                setReportDetails(detailsData);
                setTotalQuantity(detailsData.reduce((total, detail) => total + detail.quantity, 0));
                setTotalPrice(detailsData.reduce((total, detail) => total + detail.price * detail.quantity, 0));
            } catch (error) {
                console.error('Error fetching import report details:', error);
            }
        };

        fetchReportData();
    }, [productId]);

    if (!reportDetails) {
        return <div>Không có sản phẩm này</div>;
    }

    return (
        <div className="import-report-detail">
            <Card className="report-info">
                <CardContent>
                    <Typography variant="h4" className="report-title">
                        {/* Chi tiết phiếu nhập #{importReport.id} */}
                        CHI TIẾT NHẬP HÀNG CỦA SẢN PHẨM
                    </Typography>
                    <Divider className="divider" />
                    {/* <Typography variant="body1" className="report-detail">
                        <strong>Người tạo:</strong> {importReport.user.fullname} ({importReport.user.username})
                    </Typography>
                    <Typography variant="body1" className="report-detail">
                        <strong>Email:</strong> {importReport.user.email}
                    </Typography> */}
                    {/* <Typography variant="body1" className="report-detail">
                        <strong>Mã phiếu:</strong> {importReport.id} 
                    </Typography>
                    <Typography variant="body1" className="report-detail">
                        <strong>Ngày tạo:</strong> {new Date(importReport.createdAt).toLocaleString()}
                    </Typography> */}
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
                            <TableCell align="center">Thời gian</TableCell>
                            <TableCell align="center">Tổng tiền</TableCell>
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
                                <TableCell align="center">{new Date(detail.createdAt).toLocaleString()}</TableCell>
                                <TableCell align="center">{(detail.price * detail.quantity).toLocaleString('vi-VN')} VND</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                    {/* Hiện tổng số lượng và tổng tiền nhập */}
                    <div>
                        <br />
                        <p className="total-quantity"><strong>Tổng số lượng nhập:</strong> {totalQuantity}</p>
                        <p className="total-price"><strong> Tổng tiền: </strong>{totalPrice.toLocaleString('vi-VN')} VND</p>
                    </div>


            </TableContainer>
        </div>
    );
};

export default HistoryImportProductID;
