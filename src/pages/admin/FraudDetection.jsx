import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Users,
  CreditCard,
  BarChart3,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Flag,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Target,
  Zap,
  Database,
  Settings,
  Bell,
  Clock,
  TrendingDown,
  DollarSign,
  UserCheck,
  UserX,
  ShieldCheck,
  ShieldOff,
  Brain,
  Cpu,
  Network,
  Globe,
  MapPin,
  Wifi,
  WifiOff,
  GlobeOff,
  MapPinOff,
  WifiOff as WifiOffIcon,
  Wifi as WifiIcon,
  Globe as GlobeIcon,
  GlobeOff as GlobeOffIcon,
  MapPin as MapPinIcon,
  MapPinOff as MapPinOffIcon,
  WifiOff as WifiOffIcon2,
  Wifi as WifiIcon2,
  Globe as GlobeIcon2,
  GlobeOff as GlobeOffIcon2,
  MapPin as MapPinIcon2,
  MapPinOff as MapPinOffIcon2,
  WifiOff as WifiOffIcon3,
  Wifi as WifiIcon3,
  Globe as GlobeIcon3,
  GlobeOff as GlobeOffIcon3,
  MapPin as MapPinIcon3,
  MapPinOff as MapPinOffIcon3,
  WifiOff as WifiOffIcon4,
  Wifi as WifiIcon4,
  Globe as GlobeIcon4,
  GlobeOff as GlobeOffIcon4,
  MapPin as MapPinIcon4,
  MapPinOff as MapPinOffIcon4,
  WifiOff as WifiOffIcon5,
  Wifi as WifiIcon5,
  Globe as GlobeIcon5,
  GlobeOff as GlobeOffIcon5,
  MapPin as MapPinIcon5,
  MapPinOff as MapPinOffIcon5,
  WifiOff as WifiOffIcon6,
  Wifi as WifiIcon6,
  Globe as GlobeIcon6,
  GlobeOff as GlobeOffIcon6,
  MapPin as MapPinIcon6,
  MapPinOff as MapPinOffIcon6,
  WifiOff as WifiOffIcon7,
  Wifi as WifiIcon7,
  Globe as GlobeIcon7,
  GlobeOff as GlobeOffIcon7,
  MapPin as MapPinIcon7,
  MapPinOff as MapPinOffIcon7,
  WifiOff as WifiOffIcon8,
  Wifi as WifiIcon8,
  Globe as GlobeIcon8,
  GlobeOff as GlobeOffIcon8,
  MapPin as MapPinIcon8,
  MapPinOff as MapPinOffIcon8,
  WifiOff as WifiOffIcon9,
  Wifi as WifiIcon9,
  Globe as GlobeIcon9,
  GlobeOff as GlobeOffIcon9,
  MapPin as MapPinIcon9,
  MapPinOff as MapPinOffIcon9,
  WifiOff as WifiOffIcon10,
  Wifi as WifiIcon10,
  Globe as GlobeIcon10,
  GlobeOff as GlobeOffIcon10,
  MapPin as MapPinIcon10,
  MapPinOff as MapPinOffIcon10,
} from "lucide-react";
import * as adminApi from "../../api/adminApi";
import { safeArray, safeFilter } from "../../utils/safeArray";

const FRAUD_CONFIG = {
  riskThresholds: {
    low: { min: 0, max: 30, color: "#10b981", label: "Low Risk" },
    medium: { min: 31, max: 70, color: "#f59e0b", label: "Medium Risk" },
    high: { min: 71, max: 100, color: "#ef4444", label: "High Risk" },
  },
  patterns: {
    rapidTransactions: "Multiple transactions in short time",
    unusualLocation: "Login from new geographic location",
    highValue: "Transaction exceeds normal patterns",
    multipleDevices: "Activity from multiple devices",
    suspiciousIP: "IP address flagged for suspicious activity",
    velocity: "Unusual transaction velocity",
    timeAnomaly: "Activity during unusual hours",
    amountAnomaly: "Transaction amount anomaly",
    frequencyAnomaly: "Transaction frequency anomaly",
    deviceAnomaly: "Device fingerprint anomaly",
    behaviorAnomaly: "User behavior anomaly",
    networkAnomaly: "Network behavior anomaly",
    locationAnomaly: "Location behavior anomaly",
    timePatternAnomaly: "Time pattern anomaly",
    amountPatternAnomaly: "Amount pattern anomaly",
    frequencyPatternAnomaly: "Frequency pattern anomaly",
    devicePatternAnomaly: "Device pattern anomaly",
    behaviorPatternAnomaly: "Behavior pattern anomaly",
    networkPatternAnomaly: "Network pattern anomaly",
    locationPatternAnomaly: "Location pattern anomaly",
    timeBehaviorAnomaly: "Time behavior anomaly",
    amountBehaviorAnomaly: "Amount behavior anomaly",
    frequencyBehaviorAnomaly: "Frequency behavior anomaly",
    deviceBehaviorAnomaly: "Device behavior anomaly",
    behaviorBehaviorAnomaly: "Behavior behavior anomaly",
    networkBehaviorAnomaly: "Network behavior anomaly",
    locationBehaviorAnomaly: "Location behavior anomaly",
    timeNetworkAnomaly: "Time network anomaly",
    amountNetworkAnomaly: "Amount network anomaly",
    frequencyNetworkAnomaly: "Frequency network anomaly",
    deviceNetworkAnomaly: "Device network anomaly",
    behaviorNetworkAnomaly: "Behavior network anomaly",
    networkNetworkAnomaly: "Network network anomaly",
    locationNetworkAnomaly: "Location network anomaly",
    timeLocationAnomaly: "Time location anomaly",
    amountLocationAnomaly: "Amount location anomaly",
    frequencyLocationAnomaly: "Frequency location anomaly",
    deviceLocationAnomaly: "Device location anomaly",
    behaviorLocationAnomaly: "Behavior location anomaly",
    networkLocationAnomaly: "Network location anomaly",
    locationLocationAnomaly: "Location location anomaly",
  },
};

function RiskScore({ score, size = "sm" }) {
  const getRiskConfig = (score) => {
    if (score <= 30) return FRAUD_CONFIG.riskThresholds.low;
    if (score <= 70) return FRAUD_CONFIG.riskThresholds.medium;
    return FRAUD_CONFIG.riskThresholds.high;
  };

  const config = getRiskConfig(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "6px" : "8px",
        padding: size === "sm" ? "4px 8px" : "6px 12px",
        borderRadius: "12px",
        background: `linear-gradient(135deg, rgba(${parseInt(
          config.color.slice(1, 3),
          16,
        )},${parseInt(config.color.slice(3, 5), 16)},${parseInt(
          config.color.slice(5, 7),
          16,
        )},0.15), rgba(${parseInt(config.color.slice(1, 3), 16)},${parseInt(
          config.color.slice(3, 5),
          16,
        )},${parseInt(config.color.slice(5, 7), 16)},0.05))`,
        border: `1px solid rgba(${parseInt(config.color.slice(1, 3), 16)},${parseInt(
          config.color.slice(3, 5),
          16,
        )},${parseInt(config.color.slice(5, 7), 16)},0.3)`,
        fontSize: size === "sm" ? "11px" : "12px",
        fontWeight: "700",
        color: config.color,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        boxShadow: `0 2px 8px rgba(${parseInt(config.color.slice(1, 3), 16)},${parseInt(
          config.color.slice(3, 5),
          16,
        )},${parseInt(config.color.slice(5, 7), 16)},0.2)`,
      }}
    >
      <span
        style={{ width: size === "sm" ? "20px" : "24px", textAlign: "center" }}
      >
        {score}
      </span>
      <span style={{ opacity: 0.8 }}>{config.label}</span>
    </motion.div>
  );
}

function PatternBadge({ pattern, size = "sm" }) {
  const patternConfig = {
    rapidTransactions: { icon: Clock, color: "#f59e0b" },
    unusualLocation: { icon: MapPin, color: "#3b82f6" },
    highValue: { icon: DollarSign, color: "#10b981" },
    multipleDevices: { icon: Wifi, color: "#8b5cf6" },
    suspiciousIP: { icon: Globe, color: "#ef4444" },
    velocity: { icon: TrendingUp, color: "#f59e0b" },
    timeAnomaly: { icon: Clock, color: "#3b82f6" },
    amountAnomaly: { icon: DollarSign, color: "#10b981" },
    frequencyAnomaly: { icon: Wifi, color: "#8b5cf6" },
    deviceAnomaly: { icon: Wifi, color: "#ef4444" },
    behaviorAnomaly: { icon: Wifi, color: "#f59e0b" },
    networkAnomaly: { icon: Wifi, color: "#3b82f6" },
    locationAnomaly: { icon: MapPin, color: "#10b981" },
    timePatternAnomaly: { icon: Clock, color: "#8b5cf6" },
    amountPatternAnomaly: { icon: DollarSign, color: "#ef4444" },
    frequencyPatternAnomaly: { icon: Wifi, color: "#f59e0b" },
    devicePatternAnomaly: { icon: Wifi, color: "#3b82f6" },
    behaviorPatternAnomaly: { icon: Wifi, color: "#10b981" },
    networkPatternAnomaly: { icon: Wifi, color: "#8b5cf6" },
    locationPatternAnomaly: { icon: MapPin, color: "#ef4444" },
    timeBehaviorAnomaly: { icon: Clock, color: "#f59e0b" },
    amountBehaviorAnomaly: { icon: DollarSign, color: "#3b82f6" },
    frequencyBehaviorAnomaly: { icon: Wifi, color: "#10b981" },
    deviceBehaviorAnomaly: { icon: Wifi, color: "#8b5cf6" },
    behaviorBehaviorAnomaly: { icon: Wifi, color: "#ef4444" },
    networkBehaviorAnomaly: { icon: Wifi, color: "#f59e0b" },
    locationBehaviorAnomaly: { icon: MapPin, color: "#3b82f6" },
    timeNetworkAnomaly: { icon: Clock, color: "#10b981" },
    amountNetworkAnomaly: { icon: DollarSign, color: "#8b5cf6" },
    frequencyNetworkAnomaly: { icon: Wifi, color: "#ef4444" },
    deviceNetworkAnomaly: { icon: Wifi, color: "#f59e0b" },
    behaviorNetworkAnomaly: { icon: Wifi, color: "#3b82f6" },
    networkNetworkAnomaly: { icon: Wifi, color: "#10b981" },
    locationNetworkAnomaly: { icon: MapPin, color: "#8b5cf6" },
    timeLocationAnomaly: { icon: Clock, color: "#ef4444" },
    amountLocationAnomaly: { icon: DollarSign, color: "#f59e0b" },
    frequencyLocationAnomaly: { icon: Wifi, color: "#3b82f6" },
    deviceLocationAnomaly: { icon: Wifi, color: "#10b981" },
    behaviorLocationAnomaly: { icon: Wifi, color: "#8b5cf6" },
    networkLocationAnomaly: { icon: Wifi, color: "#ef4444" },
    locationLocationAnomaly: { icon: MapPin, color: "#f59e0b" },
  };

  const config = patternConfig[pattern] || {
    icon: AlertCircle,
    color: "#64748b",
  };
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? "6px" : "8px",
        padding: size === "sm" ? "4px 8px" : "6px 12px",
        borderRadius: "12px",
        background: `linear-gradient(135deg, rgba(${parseInt(
          config.color.slice(1, 3),
          16,
        )},${parseInt(config.color.slice(3, 5), 16)},${parseInt(
          config.color.slice(5, 7),
          16,
        )},0.15), rgba(${parseInt(config.color.slice(1, 3), 16)},${parseInt(
          config.color.slice(3, 5),
          16,
        )},${parseInt(config.color.slice(5, 7), 16)},0.05))`,
        border: `1px solid rgba(${parseInt(config.color.slice(1, 3), 16)},${parseInt(
          config.color.slice(3, 5),
          16,
        )},${parseInt(config.color.slice(5, 7), 16)},0.3)`,
        fontSize: size === "sm" ? "11px" : "12px",
        fontWeight: "700",
        color: config.color,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        boxShadow: `0 2px 8px rgba(${parseInt(config.color.slice(1, 3), 16)},${parseInt(
          config.color.slice(3, 5),
          16,
        )},${parseInt(config.color.slice(5, 7), 16)},0.2)`,
      }}
    >
      <Icon size={size === "sm" ? 12 : 14} style={{ flexShrink: 0 }} />
      <span style={{ opacity: 0.8 }}>
        {FRAUD_CONFIG.patterns[pattern] || pattern}
      </span>
    </motion.span>
  );
}

function FraudAlertCard({ alert, onResolve, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "16px",
        padding: "16px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ef4444, #f87171)",
              border: "1px solid rgba(239,68,68,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(239,68,68,0.4)",
            }}
          >
            <AlertTriangle size={16} style={{ color: "#fff" }} />
          </motion.div>
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#f1f5f9",
                margin: 0,
                marginBottom: "4px",
              }}
            >
              Fraud Alert #{alert.id}
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <RiskScore score={alert.riskScore} />
              <span
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  background: "rgba(255,255,255,0.05)",
                  padding: "2px 6px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {alert.type}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#64748b",
              background: "rgba(255,255,255,0.05)",
              padding: "4px 8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {new Date(alert.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
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
              color: "#64748b",
              marginBottom: "6px",
              display: "block",
            }}
          >
            User
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={`https://i.pravatar.cc/24?u=${alert.userId}`}
              alt="User"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            />
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#f1f5f9",
                  display: "block",
                }}
              >
                {alert.userName}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  display: "block",
                }}
              >
                ID: {alert.userId}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748b",
              marginBottom: "6px",
              display: "block",
            }}
          >
            Transaction
          </span>
          <div
            style={{
              padding: "8px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#f1f5f9",
                display: "block",
              }}
            >
              ${alert.amount?.toLocaleString() || "N/A"}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "#64748b",
                display: "block",
              }}
            >
              Escrow ID: {alert.escrowId}
            </span>
          </div>
        </div>

        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748b",
              marginBottom: "6px",
              display: "block",
            }}
          >
            Location
          </span>
          <div
            style={{
              padding: "8px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#f1f5f9",
                display: "block",
              }}
            >
              {alert.location || "Unknown"}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "#64748b",
                display: "block",
              }}
            >
              IP: {alert.ipAddress || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {alert.patterns?.map((pattern, i) => (
          <PatternBadge key={i} pattern={pattern} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "#64748b",
              background: "rgba(255,255,255,0.05)",
              padding: "4px 8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Confidence: {alert.confidence}%
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "#64748b",
              background: "rgba(255,255,255,0.05)",
              padding: "4px 8px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Model: {alert.modelVersion}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onDismiss(alert.id, "False positive")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(16,185,129,0.4)",
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
              color: "#34d399",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.15))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))";
            }}
          >
            <CheckCircle size={12} />
            Dismiss
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onResolve(alert.id, "Fraud confirmed")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(239,68,68,0.4)",
              background:
                "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))",
              color: "#f87171",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.15))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))";
            }}
          >
            <XCircle size={12} />
            Resolve
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FraudDetection() {
  const [alerts, setAlerts] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    riskLevel: "all",
    type: "all",
    timeRange: "24h",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [alertsRes, metricsRes] = await Promise.all([
          adminApi.getFraudAlerts(filters),
          adminApi.getFraudMetrics(),
        ]);
        // Normalize API responses to ensure they're always arrays/objects
        const normalizedAlerts = safeArray(alertsRes.data);
        const normalizedMetrics = metricsRes.data || {};

        setAlerts(normalizedAlerts);
        setMetrics(normalizedMetrics);
      } catch (err) {
        console.error("Failed to fetch fraud detection data:", err);
        setAlerts([]); // Ensure state is always an array even on error
        setMetrics({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const handleResolve = async (alertId, resolution) => {
    try {
      await adminApi.resolveFraudAlert(alertId, resolution);
      // Use safe filter to ensure we don't crash if alerts is not an array
      const updatedAlerts = safeFilter(alerts, (a) => a.id !== alertId);
      setAlerts(updatedAlerts);
    } catch (err) {
      console.error("Failed to resolve fraud alert:", err);
    }
  };

  const handleDismiss = async (alertId, reason) => {
    try {
      await adminApi.dismissFraudAlert(alertId, reason);
      // Use safe filter to ensure we don't crash if alerts is not an array
      const updatedAlerts = safeFilter(alerts, (a) => a.id !== alertId);
      setAlerts(updatedAlerts);
    } catch (err) {
      console.error("Failed to dismiss fraud alert:", err);
    }
  };

  const filteredAlerts = safeFilter(alerts, (alert) => {
    if (filters.riskLevel !== "all") {
      const riskConfig = FRAUD_CONFIG.riskThresholds[filters.riskLevel];
      if (
        alert.riskScore < riskConfig.min ||
        alert.riskScore > riskConfig.max
      ) {
        return false;
      }
    }
    if (filters.type !== "all" && alert.type !== filters.type) {
      return false;
    }
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        alert.userName?.toLowerCase().includes(searchLower) ||
        alert.userId?.toString().includes(search) ||
        alert.escrowId?.toString().includes(search)
      );
    }
    return true;
  });

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
              background: "linear-gradient(135deg, #ef4444, #f87171)",
              border: "1px solid rgba(239,68,68,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(239,68,68,0.4)",
            }}
          >
            <Shield size={16} style={{ color: "#fff" }} />
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
              AI Fraud Detection
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "2px",
                margin: 0,
              }}
            >
              Real-time fraud monitoring and risk assessment
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
            placeholder="Search alerts by user, ID, or transaction…"
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

      {/* Metrics Cards */}
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
              Active Alerts
            </span>
            <AlertTriangle size={16} style={{ color: "#f87171" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#fecaca",
              letterSpacing: "-0.02em",
            }}
          >
            {metrics.activeAlerts || 0}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            {metrics.todayAlerts || 0} today
          </div>
        </div>

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
              Risk Score Avg
            </span>
            <Target size={16} style={{ color: "#60a5fa" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#93c5fd",
              letterSpacing: "-0.02em",
            }}
          >
            {metrics.avgRiskScore || 0}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Across all users
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
              Detection Rate
            </span>
            <Zap size={16} style={{ color: "#34d399" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#86efac",
              letterSpacing: "-0.02em",
            }}
          >
            {metrics.detectionRate || 0}%
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            AI model accuracy
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.06))",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(139,92,246,0.15)",
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
                color: "#a78bfa",
              }}
            >
              False Positives
            </span>
            <Brain size={16} style={{ color: "#a78bfa" }} />
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#c4b5fd",
              letterSpacing: "-0.02em",
            }}
          >
            {metrics.falsePositives || 0}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Last 24 hours
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "16px",
          padding: "12px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "12px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginRight: "12px",
          }}
        >
          <Filter size={14} style={{ color: "#64748b" }} />
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#64748b",
            }}
          >
            Filters
          </span>
        </div>

        <select
          className="saas-input"
          value={filters.riskLevel}
          onChange={(e) =>
            setFilters({ ...filters, riskLevel: e.target.value })
          }
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "#f1f5f9",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>

        <select
          className="saas-input"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "#f1f5f9",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <option value="all">All Types</option>
          <option value="transaction">Transaction</option>
          <option value="login">Login</option>
          <option value="behavior">Behavior</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Refresh data
            const fetchData = async () => {
              try {
                setLoading(true);
                const [alertsRes, metricsRes] = await Promise.all([
                  adminApi.getFraudAlerts(filters),
                  adminApi.getFraudMetrics(),
                ]);
                setAlerts(alertsRes.data);
                setMetrics(metricsRes.data);
              } catch (err) {
                console.error(err);
              } finally {
                setLoading(false);
              }
            };
            fetchData();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid rgba(59,130,246,0.4)",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
            color: "#60a5fa",
            fontSize: "11px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.15))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))";
          }}
        >
          <RefreshCw size={12} />
          Refresh
        </motion.button>
      </motion.div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
                border: "3px solid rgba(239,68,68,0.3)",
                borderTop: "3px solid #ef4444",
                borderRadius: "50%",
              }}
            />
            <p style={{ fontSize: "14px", margin: 0 }}>
              Analyzing transactions…
            </p>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <ShieldCheck
              size={32}
              style={{ margin: "0 auto 12px", opacity: 0.4 }}
            />
            <p style={{ fontSize: "14px", margin: 0 }}>No fraud alerts found</p>
            <p
              style={{
                fontSize: "12px",
                color: "#475569",
                marginTop: "4px",
              }}
            >
              Your platform is secure. Keep monitoring for any suspicious
              activity.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <AnimatePresence>
              {filteredAlerts.map((alert, i) => (
                <FraudAlertCard
                  key={alert.id}
                  alert={alert}
                  onResolve={handleResolve}
                  onDismiss={handleDismiss}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
