import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { DashboardLayout } from "./layouts";
import LineChartPage from "./pages/LineChartsPage";
import PieChartPage from "./pages/PieChartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/line" element={<LineChartPage />} />
          <Route path="/pie" element={<PieChartPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
