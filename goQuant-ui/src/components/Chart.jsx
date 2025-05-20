import React, { useContext, useState, useEffect } from "react";
import { TickContext } from "../context/TickContext";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from "recharts";
import { TrendingUp } from "lucide-react";

const Chart = () => {
  const { tick, loading, error } = useContext(TickContext);
  const [chartData, setChartData] = useState([]);
  
  // Generate a unique color based on the value trend
  const getTrendColor = (current, previous) => {
    if (!previous || current === previous) return "#9CA3AF";
    return current > previous ? "#10B981" : "#EF4444";
  };
  
  useEffect(() => {
    if (tick && Object.keys(tick).length > 0) {
      // Add new data point with timestamp
      setChartData(prevData => {
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        
        // Calculate stats
        const previousPoint = prevData.length > 0 ? prevData[prevData.length - 1] : null;
        const midPricePrev = previousPoint ? previousPoint.midPrice : tick.mid_price;
        const avgPricePrev = previousPoint ? previousPoint.avgPrice : tick.avg_price;
        
        // Create new data point
        const newData = [...prevData, {
          time: timestamp,
          timestamp: now.getTime(),
          midPrice: tick.mid_price,
          avgPrice: tick.avg_price,
          btcExecuted: tick.btc_executed,
          slippage: tick.slippage,
          volume: tick.btc_executed * tick.mid_price, // Calculate trading volume
          midPriceColor: getTrendColor(tick.mid_price, midPricePrev),
          avgPriceColor: getTrendColor(tick.avg_price, avgPricePrev)
        }];
        
        // Keep only the last 60 data points for better performance
        if (newData.length > 60) {
          return newData.slice(-60);
        }
        return newData;
      });
    }
  }, [tick]);

  if (loading && chartData.length === 0) {
    return (
      <div className="h-96 bg-gray-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
          <div className="animate-spin mb-4">
            <TrendingUp size={24} />
          </div>
          <div>Loading trading data...</div>
        </div>
      </div>
    );
  }

  if (error && chartData.length === 0) {
    return (
      <div className="h-96 bg-gray-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
        <div className="text-red-500 flex flex-col items-center">
          <div className="mb-4">
            <TrendingUp size={24} className="text-red-500" />
          </div>
          <div>Failed to load chart data</div>
        </div>
      </div>
    );
  }

  // Calculate price range for YAxis domain
  const calcYAxisDomain = () => {
    if (chartData.length === 0) return ['auto', 'auto'];
    
    const midPrices = chartData.map(d => d.midPrice).filter(Boolean);
    const avgPrices = chartData.map(d => d.avgPrice).filter(Boolean);
    
    if (midPrices.length === 0 && avgPrices.length === 0) return ['auto', 'auto'];
    
    const allPrices = [...midPrices, ...avgPrices];
    const min = Math.min(...allPrices) * 0.9998; // Add small padding
    const max = Math.max(...allPrices) * 1.0002;
    
    return [min, max];
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const midPrice = payload.find(p => p.dataKey === "midPrice")?.value;
      const avgPrice = payload.find(p => p.dataKey === "avgPrice")?.value;
      const btcExecuted = payload.find(p => p.dataKey === "btcExecuted")?.value;
      const volume = payload.find(p => p.dataKey === "volume")?.value;
      const slippage = chartData.find(item => item.time === label)?.slippage;
      
      // Get previous data point to calculate change
      const currentIndex = chartData.findIndex(item => item.time === label);
      const prevPoint = currentIndex > 0 ? chartData[currentIndex - 1] : null;
      
      // Calculate price changes
      const midPriceChange = prevPoint ? ((midPrice - prevPoint.midPrice) / prevPoint.midPrice * 100) : 0;
      const avgPriceChange = prevPoint ? ((avgPrice - prevPoint.avgPrice) / prevPoint.avgPrice * 100) : 0;
      
      // Format functions for consistency
      const formatCurrency = (value) => value?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
      const formatPercent = (value) => Math.abs(value).toFixed(4);
      const formatBtc = (value) => value?.toFixed(6);
      
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg max-w-xs">
          {/* Header with timestamp */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-3">
            <span className="text-gray-200 font-semibold">
              {new Date(chartData.find(item => item.time === label)?.timestamp).toLocaleTimeString()}
            </span>
          </div>
          
          {/* Price Section */}
          <div className="space-y-3">
            {/* Mid Price */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-300">Mid Price</span>
                </div>
                <span className="font-bold text-white">${formatCurrency(midPrice)}</span>
              </div>
              
              {prevPoint && (
                <div className="flex justify-end mt-1">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${midPriceChange >= 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {midPriceChange >= 0 ? '↑' : '↓'} {formatPercent(midPriceChange)}%
                  </span>
                </div>
              )}
            </div>
            
            {/* Avg Price */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-300">Avg Price</span>
                </div>
                <span className="font-bold text-white">${formatCurrency(avgPrice)}</span>
              </div>
              
              {prevPoint && (
                <div className="flex justify-end mt-1">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${avgPriceChange >= 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {avgPriceChange >= 0 ? '↑' : '↓'} {formatPercent(avgPriceChange)}%
                  </span>
                </div>
              )}
            </div>
            
            {/* Divider */}
            <div className="border-t border-gray-700 my-2"></div>
            
            {/* Trading Data */}
            <div className="grid grid-cols-2 gap-3">
              {/* BTC Executed */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">BTC Executed</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="font-medium text-white">{formatBtc(btcExecuted)}</span>
                </div>
              </div>
              
              {/* Volume */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Volume</span>
                <span className="font-medium text-white">${formatCurrency(volume)}</span>
              </div>
              
              {/* Slippage */}
              <div className="flex flex-col col-span-2">
                <span className="text-xs text-gray-400">Slippage</span>
                <span className="font-medium text-white">{slippage?.toFixed(4)}%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-6 h-auto shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">BTC Real-time Trading Activity</h3>
      
      {/* Main chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 35 }}>
            <defs>
              <linearGradient id="colorMidPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              stroke="#4B5563"
              height={50}
              tickFormatter={(value) => {
                const parts = value.split(':');
                return `${parts[0]}:${parts[1]}`;
              }}
            >
              <babel value="Time (HH:MM)" position="insideBottom" offset={-15} fill="#9CA3AF" />
            </XAxis>
            
            <YAxis 
              yAxisId="price" 
              domain={calcYAxisDomain()}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              stroke="#4B5563"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              width={80}
            >
              <babel value="Price (USD)" angle={-90} position="insideLeft" fill="#9CA3AF" />
            </YAxis>
            
            <YAxis 
              yAxisId="btc" 
              orientation="right" 
              domain={[0, 'auto']} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              stroke="#4B5563"
              tickFormatter={(value) => value.toFixed(6)}
              width={80}
            >
              <babel value="BTC Amount" angle={90} position="insideRight" fill="#9CA3AF" />
            </YAxis>
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top" 
              wrapperStyle={{ paddingBottom: '20px' }} 
              iconType="circle"
            />
            
            <ReferenceLine 
              yAxisId="price"
              y={chartData.length > 0 ? chartData[chartData.length - 1]?.midPrice : null} 
              stroke="#3B82F6" 
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            />
            
            <Area
              yAxisId="price"
              type="monotone" 
              dataKey="midPrice" 
              name="Mid Price" 
              stroke="#3B82F6" 
              fillOpacity={1}
              fill="url(#colorMidPrice)"
              dot={false} 
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }} 
              isAnimationActive={false}
              strokeWidth={2}
            />
            
            <Line 
              yAxisId="price"
              type="monotone" 
              dataKey="avgPrice" 
              name="Average Price" 
              stroke="#10B981" 
              dot={false} 
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }} 
              isAnimationActive={false}
              strokeWidth={2}
            />
            
            <Line 
              yAxisId="btc"
              type="step" 
              dataKey="btcExecuted" 
              name="BTC Executed" 
              stroke="#F59E0B" 
              dot={false} 
              activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: '#fff' }} 
              isAnimationActive={false}
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;