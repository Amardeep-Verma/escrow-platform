import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users as UsersIcon,
  Search,
  User,
  Mail,
  Shield,
  Calendar,
} from "lucide-react";
import { safeArray, safeFilter } from "../../utils/safeArray";

const ROLE_CONFIG = {
  ROLE_BUYER: {
    label: "Buyer",
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.3)",
    color: "#60a5fa",
    gradient:
      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))",
  },
  ROLE_SELLER: {
    label: "Seller",
    bg: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.3)",
    color: "#34d399",
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
  },
  ADMIN: {
    label: "Admin",
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.3)",
    color: "#f87171",
    gradient:
      "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))",
  },
};

function RoleBadge({ role }) {
  // Normalize role to handle different formats
  const normalizedRole = role?.toUpperCase() || "ROLE_BUYER";
  const c = ROLE_CONFIG[normalizedRole] || ROLE_CONFIG["ROLE_BUYER"];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        padding: "4px 10px",
        borderRadius: "12px",
        background: c.gradient,
        border: `1px solid ${c.border}`,
        fontSize: "11px",
        fontWeight: "700",
        color: c.color,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        boxShadow: `0 2px 8px ${c.border}`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {c.label}
    </motion.span>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/users");
        // Normalize API response to ensure it's always an array
        const normalizedUsers = safeArray(res.data);
        setUsers(normalizedUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]); // Ensure state is always an array even on error
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = safeFilter(
    users,
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{ minHeight: "100%" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              border: "1px solid rgba(99,102,241,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}
          >
            <UsersIcon size={16} style={{ color: "#fff" }} />
          </motion.div>
          <div>
            <h2
              className="heading-lg"
              style={{
                fontSize: "18px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                color: "#f1f5f9",
                margin: 0,
              }}
            >
              Users Management
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "2px",
                margin: 0,
              }}
            >
              {users.length} total users registered
            </p>
          </div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ position: "relative", minWidth: "240px" }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              pointerEvents: "none",
            }}
          />
          <input
            className="saas-input"
            placeholder="Search users by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: "36px",
              paddingRight: "12px",
              height: "40px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#f1f5f9",
              fontSize: "13px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          />
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.06))",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(59,130,246,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#60a5fa",
              }}
            >
              Buyers
            </span>
            <User size={16} style={{ color: "#60a5fa" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#93c5fd",
              letterSpacing: "-0.02em",
            }}
          >
            {safeFilter(users, (u) => u.role === "ROLE_BUYER").length}
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(16,185,129,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#34d399",
              }}
            >
              Sellers
            </span>
            <User size={16} style={{ color: "#34d399" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#86efac",
              letterSpacing: "-0.02em",
            }}
          >
            {
              safeFilter(
                users,
                (u) => u.role === "ROLE_SELLER" || u.role === "seller",
              ).length
            }
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(239,68,68,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#f87171",
              }}
            >
              Admins
            </span>
            <Shield size={16} style={{ color: "#f87171" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#fca5a5",
              letterSpacing: "-0.02em",
            }}
          >
            {safeFilter(users, (u) => u.role === "ADMIN").length}
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          padding: "0",
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {loading ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                width: "32px",
                height: "32px",
                margin: "0 auto 12px",
                border: "3px solid rgba(99,102,241,0.3)",
                borderTop: "3px solid #6366f1",
                borderRadius: "50%",
              }}
            />
            <p style={{ fontSize: "14px", margin: 0 }}>Loading users…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <UsersIcon
              size={32}
              style={{ margin: "0 auto 12px", opacity: 0.4 }}
            />
            <p style={{ fontSize: "14px", margin: 0 }}>No users found</p>
            <p
              style={{
                fontSize: "12px",
                color: "#475569",
                marginTop: "4px",
              }}
            >
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              className="saas-table"
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    User
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Role
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ delay: i * 0.04 }}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              overflow: "hidden",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            }}
                          >
                            <img
                              src={`https://i.pravatar.cc/48?u=${user.email}`}
                              alt={user.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </motion.div>
                          <div>
                            <span
                              style={{
                                fontWeight: "600",
                                color: "#f1f5f9",
                                fontSize: "14px",
                                display: "block",
                              }}
                            >
                              {user.name}
                            </span>
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#64748b",
                                display: "block",
                                marginTop: "2px",
                              }}
                            >
                              ID: {user.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Mail size={12} style={{ color: "#64748b" }} />
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: "13px",
                              color: "#94a3b8",
                            }}
                          >
                            {user.email}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <RoleBadge role={user.role} />
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <Calendar size={12} style={{ color: "#64748b" }} />
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#94a3b8",
                            }}
                          >
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
