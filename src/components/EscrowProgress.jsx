import React from "react";
import { Check } from "lucide-react";

const steps = [
  { key: "CREATED",   label: "Created" },
  { key: "FUNDED",    label: "Funded" },
  { key: "SHIPPED",   label: "Shipped" },
  { key: "DELIVERED", label: "Done" },
];

const EscrowProgress = ({ escrowStatus, shipmentStatus }) => {
  let currentStep = 0;
  if (escrowStatus === "CREATED")       currentStep = 0;
  if (escrowStatus === "FUNDED")        currentStep = 1;
  if (shipmentStatus === "SHIPPED")     currentStep = 2;
  if (shipmentStatus === "DELIVERED" || escrowStatus === "DELIVERED") currentStep = 3;

  return (
    <div style={{ marginTop: "16px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive    = index === currentStep;

          return (
            <React.Fragment key={step.key}>
              {/* Step circle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", flex: index < steps.length - 1 ? "0 0 auto" : "0 0 auto" }}>
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: "700",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    background: isCompleted
                      ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                      : isActive
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(255,255,255,0.06)",
                    border: isCompleted
                      ? "1.5px solid #6366f1"
                      : isActive
                      ? "1.5px solid rgba(99,102,241,0.7)"
                      : "1.5px solid rgba(255,255,255,0.1)",
                    color: isCompleted ? "#fff" : isActive ? "#a5b4fc" : "#475569",
                    boxShadow: isActive ? "0 0 12px rgba(99,102,241,0.4)" : isCompleted ? "0 0 8px rgba(99,102,241,0.3)" : "none",
                  }}
                >
                  {isCompleted ? <Check size={11} strokeWidth={3} /> : index + 1}
                </div>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "600",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: isCompleted || isActive ? "#94a3b8" : "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    marginBottom: "15px",
                    marginLeft: "4px",
                    marginRight: "4px",
                    borderRadius: "1px",
                    background: index < currentStep
                      ? "linear-gradient(90deg, #6366f1, #4f46e5)"
                      : "rgba(255,255,255,0.07)",
                    transition: "background 0.4s ease",
                    boxShadow: index < currentStep ? "0 0 6px rgba(99,102,241,0.4)" : "none",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default EscrowProgress;
