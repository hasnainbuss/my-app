import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import "./Portal.scss";
const Portal: React.FC = () => {
  return (
    <div className="portal">
      <Routes>
        <Route path="users/*" element={<Users />} />
      </Routes>
    </div>
  );
};

export default Portal;
