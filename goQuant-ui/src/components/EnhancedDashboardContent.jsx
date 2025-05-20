import React, { useContext, useState, useEffect } from "react";
import { TickContext } from "../context/TickContext";
import MetricCard from "./MetricCard";
import { 
  ArrowRight, 
  ArrowUpCircle, 
  Clock,
  RefreshCw,
  AlertTriangle,
  Bitcoin,
  ReceiptText,
  CircleDollarSign,
  Activity,
} from "lucide-react";
import LeftPanel from "./LeftPanel";
import Chart from './Chart'

export default function EnhancedDashboardContent() {
  const { tick, loading, error } = useContext(TickContext);
  const [prevTick, setPrevTick] = useState({});

  useEffect(() => {
    if (tick && Object.keys(tick).length > 0) {
      setPrevTick(prevTick => {
        return Object.keys(prevTick).length > 0 ? prevTick : tick;
      });
      const timer = setTimeout(() => {
        setPrevTick(tick);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tick]);

  const calculateTrend = (current, previous, key) => {
    if (!current || !previous || !current[key] || !previous[key]) return undefined;
    const currentVal = parseFloat(current[key]);
    const prevVal = parseFloat(previous[key]);
    if (isNaN(currentVal) || isNaN(prevVal) || prevVal === 0) return undefined;
    return ((currentVal - prevVal) / prevVal) * 100;
  };

  const getStatusMessage = () => {
    if (error) return "System Error: Unable to fetch trading data";
    if (loading) return "Connecting to trading engine...";
    return "Live Trading Active";
  };

  const getStatusStyles = () => {
    if (error) return "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    if (loading) return "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400";
  };

  const StatusIcon = () => {
    if (error) return <AlertTriangle size={18} />;
    if (loading) return <RefreshCw size={18} className="animate-spin" />;
    return <ArrowUpCircle size={18} />;
  };

  return (
    <>
      <main className="w-full h-screen px-4 sm:px-6 lg:px-8 py-6">
        {/* Status banner */}
        <div className={`mb-6 rounded-lg p-4 flex items-center justify-between ${getStatusStyles()}`}>
          <div className="flex items-center space-x-2">
            <StatusIcon />
            <span className="font-medium">{getStatusMessage()}</span>
          </div>
          <div className="text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Main content layout */}
        <div className="flex w-full h-fit gap-6 justify-between">
          {/* Left section */}
          <aside className="w-[20%] min-w-[180px] rounded-lg  flex flex-col justify-start">
            <LeftPanel/>


            
          </aside>

          {/* Dashboard grid section */}
          <section className="w-[80%] flex flex-col gap-6">



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <MetricCard 
                label="Mid Price" 
                value={tick.mid_price?.toFixed?.(2)} 
                unit="USD" 
                trend={calculateTrend(tick, prevTick, 'mid_price')} 
                icon={ArrowRight} 
              />
              <MetricCard 
                label="Average Price" 
                value={tick.avg_price?.toFixed?.(2)} 
                unit="USD" 
                trend={calculateTrend(tick, prevTick, 'avg_price')} 
                icon={ArrowRight} 
              />
              <MetricCard 
                label="BTC Executed" 
                value={tick.btc_executed?.toFixed?.(6)} 
                trend={calculateTrend(tick, prevTick, 'btc_executed')} 
                icon={Bitcoin} 
              />
              <MetricCard 
                label="Slippage" 
                value={tick.slippage?.toFixed?.(4)} 
                unit="%" 
                trend={calculateTrend(tick, prevTick, 'slippage')} 
                icon={ReceiptText} 
              />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <MetricCard 
                label="Predicted Slippage" 
                value={tick.predicted_slippage?.toFixed?.(4)} 
                unit="%" 
                trend={calculateTrend(tick, prevTick, 'predicted_slippage')} 
                icon={ReceiptText} 
              />
              <MetricCard 
                label="Fee" 
                value={tick.fee?.toFixed?.(4)} 
                unit="USD" 
                trend={calculateTrend(tick, prevTick, 'fee')} 
                icon={CircleDollarSign} 
              />
              <MetricCard 
                label="Market Impact" 
                value={tick.market_impact?.toFixed?.(4)} 
                unit="USD" 
                trend={calculateTrend(tick, prevTick, 'market_impact')} 
                icon={Activity} 
              />
              <MetricCard 
                label="Latency" 
                value={tick.latency_ms?.toFixed?.(2)} 
                unit="ms" 
                trend={calculateTrend(tick, prevTick, 'latency_ms')} 
                icon={Clock} 
              />
              </div>
            </div>

            <Chart/>
          
          </section>
        </div>
      </main>
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          GoQuant Trading Simulator • Real-time market data
        </div>
      </footer>
    </>
  );
}
