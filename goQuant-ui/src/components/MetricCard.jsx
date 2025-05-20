import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * Enhanced Metric Card component with trend indicators and icons
 * @param {string} label - The name of the metric
 * @param {string|number} value - The metric value
 * @param {string} unit - Optional unit (e.g., %, USD, ms)
 * @param {number} trend - Optional percentage change to display
 * @param {Component} icon - Optional Lucide icon component
 */
export default function MetricCard({ label, value, unit, trend, icon: Icon }) {
  const formattedValue = value !== undefined && value !== null ? value : "—";
  
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-4 shadow-sm w-full transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {Icon && (
            <div className="text-gray-400 dark:text-gray-500">
              <Icon size={16} />
            </div>
          )}
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            {label}
          </div>
        </div>
        
        {trend !== undefined && (
          <div className={`flex items-center text-xs font-medium ${
            trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-400"
          }`}>
            {trend > 0 ? <ChevronUp size={16} /> : trend < 0 ? <ChevronDown size={16} /> : null}
            {Math.abs(trend).toFixed(2)}%
          </div>
        )}
      </div>
      
      <div className="mt-2 flex items-baseline">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {formattedValue}
        </div>
        {unit && (
          <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}