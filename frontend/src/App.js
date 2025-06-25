import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Owners from "./pages/Owners";
import Customers from "./pages/Customers";
import Consignments from "./pages/Consignments";
import Maintenances from "./pages/Maintenances";
import Availabilities from "./pages/Availabilities";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/consignments" element={<Consignments />} />
          <Route path="/maintenances" element={<Maintenances />} />
          <Route path="/availabilities" element={<Availabilities />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
