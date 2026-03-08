import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Users from "./pages/admin/Users";
import Escrows from "./pages/admin/Escrows";
import Reports from "./pages/admin/Reports";

/* ================= PAGES ================= */
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

/* ================= ROUTES ================= */
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

/* ================= LAYOUTS ================= */
import AdminLayout from "./components/AdminLayout";

/* ===================================================
   ANIMATED ROUTES
=================================================== */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="escrows" element={<Escrows />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ===================================================
   MAIN APP
=================================================== */
export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0d1b30",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            fontSize: "13.5px",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.2)",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#0d1b30" },
            style: {
              borderColor: "rgba(16,185,129,0.25)",
            },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#0d1b30" },
            style: {
              borderColor: "rgba(239,68,68,0.25)",
            },
          },
          loading: {
            iconTheme: { primary: "#6366f1", secondary: "#0d1b30" },
          },
        }}
      />
    </BrowserRouter>
  );
}
