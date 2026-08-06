import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Top Right Ambient Glow */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-400/10 via-indigo-300/10 to-transparent blur-3xl"
      />

      {/* Soft Bottom Left Glow */}
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-300/10 via-blue-200/10 to-transparent blur-3xl"
      />
    </div>
  );
}