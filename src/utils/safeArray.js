/**
 * Utility functions for safe array operations to prevent runtime errors
 * when API responses return objects instead of arrays
 */

/**
 * Ensures data is always an array
 * @param {any} data - The data to normalize
 * @returns {Array} - Always returns an array
 */
export const safeArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  // If data is an object with array-like properties, try to extract the array
  if (data && typeof data === "object") {
    // Common API response patterns
    if (Array.isArray(data.users)) return data.users;
    if (Array.isArray(data.escrows)) return data.escrows;
    if (Array.isArray(data.disputes)) return data.disputes;
    if (Array.isArray(data.reports)) return data.reports;
    if (Array.isArray(data.data)) return data.data;

    // If it's an object but not an array, log warning and return empty array
    console.warn(
      "API returned unexpected object structure instead of array:",
      data,
    );
    return [];
  }

  // If data is undefined, null, or any other falsy value, return empty array
  return [];
};

/**
 * Safe map operation that works with any data type
 * @param {any} data - The data to map over
 * @param {Function} callback - The map callback function
 * @param {any} fallback - Fallback value if mapping fails
 * @returns {Array} - Mapped array or empty array
 */
export const safeMap = (data, callback, fallback = []) => {
  try {
    const arrayData = safeArray(data);
    return arrayData.map(callback);
  } catch (error) {
    console.warn("Safe map operation failed:", error);
    return fallback;
  }
};

/**
 * Safe filter operation that works with any data type
 * @param {any} data - The data to filter
 * @param {Function} callback - The filter callback function
 * @param {any} fallback - Fallback value if filtering fails
 * @returns {Array} - Filtered array or empty array
 */
export const safeFilter = (data, callback, fallback = []) => {
  try {
    const arrayData = safeArray(data);
    return arrayData.filter(callback);
  } catch (error) {
    console.warn("Safe filter operation failed:", error);
    return fallback;
  }
};

/**
 * Safe reduce operation that works with any data type
 * @param {any} data - The data to reduce
 * @param {Function} callback - The reduce callback function
 * @param {any} initialValue - The initial value for reduce
 * @param {any} fallback - Fallback value if reduce fails
 * @returns {any} - Reduced value or fallback
 */
export const safeReduce = (
  data,
  callback,
  initialValue,
  fallback = initialValue,
) => {
  try {
    const arrayData = safeArray(data);
    return arrayData.reduce(callback, initialValue);
  } catch (error) {
    console.warn("Safe reduce operation failed:", error);
    return fallback;
  }
};

/**
 * Safe slice operation that works with any data type
 * @param {any} data - The data to slice
 * @param {number} start - Start index
 * @param {number} end - End index
 * @param {any} fallback - Fallback value if slice fails
 * @returns {Array} - Sliced array or empty array
 */
export const safeSlice = (data, start = 0, end = undefined, fallback = []) => {
  try {
    const arrayData = safeArray(data);
    return arrayData.slice(start, end);
  } catch (error) {
    console.warn("Safe slice operation failed:", error);
    return fallback;
  }
};

/**
 * Safe length check that works with any data type
 * @param {any} data - The data to check length of
 * @returns {number} - Length of array or 0
 */
export const safeLength = (data) => {
  try {
    const arrayData = safeArray(data);
    return arrayData.length;
  } catch (error) {
    console.warn("Safe length operation failed:", error);
    return 0;
  }
};
