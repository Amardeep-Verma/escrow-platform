import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion } from "framer-motion";
import { Users as UsersIcon, Search } from "lucide-react";

const ROLE_CONFIG = {
  ROLE_BUYER:  { label: "Buyer",  bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)",  color: "#60a5fa" },
  ROLE_SELLER: { label: "Seller", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)",  color: "#34d399" },
  ADMIN:       { label: "Admin",  bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)",   color: "#f87171" },
};

function RoleBadge({ role }) {
  const c = ROLE_CONFIG[role] || ROLE_CONFIG["ROLE_BUYER"];
  return (
    <span style={{ padding: "2px 9px", borderRadius: "99px", background: c.bg, border: `1px solid ${c.border}`, fontSize: "11px", fontWeight: "600", color: c.color }}>
      {c.label}
    </span>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UsersIcon size={15} style={{ color: "#818cf8" }} />
          </div>
          <div>
            <h2 className="heading-lg" style={{ fontSize: "16px" }}>Users Management</h2>
            <p style={{ fontSize: "12px", color: "#475569" }}>{users.length} total users</p>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
          <input
            className="saas-input"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "30px", width: "220px", padding: "7px 12px 7px 30px", fontSize: "13px" }}
          />
        </div>
      </div>

      <div className="glass-pro" style={{ padding: "0", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#475569" }}>
            <UsersIcon size={28} style={{ margin: "0 auto 10px", opacity: 0.3 }} />
            <p style={{ fontSize: "14px" }}>No users found</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="saas-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={`https://i.pravatar.cc/32?u=${user.email}`}
                          alt={user.name}
                          style={{ width: "28px", height: "28px", borderRadius: "8px", objectFit: "cover" }}
                        />
                        <span style={{ fontWeight: "500", color: "#f1f5f9", fontSize: "13.5px" }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: "monospace", fontSize: "12.5px" }}>{user.email}</td>
                    <td><RoleBadge role={user.role} /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
