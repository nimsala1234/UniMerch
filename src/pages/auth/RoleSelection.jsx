import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const roles = [
  {
    key: "club-admin",
    label: "Club Admin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    route: "/admin/dashboard",   // ✅ updated
  },
  {
    key: "student",
    label: "Students & Staff",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
      </svg>
    ),
    route: "/dashboard",         // ✅ already correct
  },
  {
    key: "uni-admin",
    label: "University Admin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 8v4l3 3" />
      </svg>
    ),
    route: "/uni-admin/dashboard", // ✅ updated
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#5A1414]">

      <div className="p-6">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover scale-110"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-10">

        <h2 className="text-5xl text-white mb-16 font-serif">
          Role Selection
        </h2>

        <div className="flex gap-16">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => navigate(role.route)}
              className="flex flex-col items-center gap-5 group"
            >
              <div className="w-44 h-44 rounded-2xl border-2 border-white/40 flex items-center justify-center text-white
                transition-all duration-300 group-hover:border-orange-400 group-hover:bg-white/10 group-hover:scale-110">
                {role.icon}
              </div>
              <span className="text-white font-semibold text-lg">
                {role.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}