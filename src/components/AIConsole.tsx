import React, { useState } from 'react';
import { Brain, Settings, AlertCircle, Play, Pause } from 'lucide-react';

export function AIConsole() {
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isActive, setIsActive] = useState(false);

  const strategies = [
    {
      name: 'Yield Optimizer',
      description: 'Automatically moves funds between lending protocols for best yields',
      apy: '12.5%',
      risk: 'low'
    },
    {
      name: 'Flash Loan Arbitrage',
      description: 'Executes flash loan opportunities across DEXs',
      apy: '25.8%',
      risk: 'high'
    },
    {
      name: 'Liquidity Provider',
      description: 'Provides liquidity to optimal pools based on volume',
      apy: '18.2%',
      risk: 'medium'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-cyan-500" />
                <h2 className="text-xl font-semibold">AI Strategy Control</h2>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isActive ? 'Pause AI' : 'Start AI'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Risk Level
                </label>
                <div className="flex gap-4">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setRiskLevel(level)}
                      className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                        riskLevel === level
                          ? 'bg-cyan-500 text-white'
                          : 'bg-cyan-500/10 text-gray-400 hover:bg-cyan-500/20'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-yellow-500">
                  AI agents will automatically adjust strategies based on market conditions
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">Available Strategies</h3>
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <div key={index} className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{strategy.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      strategy.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                      strategy.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {strategy.risk} risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{strategy.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-400">Expected APY: {strategy.apy}</span>
                    <button className="text-cyan-500 hover:text-cyan-400">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-cyan-500" />
              <h3 className="text-lg font-semibold">Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Gas Price Limit (Gwei)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500"
                  defaultValue={50}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Slippage Tolerance
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500"
                  defaultValue={0.5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Maximum Transaction Size
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500"
                  defaultValue={10}
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
            <div className="space-y-3">
              {[
                'Flash loan executed successfully',
                'Rebalanced yield farming positions',
                'Updated gas price settings',
                'New strategy deployed'
              ].map((log, index) => (
                <div key={index} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}