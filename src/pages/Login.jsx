import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock } from "lucide-react";
import api from "../api/api";
import ParticleBackground from "../components/ParticleBackground";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      }));

      if (res.data.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      // Login error handled by parent
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
      style={{ minHeight: "100vh", display: "flex", overflow: "hidden", color: "#f1f5f9", position: "relative" }}
    >
      <ParticleBackground />
      <div style={{ position: "absolute", inset: 0, background: "#0B1726", zIndex: -1 }} />

      {/* LEFT — Login Panel */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "560px", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px" }}>
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "rgba(99,102,241,0.3)",
            borderRadius: "50%",
            filter: "blur(120px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            animation: "pulse-slow 4s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
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
              background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)",
              borderRadius: "99px",
            }}
          />

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "11px",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(99,102,241,0.5)",
              }}
            >
              <Shield size={17} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "-0.025em", color: "#f1f5f9", lineHeight: 1.2 }}>
                Welcome back
              </h1>
              <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
                Login to your escrow dashboard
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Email */}
            <div>
              <label className="saas-label">Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#475569", pointerEvents: "none" }} />
                <input
                  className="saas-input"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  onChange={handleChange}
                  style={{ paddingLeft: "36px" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="saas-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#475569", pointerEvents: "none" }} />
                <input
                  className="saas-input"
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  style={{ paddingLeft: "36px" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: "100%", marginTop: "4px", padding: "12px", fontSize: "14px" }}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "20px", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#818cf8", textDecoration: "none", fontWeight: "500" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT — Hero Panel */}
      <div className="hidden lg:block" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a"
          alt="Fintech"
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #0B1726 15%, rgba(11,23,38,0.5) 60%, transparent)" }} />

        <div style={{ position: "absolute", bottom: "14%", left: "10%", maxWidth: "420px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6366f1",
              marginBottom: "12px",
            }}
          >
            Blockchain-Secured Escrow
          </p>
          <h2 style={{ fontSize: "38px", fontWeight: "700", lineHeight: "1.15", letterSpacing: "-0.03em", color: "#f1f5f9" }}>
            Secure transactions.
            <br />
            <span className="gradient-text">Trusted escrow.</span>
          </h2>
          <p style={{ color: "#64748b", marginTop: "16px", fontSize: "14px", lineHeight: "22px" }}>
            Experience seamless digital transactions with real-time protection and full blockchain transparency.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
