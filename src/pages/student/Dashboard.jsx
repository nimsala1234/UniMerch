import { useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/logo.jpeg";

const clubs = [
  { id: "engineering", name: "Engineering Society", desc: "Official merchandise for the Engineering Society", emoji: "🔧" },
  { id: "basketball", name: "Basketball Club", desc: "Basketball Club official gear", emoji: "🏀" },
  { id: "drama", name: "Drama Society", desc: "Drama Society merchandise", emoji: "🎭" },
  { id: "photography", name: "Photography Club", desc: "Photography Club merch", emoji: "📷" },
  { id: "dance", name: "Dance Crew", desc: "Dance Crew official merchandise", emoji: "💃" },
  { id: "chess", name: "Chess Club", desc: "Chess Club gear", emoji: "♟️" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0E8D5" }}>

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">

        {/* LEFT: Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Unimerch" className="w-10 h-10 rounded-full object-cover" />
          <h1
            className="text-xl font-bold tracking-widest"
            style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
          >
            UNIMERCH
          </h1>
        </div>

        {/* RIGHT: Icons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate("/cart")}
            className="relative text-gray-700 hover:text-red-800 transition"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-red-800 transition"
          >
            <LogOut size={22} />
          </button>
        </div>
      </nav>

      {/* Club Grid */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        <h2
          className="text-2xl font-semibold mb-8"
          style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
        >
          University Clubs
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => navigate(`/club/${club.id}`)}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left group border border-gray-200"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {/* Icon Area */}
              <div
                className="h-44 flex items-center justify-center text-6xl"
                style={{ backgroundColor: "#FEF3C7" }}
              >
                {club.emoji}
              </div>

              {/* Info Area */}
              <div className="p-5" style={{ backgroundColor: "#FFFFFF" }}>
                <h3
                  className="font-semibold text-base mb-1"
                  style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
                >
                  {club.name}
                </h3>
                <p className="text-gray-500 text-sm">{club.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}