import React, { useState } from 'react';
import { Shield, Zap, BarChart } from 'lucide-react';
import { useStakingStore } from '../services/staking';
import { useWalletStore } from '../services/wallet';

export function StakingView() {
  const [stakeAmount, setStakeAmount] = useState('0.0');
  const { isConnected } = useWalletStore();
  const { 
    stakedAmount, 
    isStaking, 
    stakingError, 
    transactions,
    stake, 
    unstake 
  } = useStakingStore();

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    stake(amount);
  };

  const handleUnstake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    unstake(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Staking Interface */}
      <div className="bg-[#232836] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Stake Your Tokens</h2>
          <p className="text-gray-400">Earn rewards by staking your tokens</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Amount to Stake</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="flex-1 bg-[#1a1f2e] text-white px-4 py-3 rounded-lg"
                placeholder="0.0"
                disabled={!isConnected || isStaking}
              />
              <button 
                onClick={() => setStakeAmount(stakedAmount.toString())}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30"
              >
                MAX
              </button>
            </div>
          </div>

          {stakingError && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 text-red-400 rounded-lg">
              <p className="flex items-center">
                <span className="mr-2">⚠️</span>
                {stakingError}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleStake}
              disabled={!isConnected || isStaking}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
            >
              {isStaking ? 'Staking...' : 'Stake'}
            </button>
            <button
              onClick={handleUnstake}
              disabled={!isConnected || isStaking || stakedAmount <= 0}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-red-500 transition-colors"
            >
              {isStaking ? 'Unstaking...' : 'Unstake'}
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#232836] p-6 rounded-xl">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Secure Staking</h3>
          <p className="text-gray-400">Your assets are protected by industry-leading security protocols</p>
        </div>

        <div className="bg-[#232836] p-6 rounded-xl">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <BarChart className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Competitive APY</h3>
          <p className="text-gray-400">Earn high yields through our optimized staking strategies</p>
        </div>

        <div className="bg-[#232836] p-6 rounded-xl">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Lock Period</h3>
          <p className="text-gray-400">Flexible staking with no mandatory lock-up period</p>
        </div>
      </div>

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div className="bg-[#232836] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-left">
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.hash} className="text-white">
                      <td className="py-2">
                        <span className={tx.type === 'STAKE' ? 'text-green-400' : 'text-red-400'}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2">{tx.amount}</td>
                      <td className="py-2">
                        <span className={`
                          ${tx.status === 'COMPLETED' ? 'text-green-400' : ''}
                          ${tx.status === 'PENDING' ? 'text-yellow-400' : ''}
                          ${tx.status === 'FAILED' ? 'text-red-400' : ''}
                        `}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-2 text-gray-400">
                        {new Date(tx.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}