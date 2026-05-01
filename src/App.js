import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ClubAdminDashboard from "./pages/admin/ClubAdminDashboard";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ClubAdminDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;