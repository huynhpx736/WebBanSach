import React from 'react';
import { Outlet } from 'react-router-dom';
import './ShipperLayout.css';
import ShipperPanel from '../ShipperPanel/ShipperPannel';

const ShipperLayout = () => {
  return (
    <div className="shipper-layout">
      <ShipperPanel />
      <div className="shipper-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ShipperLayout;
