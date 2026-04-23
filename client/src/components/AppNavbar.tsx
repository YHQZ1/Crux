import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

export const AppNavbar = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(var(--bg-base-rgb), 0.85)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="w-full px-4 md:px-12 h-16 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-black tracking-tighter cursor-pointer flex items-center"
        >
          CRUX<span style={{ color: "var(--accent)" }}>.</span>
          <span className="ml-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest opacity-40">
            Portal
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={toggleTheme}
            className="text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:opacity-50 transition-opacity"
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>

          <button
            onClick={handleLogout}
            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 border hover:bg-[color:var(--text-base)] hover:text-[color:var(--bg-base)] transition-all cursor-pointer"
            style={{ borderColor: "var(--border-color)" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};
