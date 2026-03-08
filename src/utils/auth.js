export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  const user = getUser();
  return user?.role;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// ✅ NEW: Enhanced auth utilities
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const isBuyer = () => {
  const user = getUser();
  return user?.role === "buyer";
};

export const isSeller = () => {
  const user = getUser();
  return user?.role === "seller";
};

export const getWalletAddress = () => {
  const user = getUser();
  return user?.walletAddress;
};

export const getDisplayName = () => {
  const user = getUser();
  return user?.displayName || user?.username || "User";
};

export const getAvatarColor = (username) => {
  const colors = [
    "bg-gradient-to-br from-blue-500 to-purple-600",
    "bg-gradient-to-br from-green-500 to-teal-600",
    "bg-gradient-to-br from-orange-500 to-pink-600",
    "bg-gradient-to-br from-red-500 to-orange-600",
    "bg-gradient-to-br from-indigo-500 to-blue-600",
  ];
  const index = username ? username.charCodeAt(0) % colors.length : 0;
  return colors[index];
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const generateUserId = () => {
  return "user_" + Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const sanitizeInput = (input) => {
  return input.replace(/[<>\"'&]/g, "");
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
