import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion } from "framer-motion";
import { DollarSign, Search } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

export default function Escrows() {
  const [escrows, setEscrows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEscrows = async () => {
      try {
        const res = await api.get("/api/admin/escrows");
        setEscrows(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEscrows();
  }, []);

  const filtered = escrows.filter(
    (e) =>
      String(e.id).includes(search) ||
      e.productName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DollarSign size={15} style={{ color: "#818cf8" }} />
          </div>
          <div>
            <h2 className="heading-lg" style={{ fontSize: "16px" }}>Escrow Management</h2>
            <p style={{ fontSize: "12px", color: "#475569" }}>{escrows.length} total escrows</p>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <Search size={13} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
          <input
            className="saas-input"
            placeholder="Search escrows…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "30px", width: "220px", padding: "7px 12px 7px 30px", fontSize: "13px" }}
          />
        </div>
      </div>

      <div className="glass-pro" style={{ padding: "0", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#475569" }}>
            <DollarSign size={28} style={{ margin: "0 auto 10px", opacity: 0.3 }} />
            <p style={{ fontSize: "14px" }}>No escrows found</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="saas-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((escrow, i) => (
                  <motion.tr
                    key={escrow.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", background: "rgba(255,255,255,0.05)", padding: "2px 7px", borderRadius: "5px", color: "#94a3b8" }}>
                        #{escrow.id}
                      </span>
                    </td>
                    <td style={{ color: "#f1f5f9", fontWeight: "500", fontSize: "13.5px" }}>
                      {escrow.productName || "—"}
                    </td>
                    <td style={{ fontWeight: "600", color: "#a5b4fc" }}>₹{escrow.amount}</td>
                    <td><StatusBadge status={escrow.escrowStatus} /></td>
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
