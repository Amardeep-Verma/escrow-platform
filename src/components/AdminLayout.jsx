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
  Settings,
  Bell,
} from "lucide-react";
import { logout } from "../utils/auth";

const mainMenu = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Escrows", path: "/admin/escrows", icon: DollarSign },
  { name: "Fraud Detection", path: "/admin/fraud", icon: Shield },
  { name: "Reports", path: "/admin/reports", icon: BarChart2 },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      style={{ position: "relative" }}
    >
      <Link
        to={item.path}
        onClick={onClick}
        className={`sidebar-item ${active ? "active" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 12px",
          borderRadius: "10px",
          color: active ? "#f1f5f9" : "#94a3b8",
          fontWeight: "600",
          fontSize: "13px",
          textDecoration: "none",
          transition: "all 0.2s ease",
          background: active ? "rgba(99,102,241,0.15)" : "transparent",
          border: active ? "1px solid rgba(99,102,241,0.3)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "#f1f5f9";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#94a3b8";
          }
        }}
      >
        <Icon size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{item.name}</span>
        {active && (
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#6366f1",
              boxShadow: "0 0 8px #6366f1",
            }}
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
        width: "260px",
        flexShrink: 0,
        background:
          "linear-gradient(135deg, rgba(10,22,40,0.98), rgba(8,18,32,0.98))",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        zIndex: 10,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Decorative top accent */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #6366f1, #4f46e5, #a855f7)",
          boxShadow: "0 0 15px rgba(99,102,241,0.4)",
        }}
      />

      {/* Brand */}
      <div
        style={{
          padding: "24px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.5)",
              flexShrink: 0,
            }}
          >
            <Shield size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "800",
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Escrow<span className="gradient-text">X</span>
            </p>
            <p
              style={{
                fontSize: "10px",
                color: "#64748b",
                fontWeight: "600",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                margin: "2px 0 0",
              }}
            >
              Admin Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
        <p
          style={{
            padding: "0 10px 12px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#64748b",
            margin: 0,
          }}
        >
          Navigation
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {mainMenu.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              active={location.pathname === item.path}
              onClick={onClose}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "16px 10px",
          }}
        />

        {/* Secondary actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            <Settings size={16} />
            Settings
          </motion.button>
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          padding: "16px 12px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.1))",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.02em",
            boxShadow: "0 4px 12px rgba(239,68,68,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.15))";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(239,68,68,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.1))";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(239,68,68,0.2)";
          }}
        >
          <LogOut size={16} strokeWidth={2} />
          Sign Out
        </motion.button>
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
        background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
        color: "#f1f5f9",
        position: "relative",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-100px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-80px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
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
                boxShadow: "20px 0 60px rgba(0,0,0,0.5)",
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
            padding: "16px 20px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Mobile hamburger */}
          <motion.button
            className="lg:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(true)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              padding: "8px",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#94a3b8";
            }}
          >
            <Menu size={18} />
          </motion.button>

          <div style={{ flex: 1 }}>
            <h1
              className="heading-xl"
              style={{
                fontSize: "22px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Admin<span className="gradient-text"> Dashboard</span> 👑
            </h1>
            <p
              className="body-text"
              style={{
                fontSize: "13px",
                marginTop: "4px",
                color: "#94a3b8",
              }}
            >
              Monitor platform analytics, manage users, and oversee escrow
              transactions
            </p>
          </div>

          {/* Admin badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))",
              border: "1px solid rgba(99,102,241,0.35)",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(99,102,241,0.2)",
            }}
          >
            <Shield size={14} style={{ color: "#818cf8" }} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#a5b4fc",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Platform Admin
            </span>
          </motion.div>
        </header>

        <motion.main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 20px 28px",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
