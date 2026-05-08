import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/role-selection");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#3D0C0C" }}>

      {/* Left Panel - Logo */}
      <div className="w-1/2 flex flex-col items-center justify-center border-r border-white/10 gap-8">
        <div className="bg-white rounded-full w-64 h-64 flex items-center justify-center shadow-2xl overflow-hidden">
          <img
            src={logo}
            alt="Unimerch Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1
          className="text-5xl font-bold tracking-widest text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          UNIMERCH
        </h1>
      </div>

      {/* Right Panel - Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96">
          <h2
            className="text-4xl mb-10 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Login
          </h2>

          <div className="mb-6">
            <label className="block text-white mb-2 text-sm">email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-8">
            <label className="block text-white mb-2 text-sm">password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={handleLogin}
            className="px-8 py-3 rounded text-white font-semibold text-sm transition hover:opacity-90"
            style={{ backgroundColor: "#C0591A" }}
          >
            Login
          </button>

          <p className="mt-8 text-white/80 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer font-semibold text-white hover:text-orange-300"
            >
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}