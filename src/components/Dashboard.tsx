import React from 'react';
import { BarChart3, Wallet2, Activity, TrendingUp } from 'lucide-react';
import { useWeb3 } from '../lib/web3/hooks';

export function Dashboard() {
  const { balance } = useWeb3();

  const portfolioStats = [
    {
      label: 'Total Balance',
      value: balance ? `${parseFloat(balance).toFixed(4)} ETH` : '0.0000 ETH',
      icon: <Wallet2 className="w-5 h-5 text-cyan-500" />,
      change: '+12.5%'
    },
    {
      label: 'Active Strategies',
      value: '3',
      icon: <Activity className="w-5 h-5 text-cyan-500" />,
      change: '+2'
    },
    {
      label: 'Total APY',
      value: '24.6%',
      icon: <TrendingUp className="w-5 h-5 text-cyan-500" />,
      change: '+5.2%'
    },
    {
      label: 'AI Performance',
      value: '98.2%',
      icon: <BarChart3 className="w-5 h-5 text-cyan-500" />,
      change: '+1.3%'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                {stat.icon}
              </div>
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
          <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart Component Coming Soon
          </div>
        </div>

        <div className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
          <h2 className="text-xl font-semibold mb-4">Active Strategies</h2>
          <div className="space-y-4">
            {['Yield Farming', 'Flash Loan Arbitrage', 'Treasury Management'].map((strategy, index) => (
              <div key={index} className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{strategy}</span>
                  <span className="text-sm text-green-400">Active</span>
                </div>
                <div className="text-sm text-gray-400">
                  Last executed: 5 minutes ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}