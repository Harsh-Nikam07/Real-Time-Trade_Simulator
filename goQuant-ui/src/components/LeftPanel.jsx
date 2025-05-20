import React from "react";

export default function LeftPanel() {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm space-y-4">
      {/* <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">Trade Inputs</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* Exchange */}
        <div className="space-y-2">
          <label className="block text-sm text-zinc-600 dark:text-zinc-300">Exchange</label>
          <select className="w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
            <option>OKX</option>
          </select>
        </div>

        {/* Asset Pair */}
        <div className="space-y-2">
          <label className="block text-sm text-zinc-600 dark:text-zinc-300">Asset Pair</label>
          <select className="w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
            <option>BTC-USDT</option>
          </select>
        </div>

        {/* Order Type */}
        <div className="space-y-2">
          <label className="block text-sm text-zinc-600 dark:text-zinc-300">Order Type</label>
          <select className="w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
            <option>Market</option>
          </select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="block text-sm text-zinc-600 dark:text-zinc-300">Quantity (USD)</label>
          <input
            type="number"
            defaultValue={100}
            className="w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
          />
        </div>

        {/* Fee Tier */}
        <div className="space-y-2">
          <label className="block text-sm text-zinc-600 dark:text-zinc-300">Fee Tier</label>
          <select className="w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
            <option>Tier 1 (0.1%)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
