import React from "react";
import { Check, Circle, Dot } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { key: "CREATED", label: "Created" },
  { key: "FUNDED", label: "Funded" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Completed" },
];

const EscrowProgress = ({ escrowStatus, shipmentStatus }) => {
  let currentStep = 0;
  if (escrowStatus === "CREATED") currentStep = 0;
  if (escrowStatus === "FUNDED") currentStep = 1;
  if (shipmentStatus === "SHIPPED") currentStep = 2;
  if (shipmentStatus === "DELIVERED" || escrowStatus === "DELIVERED")
    currentStep = 3;

  return (
    <div style={{ marginTop: "16px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={step.key}>
              {/* Step circle */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  flex: index < steps.length - 1 ? "0 0 auto" : "0 0 auto",
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "800",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    background: isCompleted
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : isActive
                        ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                        : "rgba(255,255,255,0.05)",
                    border: isCompleted
                      ? "2px solid rgba(16,185,129,0.6)"
                      : isActive
                        ? "2px solid rgba(99,102,241,0.8)"
                        : "2px solid rgba(255,255,255,0.1)",
                    color: isCompleted ? "#fff" : isActive ? "#fff" : "#64748b",
                    boxShadow: isActive
                      ? "0 8px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : isCompleted
                        ? "0 8px 20px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                        : "inset 0 1px 0 rgba(255,255,255,0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span style={{ color: isActive ? "#fff" : "#94a3b8" }}>
                      {index + 1}
                    </span>
                  )}
                  {/* Animated inner glow for active steps */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: "absolute",
                        inset: "-5px",
                        borderRadius: "50%",
                        border: "2px solid rgba(99,102,241,0.3)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </motion.div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: isCompleted || isActive ? "#94a3b8" : "#475569",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  style={{
                    flex: 1,
                    height: "3px",
                    marginBottom: "18px",
                    marginLeft: "6px",
                    marginRight: "6px",
                    borderRadius: "2px",
                    background:
                      index < currentStep ? (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(90deg, #10b981, #6366f1, #f59e0b)",
                            boxShadow: "0 0 12px rgba(99,102,241,0.5)",
                          }}
                        />
                      ) : (
                        "rgba(255,255,255,0.08)"
                      ),
                    transition: "all 0.4s ease",
                    position: "relative",
                  }}
                >
                  {/* Animated progress indicator */}
                  {index === currentStep && (
                    <motion.div
                      animate={{ x: [-10, 10, -10] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        position: "absolute",
                        right: "-6px",
                        top: "-3px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#6366f1",
                        boxShadow: "0 0 10px #6366f1",
                      }}
                    />
                  )}
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default EscrowProgress;
