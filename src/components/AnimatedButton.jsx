import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  onClick,
  color = "blue",
  type = "button",
}) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    gray: "bg-gray-700 hover:bg-gray-800",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2 }}
      className={`text-white px-5 py-2 rounded-lg shadow-md transition ${colors[color]}`}
    >
      {children}
    </motion.button>
  );
}
