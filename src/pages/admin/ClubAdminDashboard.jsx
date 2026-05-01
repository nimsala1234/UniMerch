import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, BarChart2, Package, CheckCircle, X } from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const initialProducts = [
  {
    id: "eng-tshirt",
    name: "Engineering T-Shirt",
    price: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  },
  {
    id: "eng-hoodie",
    name: "Engineering Hoodie",
    price: 45,
    sizes: ["S", "M", "L", "XL"],
    image: "https://images-na.ssl-images-amazon.com/images/I/81ATom2emQL.jpg",
  },
];

const initialOrders = [
  {
    id: "ORD001",
    email: "student@university.edu",
    date: "2026-04-28",
    items: [
      { name: "Engineering T-Shirt", size: "L", qty: 2, price: 25 },
      { name: "Engineering Wristband", size: "One Size", qty: 1, price: 5 },
    ],
    pickup: "2026-05-02 at Engineering Building, Room 101",
    status: "pending",
    total: 55,
  },
];

const initialSettings = {
  clubName: "Engineering Society",
  emoji: "🔧",
  bannerUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=300&fit=crop",
  pickupLocation: "Engineering Building, Room 101",
  pickupDay: "Friday",
  salesEmail: "secretary@engineering.edu",
};

// ─── Toast Component ──────────────────────────────────────────────────────────
function Toast({ message, type = "success" }) {
  if (!message) return null;
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium border
        ${type === "success"
          ? "bg-white border-green-200 text-green-700"
          : "bg-white border-red-200 text-red-600"
        }`}
    >
      {type === "success" ? (
        <span className="text-green-500 text-base">✓</span>
      ) : (
        <span className="text-red-500 text-base">●</span>
      )}
      {message}
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────
function AddProductModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("25.00");
  const [imageUrl, setImageUrl] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [sizes, setSizes] = useState([]);

  const addSize = () => {
    const trimmed = sizeInput.trim();
    if (trimmed && !sizes.includes(trimmed)) {
      setSizes((prev) => [...prev, trimmed]);
      setSizeInput("");
    }
  };

  const removeSize = (s) => setSizes((prev) => prev.filter((x) => x !== s));

  const handleSubmit = () => {
    if (!name || !price || !imageUrl || sizes.length === 0) {
      onAdd(null); // trigger error toast
      return;
    }
    onAdd({
      id: `product-${Date.now()}`,
      name,
      price: parseFloat(price),
      image: imageUrl,
      sizes,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-7 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
            Add New Product
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Club T-Shirt"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Product Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
          {imageUrl && (
            <div className="mt-2 h-20 rounded-lg overflow-hidden border border-gray-100">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }} />
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Available Sizes</label>
          <div className="flex gap-2">
            <input
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSize()}
              placeholder="Enter size (e.g., S, M, L)"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              onClick={addSize}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: "#4B5563" }}
            >
              Add
            </button>
          </div>
          {sizes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {sizes.map((s) => (
                <span key={s}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600">
                  {s}
                  <button onClick={() => removeSize(s)} className="ml-1 text-gray-400 hover:text-red-500">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
            style={{ backgroundColor: "#3D0C0C" }}
          >
            Add Product
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ClubAdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [settings, setSettings] = useState(initialSettings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const markCompleted = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "completed" } : o))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (product) => {
    if (!product) {
      showToast("Please fill all fields and add at least one size", "error");
      return;
    }
    setProducts((prev) => [...prev, product]);
    setShowAddModal(false);
    showToast("Product added successfully!");
  };

  const handleSaveSettings = () => {
    showToast("Settings saved successfully!");
  };

  // ── Stat Cards ──────────────────────────────────────────────────────────────
  const StatCards = () => (
    <div className="grid grid-cols-3 gap-5 mb-6">
      {/* Revenue */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>${totalRevenue}</p>
        </div>
        <BarChart2 size={32} className="text-green-500" />
      </div>
      {/* Pending */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Pending Orders</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>{pendingCount}</p>
        </div>
        <Package size={32} className="text-orange-400" />
      </div>
      {/* Completed */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>{completedCount}</p>
        </div>
        <CheckCircle size={32} className="text-green-500" />
      </div>
    </div>
  );

  // ── Orders Tab ──────────────────────────────────────────────────────────────
  const OrdersTab = () => (
    <div>
      <h3 className="text-lg font-semibold mb-5" style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
        Manage Orders
      </h3>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-sm" style={{ color: "#3D0C0C" }}>
                  Order {order.id}
                </h4>
                <p className="text-xs text-gray-400">{order.email}</p>
                <p className="text-xs text-gray-400">Order Date: {order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-base" style={{ color: "#3D0C0C" }}>${order.total}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                  ${order.status === "pending"
                    ? "text-orange-500"
                    : "text-green-600 bg-green-50 border border-green-200"
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-3">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {item.qty}x {item.name} ({item.size}) - ${item.price * item.qty}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Pickup: {order.pickup}</p>
              {order.status === "pending" && (
                <button
                  onClick={() => markCompleted(order.id)}
                  className="px-5 py-2 rounded-lg text-white text-sm font-semibold bg-green-500 hover:bg-green-600 transition"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Products Tab ────────────────────────────────────────────────────────────
  const ProductsTab = () => (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold" style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
          Manage Products
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
          style={{ backgroundColor: "#3D0C0C" }}
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <img src={p.image} alt={p.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold text-sm mb-1" style={{ color: "#3D0C0C" }}>{p.name}</h4>
              <p className="font-bold text-base mb-3" style={{ color: "#3D0C0C" }}>${p.price}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {p.sizes.map((s) => (
                  <span key={s}
                    className="text-xs px-2 py-0.5 border border-gray-300 rounded text-gray-500">
                    {s}
                  </span>
                ))}
              </div>
              <button
                onClick={() => deleteProduct(p.id)}
                className="w-full py-2 rounded-lg text-white text-sm font-semibold bg-red-500 hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Settings Tab ────────────────────────────────────────────────────────────
  const SettingsTab = () => (
    <div className="max-w-2xl">
      <h3 className="text-lg font-semibold mb-6" style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
        Club Settings
      </h3>

      <div className="flex flex-col gap-5">
        {/* Club Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Club Name</label>
          <input
            value={settings.clubName}
            onChange={(e) => setSettings((s) => ({ ...s, clubName: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        {/* Emoji */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Club Logo (Emoji)</label>
          <input
            value={settings.emoji}
            onChange={(e) => setSettings((s) => ({ ...s, emoji: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        {/* Banner URL */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Club Banner Image URL</label>
          <input
            value={settings.bannerUrl}
            onChange={(e) => setSettings((s) => ({ ...s, bannerUrl: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
          {settings.bannerUrl && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-1">Banner Preview:</p>
              <img src={settings.bannerUrl} alt="Banner"
                className="w-full h-28 object-cover rounded-xl border border-gray-100" />
            </div>
          )}
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Weekly Pickup Location</label>
          <input
            value={settings.pickupLocation}
            onChange={(e) => setSettings((s) => ({ ...s, pickupLocation: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        {/* Pickup Day */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Pickup Day</label>
          <select
            value={settings.pickupDay}
            onChange={(e) => setSettings((s) => ({ ...s, pickupDay: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          >
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Sales Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Sales Report Email (Secretary)</label>
          <input
            type="email"
            value={settings.salesEmail}
            onChange={(e) => setSettings((s) => ({ ...s, salesEmail: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <button
          onClick={handleSaveSettings}
          className="w-36 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
          style={{ backgroundColor: "#3D0C0C" }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF5E6" }}>
      {/* Toast */}
      {toast && <Toast message={toast.msg} type={toast.type} />}

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}

      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold" style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
          Club Admin Dashboard
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-800 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Stat Cards */}
        <StatCards />

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-100">
            {["orders", "products", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium capitalize transition
                  ${activeTab === tab
                    ? "border-b-2 border-amber-700 text-amber-700"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "products" && <ProductsTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}