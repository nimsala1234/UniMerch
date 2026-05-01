import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../../context/CartContext";

const clubsData = {
  engineering: {
    name: "Engineering Society",
    desc: "Official merchandise for the Engineering Society",
    emoji: "🔧",
    products: [
      { id: "eng-tshirt", name: "Engineering T-Shirt", price: 25, sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
      { id: "eng-hoodie", name: "Engineering Hoodie", price: 45, sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80" },
      { id: "eng-wristband", name: "Engineering Wristband", price: 5, sizes: ["One Size"], image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa1f?w=400&q=80" },
    ],
  },
  basketball: {
    name: "Basketball Club",
    desc: "Basketball Club official gear",
    emoji: "🏀",
    products: [
      { id: "bball-jersey", name: "Basketball Jersey", price: 35, sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80" },
      { id: "bball-shorts", name: "Basketball Shorts", price: 20, sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" },
    ],
  },
};

export default function ClubDetail() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const club = clubsData[clubId] || clubsData["engineering"];
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const [sizes, setSizes] = useState(() =>
    Object.fromEntries(club.products.map((p) => [p.id, p.sizes[0]]))
  );
  const [toast, setToast] = useState(null);

  const handleAdd = (product) => {
    addToCart({ ...product, size: sizes[product.id] });
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF5E6" }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-green-200 text-green-700 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
          <span className="text-green-500">✓</span> {toast}
        </div>
      )}

      {/* Header */}
      <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-800"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h2
          className="text-base font-semibold"
          style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
        >
          {club.name}
        </h2>
        <button
          onClick={() => navigate("/cart")}
          className="relative text-gray-700 hover:text-red-800"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Club Banner */}
      <div
        className="relative h-40 flex items-center px-10 gap-5"
        style={{
          background: "linear-gradient(to right, #3D0C0C88, #3D0C0C22)",
          backgroundImage: "url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=60)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow">
          {club.emoji}
        </div>
        <div>
          <h1
            className="text-2xl text-white font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {club.name}
          </h1>
          <p className="text-white/80 text-sm">{club.desc}</p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        <h3
          className="text-xl font-semibold mb-6"
          style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
        >
          Merchandise
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {club.products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h4
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#3D0C0C" }}
                >
                  {product.name}
                </h4>
                <p className="text-lg font-bold mb-3" style={{ color: "#3D0C0C" }}>
                  ${product.price}
                </p>
                <label className="text-xs text-gray-500 mb-1 block">Select Size:</label>
                <select
                  value={sizes[product.id]}
                  onChange={(e) =>
                    setSizes((prev) => ({ ...prev, [product.id]: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-3 outline-none"
                >
                  {product.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleAdd(product)}
                  className="w-full py-2 rounded text-white text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: "#3D0C0C" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}