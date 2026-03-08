import { useEffect, useState } from "react";
import api from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Activity,
} from "lucide-react";
import { safeArray } from "../../utils/safeArray";

export default function Reports() {
  const [stats, setStats] = useState({
    totalEscrows: 0,
    totalVolume: 0,
    activeEscrows: 0,
    completedEscrows: 0,
    dailyVolume: [],
    weeklyVolume: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/admin/reports");
        // Normalize API response to ensure it's always an object with arrays
        const normalizedData = {
          ...res.data,
          dailyVolume: safeArray(res.data.dailyVolume),
          weeklyVolume: safeArray(res.data.weeklyVolume),
        };
        setStats(normalizedData);
      } catch (err) {
        console.error("Failed to fetch reports data:", err);
        setStats({
          totalEscrows: 0,
          totalVolume: 0,
          activeEscrows: 0,
          completedEscrows: 0,
          dailyVolume: [],
          weeklyVolume: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const formatNumber = (num) => new Intl.NumberFormat("en-IN").format(num || 0);

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
            <BarChart3 size={16} style={{ color: "#fff" }} />
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
              Analytics & Reports
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "2px",
                margin: 0,
              }}
            >
              Platform performance metrics and insights
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px",
          }}
        >
          <Activity size={14} style={{ color: "#64748b" }} />
          <span
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              fontWeight: "500",
            }}
          >
            Real-time data
          </span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Total Volume */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 24px rgba(16,185,129,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "60px",
              height: "60px",
              background: "rgba(16,185,129,0.1)",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#34d399",
                }}
              >
                Total Volume
              </span>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#86efac",
                  letterSpacing: "-0.02em",
                  marginTop: "4px",
                }}
              >
                {formatCurrency(stats.totalVolume)}
              </div>
            </div>
            <TrendingUp size={24} style={{ color: "#34d399" }} />
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Across all escrows</span>
          </div>
        </motion.div>

        {/* Total Escrows */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.06))",
            border: "1px solid rgba(59,130,246,0.25)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 24px rgba(59,130,246,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "60px",
              height: "60px",
              background: "rgba(59,130,246,0.1)",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                }}
              >
                Total Escrows
              </span>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#93c5fd",
                  letterSpacing: "-0.02em",
                  marginTop: "4px",
                }}
              >
                {formatNumber(stats.totalEscrows)}
              </div>
            </div>
            <DollarSign size={24} style={{ color: "#60a5fa" }} />
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>All time transactions</span>
          </div>
        </motion.div>

        {/* Active Escrows */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 24px rgba(239,68,68,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "60px",
              height: "60px",
              background: "rgba(239,68,68,0.1)",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#f87171",
                }}
              >
                Active Escrows
              </span>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#fca5a5",
                  letterSpacing: "-0.02em",
                  marginTop: "4px",
                }}
              >
                {formatNumber(stats.activeEscrows)}
              </div>
            </div>
            <Users size={24} style={{ color: "#f87171" }} />
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Currently in progress</span>
          </div>
        </motion.div>

        {/* Completed Escrows */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(168,85,247,0.06))",
            border: "1px solid rgba(168,85,247,0.25)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 24px rgba(168,85,247,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "60px",
              height: "60px",
              background: "rgba(168,85,247,0.1)",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#c084fc",
                }}
              >
                Completed
              </span>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#e9d5ff",
                  letterSpacing: "-0.02em",
                  marginTop: "4px",
                }}
              >
                {formatNumber(stats.completedEscrows)}
              </div>
            </div>
            <TrendingDown size={24} style={{ color: "#c084fc" }} />
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Successfully delivered</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Daily Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Daily Volume
              </h3>
              <p
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  margin: "2px 0 0",
                }}
              >
                Last 7 days
              </p>
            </div>
            <Calendar size={16} style={{ color: "#64748b" }} />
          </div>

          {loading ? (
            <div
              style={{
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
              }}
            >
              Loading chart...
            </div>
          ) : (
            <div style={{ height: "160px", position: "relative" }}>
              {/* Simple bar chart visualization */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  height: "100%",
                  gap: "8px",
                }}
              >
                {safeArray(stats.dailyVolume)
                  .slice(-7)
                  .map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: `${(day.amount / Math.max(...stats.dailyVolume.map((d) => d.amount))) * 100}%`,
                        opacity: 1,
                      }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      style={{
                        flex: 1,
                        background:
                          "linear-gradient(180deg, rgba(99,102,241,0.8), rgba(99,102,241,0.3))",
                        borderRadius: "4px 4px 0 0",
                        margin: "0 2px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-20px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "10px",
                          color: "#64748b",
                          textAlign: "center",
                        }}
                      >
                        {new Date(day.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                        })}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Weekly Volume Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.0 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Weekly Volume
              </h3>
              <p
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  margin: "2px 0 0",
                }}
              >
                Last 4 weeks
              </p>
            </div>
            <BarChart3 size={16} style={{ color: "#64748b" }} />
          </div>

          {loading ? (
            <div
              style={{
                height: "160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
              }}
            >
              Loading chart...
            </div>
          ) : (
            <div style={{ height: "160px", position: "relative" }}>
              {/* Simple line chart visualization */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  top: "20px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                {safeArray(stats.weeklyVolume)
                  .slice(-4)
                  .map((week, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          height: `${(week.amount / Math.max(...stats.weeklyVolume.map((w) => w.amount))) * 100}%`,
                          width: "4px",
                          background:
                            "linear-gradient(180deg, rgba(168,85,247,0.8), rgba(168,85,247,0.3))",
                          borderRadius: "2px",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#64748b",
                          textAlign: "center",
                        }}
                      >
                        W{week.week}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
