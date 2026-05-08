import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import RoleSelection from "./pages/auth/RoleSelection";
import Dashboard from "./pages/student/Dashboard";
import ClubDetail from "./pages/student/ClubDetail";
import Cart from "./pages/student/Cart";
import { CartProvider } from "./context/CartContext";
import ClubAdminDashboard from "./pages/admin/ClubAdminDashboard";
import UniAdminDashboard from "./pages/admin/UniAdminDashboard";
import OrderConfirmation from "./pages/student/OrderConfirmation";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/club/:clubId" element={<ClubDetail />} />
          <Route path="/cart" element={<Cart />} />
        <Route path="/admin/dashboard" element={<ClubAdminDashboard />} />
        <Route path="/uni-admin/dashboard" element={<UniAdminDashboard />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;