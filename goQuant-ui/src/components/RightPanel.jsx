import React, { useContext } from "react";
import { TickContext } from "../context/TickContext";
import MetricCard from "./MetricCard";

export default function RightPanel() {
  const { tick, loading, error } = useContext(TickContext);

  if (loading) return <p className="text-zinc-600">Loading metrics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <MetricCard label="Mid Price" value={tick.mid_price?.toFixed?.(2)} unit="USD" />
      <MetricCard label="Average Price" value={tick.avg_price?.toFixed?.(2)} unit="USD" />
      <MetricCard label="BTC Executed" value={tick.btc_executed?.toFixed?.(6)} />
      <MetricCard label="Slippage" value={tick.slippage?.toFixed?.(4)} unit="%" />
      <MetricCard label="Predicted Slippage" value={tick.predicted_slippage?.toFixed?.(4)} unit="%" />
      <MetricCard label="Fee" value={tick.fee?.toFixed?.(4)} unit="USD" />
      <MetricCard label="Market Impact" value={tick.market_impact?.toFixed?.(4)} unit="USD" />
      <MetricCard label="Latency" value={tick.latency_ms?.toFixed?.(2)} unit="ms" />
    </div>
  );
}
