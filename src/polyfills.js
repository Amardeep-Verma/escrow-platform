// Fix for sockjs-client in Vite
window.global = window;

// ✅ NEW: Additional polyfills for enhanced functionality
if (!window.crypto) {
  window.crypto = window.msCrypto;
}

// Polyfill for Array.flat (for older browsers)
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten,
      );
    }, []);
  };
}

// Polyfill for Object.fromEntries (for older browsers)
if (!Object.fromEntries) {
  Object.fromEntries = function (iterable) {
    return [...iterable].reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});
  };
}

// Polyfill for String.replaceAll (for older browsers)
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (str, newStr) {
    if (
      Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
    ) {
      return this.replace(str, newStr);
    }
    return this.replace(new RegExp(str, "g"), newStr);
  };
}

// Enhanced console methods for development
if (process.env.NODE_ENV === "development") {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => {
    originalLog("[ESCROW-APP]", ...args);
  };

  console.error = (...args) => {
    originalError("[ESCROW-APP ERROR]", ...args);
  };

  console.warn = (...args) => {
    originalWarn("[ESCROW-APP WARNING]", ...args);
  };
}

// Performance monitoring
window.performance = window.performance || {};
window.performance.now =
  window.performance.now ||
  function () {
    return new Date().getTime();
  };
