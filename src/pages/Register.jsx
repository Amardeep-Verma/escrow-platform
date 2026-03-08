import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../api/api";
import ParticleBackground from "../components/ParticleBackground";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      // Error handling preserved
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        minHeight: "100vh",
        display: "flex",
        overflow: "hidden",
        color: "#f1f5f9",
        position: "relative",
      }}
    >
      <ParticleBackground />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
          zIndex: -1,
        }}
      />

      {/* LEFT — Form Panel */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "560px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 32px",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(120px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            animation: "pulse-slow 4s ease-in-out infinite",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "420px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(99,102,241,0.15)",
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              right: "20%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)",
              borderRadius: "99px",
            }}
          />

          {/* Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(99,102,241,0.6)",
              }}
            >
              <UserPlus size={18} color="#fff" strokeWidth={2.5} />
            </motion.div>
            <div>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: "800",
                  letterSpacing: "-0.025em",
                  color: "#f1f5f9",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Create account
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  marginTop: "4px",
                  margin: 0,
                }}
              >
                Start using secure escrow today
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label
                className="saas-label"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={16}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    pointerEvents: "none",
                  }}
                />
                <input
                  className="saas-input"
                  type="text"
                  name="name"
                  required
                  placeholder="Your Full Name"
                  onChange={handleChange}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "14px",
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                className="saas-label"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    pointerEvents: "none",
                  }}
                />
                <input
                  className="saas-input"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  onChange={handleChange}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "14px",
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                className="saas-label"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    pointerEvents: "none",
                  }}
                />
                <input
                  className="saas-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••••••"
                  onChange={handleChange}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#64748b";
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                className="saas-label"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                I am a
              </label>
              <div style={{ position: "relative" }}>
                <select
                  className="saas-input"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  style={{
                    appearance: "none",
                    paddingRight: "40px",
                    paddingLeft: "14px",
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                >
                  <option value="BUYER">Buyer</option>
                  <option value="SELLER">Seller</option>
                </select>
                <ChevronDown
                  size={16}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "14px",
                fontSize: "14px",
                fontWeight: "700",
                borderRadius: "12px",
                border: "1px solid rgba(99,102,241,0.4)",
                background:
                  "linear-gradient(135deg, #6366f1, #4f46e5, #6366f1)",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 24px rgba(99,102,241,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(99,102,241,0.3)";
              }}
            >
              {loading ? "Creating Account…" : "Create Account"}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#818cf8",
                textDecoration: "none",
                fontWeight: "600",
                letterSpacing: "0.02em",
              }}
            >
              Sign in
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT — Hero Panel */}
      <div
        className="hidden lg:block"
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a"
          alt="Fintech blockchain"
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, #020617 15%, rgba(11,23,38,0.6) 60%, transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "14%",
            left: "10%",
            maxWidth: "460px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            Blockchain-Secured
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: "42px",
              fontWeight: "800",
              lineHeight: "1.2",
              letterSpacing: "-0.025em",
              color: "#f1f5f9",
              margin: 0,
            }}
          >
            Trustless escrow
            <br />
            <span className="gradient-text">on-chain.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            style={{
              color: "#94a3b8",
              marginTop: "14px",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            Every transaction secured by smart contracts. No intermediaries, no
            surprises.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
