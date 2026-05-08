import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, ShoppingBag, BarChart2, X, CheckCircle, Trash2 } from "lucide-react";
import logo from "../../assets/logo.jpeg";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const initialClubs = [
  {
    id: "engineering",
    name: "Engineering Society",
    emoji: "🔧",
    admin: "admin.eng@university.edu",
    products: 3,
    revenue: 55,
    status: "active",
  },
  {
    id: "basketball",
    name: "Basketball Club",
    emoji: "🏀",
    admin: "admin.bball@university.edu",
    products: 2,
    revenue: 120,
    status: "active",
  },
  {
    id: "drama",
    name: "Drama Society",
    emoji: "🎭",
    admin: "admin.drama@university.edu",
    products: 4,
    revenue: 80,
    status: "active",
  },
  {
    id: "photography",
    name: "Photography Club",
    emoji: "📷",
    admin: "admin.photo@university.edu",
    products: 1,
    revenue: 30,
    status: "active",
  },
  {
    id: "dance",
    name: "Dance Crew",
    emoji: "💃",
    admin: "admin.dance@university.edu",
    products: 2,
    revenue: 45,
    status: "active",
  },
  {
    id: "chess",
    name: "Chess Club",
    emoji: "♟️",
    admin: "admin.chess@university.edu",
    products: 1,
    revenue: 20,
    status: "active",
  },
];

const initialOrders = [
  {
    id: "ORD001",
    club: "Engineering Society",
    email: "student@university.edu",
    date: "2026-04-28",
    total: 55,
    status: "completed",
  },
  {
    id: "ORD002",
    club: "Basketball Club",
    email: "jane@university.edu",
    date: "2026-04-29",
    total: 35,
    status: "pending",
  },
  {
    id: "ORD003",
    club: "Drama Society",
    email: "mark@university.edu",
    date: "2026-04-30",
    total: 20,
    status: "pending",
  },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type = "success" }) {
  if (!message) return null;
  return (
    <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium border
      ${type === "success"
        ? "bg-white border-green-200 text-green-700"
        : "bg-white border-red-200 text-red-600"}`}>
      {type === "success"
        ? <span className="text-green-500 text-base">✓</span>
        : <span className="text-red-500 text-base">●</span>}
      {message}
    </div>
  );
}

// ─── Add Club Modal ───────────────────────────────────────────────────────────
function AddClubModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [admin, setAdmin] = useState("");

  const handleSubmit = () => {
    if (!name || !emoji || !admin) {
      onAdd(null);
      return;
    }
    onAdd({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      emoji,
      admin,
      products: 0,
      revenue: 0,
      status: "active",
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-7 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold"
            style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
            Add New Club
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Club Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Science Club"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Club Emoji</label>
          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="e.g., 🔬"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Admin Email</label>
          <input
            type="email"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            placeholder="admin@university.edu"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
            style={{ backgroundColor: "#3D0C0C" }}>
            Add Club
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-gray-600 font-semibold text-sm border border-gray-200 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UniAdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("clubs");
  const [clubs, setClubs] = useState(initialClubs);
  const [orders] = useState(initialOrders);
  const [showAddClub, setShowAddClub] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const totalRevenue = clubs.reduce((s, c) => s + c.revenue, 0);
  const totalClubs = clubs.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const deleteClub = (id) => {
    setClubs((prev) => prev.filter((c) => c.id !== id));
    showToast("Club removed successfully!");
  };

  const handleAddClub = (club) => {
    if (!club) {
      showToast("Please fill all fields", "error");
      return;
    }
    setClubs((prev) => [...prev, club]);
    setShowAddClub(false);
    showToast("Club added successfully!");
  };

  const toggleClubStatus = (id) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c
      )
    );
  };

  // ── Stat Cards ──────────────────────────────────────────────────────────────
  const StatCards = () => (
    <div className="grid grid-cols-4 gap-5 mb-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>${totalRevenue}</p>
        </div>
        <BarChart2 size={32} className="text-green-500" />
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Total Clubs</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>{totalClubs}</p>
        </div>
        <Users size={32} className="text-blue-400" />
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Total Orders</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>{totalOrders}</p>
        </div>
        <ShoppingBag size={32} className="text-orange-400" />
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Pending Orders</p>
          <p className="text-2xl font-bold" style={{ color: "#3D0C0C" }}>{pendingOrders}</p>
        </div>
        <CheckCircle size={32} className="text-amber-500" />
      </div>
    </div>
  );

  // ── Clubs Tab ───────────────────────────────────────────────────────────────
  const ClubsTab = () => (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold"
          style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
          Manage Clubs
        </h3>
        <button
          onClick={() => setShowAddClub(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: "#3D0C0C" }}>
          + Add Club
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {clubs.map((club) => (
          <div key={club.id}
            className="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-center gap-4">
            {/* Emoji */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: "#FFF8EC" }}>
              {club.emoji}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h4 className="font-semibold text-sm" style={{ color: "#3D0C0C" }}>
                {club.name}
              </h4>
              <p className="text-xs text-gray-400">{club.admin}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-xs text-gray-400">Products</p>
                <p className="font-semibold text-sm" style={{ color: "#3D0C0C" }}>
                  {club.products}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Revenue</p>
                <p className="font-semibold text-sm" style={{ color: "#3D0C0C" }}>
                  ${club.revenue}
                </p>
              </div>
            </div>

            {/* Status Toggle */}
            <button
              onClick={() => toggleClubStatus(club.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition
                ${club.status === "active"
                  ? "text-green-600 border-green-200 bg-green-50"
                  : "text-gray-400 border-gray-200 bg-gray-50"}`}>
              {club.status}
            </button>

            {/* Delete */}
            <button
              onClick={() => deleteClub(club.id)}
              className="text-red-400 hover:text-red-600 transition ml-2">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Orders Tab ──────────────────────────────────────────────────────────────
  const OrdersTab = () => (
    <div>
      <h3 className="text-lg font-semibold mb-5"
        style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
        All Orders
      </h3>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-4 mb-2">
        {["Order ID", "Club", "Student", "Total", "Status"].map((h) => (
          <p key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {h}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {orders.map((order) => (
          <div key={order.id}
            className="bg-white rounded-2xl px-4 py-4 shadow-sm grid grid-cols-5 gap-4 items-center">
            <p className="text-sm font-semibold" style={{ color: "#3D0C0C" }}>
              {order.id}
            </p>
            <p className="text-sm text-gray-600">{order.club}</p>
            <div>
              <p className="text-sm text-gray-600">{order.email}</p>
              <p className="text-xs text-gray-400">{order.date}</p>
            </div>
            <p className="text-sm font-bold" style={{ color: "#3D0C0C" }}>
              ${order.total}
            </p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit
              ${order.status === "completed"
                ? "bg-green-50 text-green-600 border border-green-200"
                : "text-orange-500"}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Reports Tab ─────────────────────────────────────────────────────────────
  const ReportsTab = () => (
    <div>
      <h3 className="text-lg font-semibold mb-5"
        style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
        Revenue by Club
      </h3>
      <div className="flex flex-col gap-3">
        {clubs.map((club) => {
          const pct = totalRevenue > 0 ? (club.revenue / totalRevenue) * 100 : 0;
          return (
            <div key={club.id} className="bg-white rounded-2xl px-6 py-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{club.emoji}</span>
                  <p className="text-sm font-semibold" style={{ color: "#3D0C0C" }}>
                    {club.name}
                  </p>
                </div>
                <p className="text-sm font-bold" style={{ color: "#3D0C0C" }}>
                  ${club.revenue}
                </p>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: "#C0591A",
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{pct.toFixed(1)}% of total revenue</p>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div className="mt-6 bg-white rounded-2xl px-6 py-5 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400 mb-1">University Total Revenue</p>
          <p className="text-3xl font-bold" style={{ color: "#3D0C0C" }}>${totalRevenue}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">Across</p>
          <p className="text-3xl font-bold" style={{ color: "#C0591A" }}>{totalClubs} clubs</p>
        </div>
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF5E6" }}>
      {toast && <Toast message={toast.msg} type={toast.type} />}

      {showAddClub && (
        <AddClubModal
          onClose={() => setShowAddClub(false)}
          onAdd={handleAddClub}
        />
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Unimerch" className="w-10 h-10 rounded-full object-cover" />
          <h1 className="text-xl font-semibold"
            style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}>
            University Admin Dashboard
          </h1>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-800 transition">
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <StatCards />

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            {["clubs", "orders", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium capitalize transition
                  ${activeTab === tab
                    ? "border-b-2 border-amber-700 text-amber-700"
                    : "text-gray-500 hover:text-gray-700"}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "clubs"   && <ClubsTab />}
            {activeTab === "orders"  && <OrdersTab />}
            {activeTab === "reports" && <ReportsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}