import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import RoleSelection from "./pages/auth/RoleSelection";


import { CartProvider } from "./context/CartContext";



function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          
        
        
        
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
