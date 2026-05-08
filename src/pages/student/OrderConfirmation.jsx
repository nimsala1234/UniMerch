import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function generateOrderId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `ORD${num}`;
}

function getNextPickupDate(pickupDay = "Friday") {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const target = days.indexOf(pickupDay);
  const today = new Date();
  const current = today.getDay();
  let diff = target - current;
  if (diff <= 0) diff += 7;
  const pickup = new Date(today);
  pickup.setDate(today.getDate() + diff);
  return pickup.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

// ── Simple QR-like pattern using canvas ───────────────────────────────────────
function QRCode({ value }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = 160;
    const cells = 21;
    const cell = size / cells;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#1a1a1a";

    // Deterministic pattern from value string
    const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = (i) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };

    // Draw cells
    for (let row = 0; row < cells; row++) {
      for (let col = 0; col < cells; col++) {
        const i = row * cells + col;
        // Finder patterns (corners)
        const inFinder =
          (row < 8 && col < 8) ||
          (row < 8 && col >= cells - 8) ||
          (row >= cells - 8 && col < 8);

        if (inFinder) {
          // Draw finder squares
          const isOuterBorder =
            row === 0 || row === 6 || row === 7 ||
            col === 0 || col === 6 || col === 7 ||
            row === cells - 1 || row === cells - 8 ||
            col === cells - 1 || col === cells - 8;
          const isInnerFill =
            (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
            (row >= 2 && row <= 4 && col >= cells - 6 && col <= cells - 4) ||
            (row >= cells - 6 && row <= cells - 4 && col >= 2 && col <= 4);

          if (isOuterBorder || isInnerFill) {
            ctx.fillRect(col * cell, row * cell, cell, cell);
          }
        } else {
          if (rand(i) > 0.5) {
            ctx.fillRect(col * cell, row * cell, cell - 0.5, cell - 0.5);
          }
        }
      }
    }
  }, [value]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={160}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
 const { total } = useCart();

  // Accept state passed from Checkout, or fall back to cart context
  const orderId = location.state?.orderId || generateOrderId();
  const pickupDate = location.state?.pickupDate || getNextPickupDate("Friday");
  const pickupLocation = location.state?.pickupLocation || "Student Union Building, Main Desk";
  const orderTotal = location.state?.total ?? total;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FBF5E6" }}
    >
      <div className="bg-white rounded-3xl shadow-md w-full max-w-sm px-8 py-10 flex flex-col items-center text-center">

        {/* Success Icon */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#DCFCE7" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#22C55E"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-semibold mb-1"
          style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
        >
          Order Confirmed!
        </h2>
        <p className="text-sm text-gray-400 mb-6">Order ID: {orderId}</p>

        {/* QR + Details Card */}
        <div
          className="w-full rounded-2xl p-5 flex flex-col items-center gap-4 mb-4"
          style={{ backgroundColor: "#F9F5EE" }}
        >
          {/* QR Code */}
          <div className="rounded-xl overflow-hidden border border-gray-100 p-1 bg-white">
            <QRCode value={orderId} />
          </div>

          {/* Order Details */}
          <div className="w-full text-left text-sm flex flex-col gap-2 mt-1">
            <p style={{ color: "#1a1a1a" }}>
              <span className="font-semibold">Pickup Date:</span>{" "}
              {pickupDate}
            </p>
            <p style={{ color: "#1a1a1a" }}>
              <span className="font-semibold">Pickup Location:</span>{" "}
              {pickupLocation}
            </p>
            <p style={{ color: "#1a1a1a" }}>
              <span className="font-semibold">Total Amount:</span>{" "}
              ${orderTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-400 mb-6">
          Please show this QR code when picking up your order.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
          style={{ backgroundColor: "#3D0C0C" }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}