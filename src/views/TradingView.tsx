import React from 'react';
import { useTradingStore } from '../services/trading';

export function TradingView() {
  const { 
    price, volume24h, marketCap, stakingAPY,
    totalValueLocked, totalUsers, riskLevel
  } = useTradingStore();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="bg-[#232836] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 mb-1">Total P&L</p>
              <p className="text-2xl font-bold text-red-500">$-814.67</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-blue-400">33.3%</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Sharpe Ratio</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Max Drawdown</p>
              <p className="text-2xl font-bold text-red-500">0%</p>
            </div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="bg-[#232836] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Risk Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 mb-1">Value at Risk (95%)</p>
              <p className="text-2xl font-bold text-white">$26.54</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Exposure</p>
              <p className="text-2xl font-bold text-white">0.1%</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Leverage Ratio</p>
              <p className="text-2xl font-bold text-green-400">0.00x</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Positions */}
      <div className="bg-[#232836] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Current Positions</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-left">
                  <th className="pb-4">Symbol</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Avg Price</th>
                  <th className="pb-4">Current Price</th>
                  <th className="pb-4">P&L</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-white">
                  <td className="py-2">BTC</td>
                  <td className="py-2">0.0201</td>
                  <td className="py-2">$83,426.11</td>
                  <td className="py-2">$40,102.05</td>
                  <td className="py-2 text-red-500">$-871.4</td>
                  <td className="py-2">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Buy
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-[#232836] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Recent Trades</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-left">
                  <th className="pb-4">Symbol</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-white">
                  <td className="py-2">BTC</td>
                  <td className="py-2 text-red-500">SELL</td>
                  <td className="py-2">0.021</td>
                  <td className="py-2">$41,063.04</td>
                  <td className="py-2 text-green-400">EXECUTED</td>
                </tr>
                <tr className="text-white">
                  <td className="py-2">BTC</td>
                  <td className="py-2 text-green-500">BUY</td>
                  <td className="py-2">0.022</td>
                  <td className="py-2">$40,675.15</td>
                  <td className="py-2 text-green-400">EXECUTED</td>
                </tr>
                <tr className="text-white">
                  <td className="py-2">BTC</td>
                  <td className="py-2 text-green-500">BUY</td>
                  <td className="py-2">0.0192</td>
                  <td className="py-2">$40,920.45</td>
                  <td className="py-2 text-green-400">EXECUTED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}