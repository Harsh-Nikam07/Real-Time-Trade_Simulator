import React, { useContext } from "react";
import { TickContext } from "../context/TickContext";

/**
 * Status indicator component that displays system status
 */
export default function StatusIndicator() {
  const { loading, error } = useContext(TickContext);
  
  // Determine status based on context
  const status = error ? "error" : loading ? "warning" : "active";
  
  const statusStyles = {
    active: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`h-2 w-2 rounded-full ${statusStyles[status]}`}></div>
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
}