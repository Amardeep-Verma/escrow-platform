import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart2,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
} from "lucide-react";
import { logout } from "../utils/auth";

const mainMenu = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Escrows", path: "/admin/escrows", icon: DollarSign },
  { name: "Reports", path: "/admin/reports", icon: BarChart2 },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
      <Link
        to={item.path}
        onClick={onClick}
        className={`sidebar-item ${active ? "active" : ""}`}
      >
        <Icon size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
        <span>{item.name}</span>
        {active && (
          <ChevronRight
            size={12}
            style={{ marginLeft: "auto", opacity: 0.5 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

function Sidebar({ location, onClose }) {
  return (
    <aside
      style={{
        width: "240px",
        flexShrink: 0,
        background: "rgba(10,22,40,0.95)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "20px 18px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(99,102,241,0.4)",
              flexShrink: 0,
            }}
          >
            <Shield size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
              }}
            >
              Escrow<span className="gradient-text">X</span>
            </p>
            <p
              style={{
                fontSize: "10px",
                color: "#475569",
                fontWeight: "500",
                letterSpacing: "0.04em",
              }}
            >
              ADMIN PANEL
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: "14px 10px", flex: 1, overflowY: "auto" }}>
        <p className="label-text" style={{ padding: "0 8px 10px" }}>
          Main
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {mainMenu.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              active={location.pathname === item.path}
              onClick={onClose}
            />
          ))}
        </div>
      </div>

      {/* Logout */}
      <div
        style={{
          padding: "12px 10px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={logout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 12px",
            borderRadius: "10px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
            fontSize: "13.5px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.18s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
          }}
        >
          <LogOut size={14} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#020617",
        color: "#f1f5f9",
        position: "relative",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-80px",
          width: "500px",
          height: "500px",
          background: "rgba(99,102,241,0.12)",
          borderRadius: "50%",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-60px",
          width: "450px",
          height: "450px",
          background: "rgba(59,130,246,0.08)",
          borderRadius: "50%",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      {/* Desktop sidebar */}
      <div
        className="hidden lg:flex"
        style={{ flexShrink: 0, zIndex: 10, height: "100%" }}
      >
        <Sidebar location={location} onClose={null} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 40,
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                zIndex: 50,
                display: "flex",
              }}
            >
              <Sidebar
                location={location}
                onClose={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Header */}
        <header
          style={{
            margin: "16px 20px 0",
            padding: "14px 20px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.022))",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "6px",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Menu size={16} />
          </button>

          <div style={{ flex: 1 }}>
            <h1 className="heading-xl" style={{ fontSize: "20px" }}>
              Welcome back, <span className="gradient-text">Admin</span> 👋
            </h1>
            <p
              className="body-text"
              style={{ fontSize: "13px", marginTop: "1px" }}
            >
              Monitor escrow analytics &amp; platform activity
            </p>
          </div>

          {/* Admin badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 10px",
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "8px",
            }}
          >
            <Shield size={12} style={{ color: "#818cf8" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#a5b4fc",
                letterSpacing: "0.04em",
              }}
            >
              ADMIN
            </span>
          </div>
        </header>

        <motion.main
          style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
