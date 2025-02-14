import React, { useEffect } from 'react';
import { useTradingStore } from '../services/trading';
import { useStakingStore } from '../services/staking';
import { TrendingUp, TrendingDown, ArrowRight, Shield, Zap, BarChart as ChartBar } from 'lucide-react';

export function TradingStats() {
  const { 
    price, volume24h, marketCap, stakingAPY, totalValueLocked, totalUsers,
    riskLevel, updatePrice, updateStakingInfo, setRiskLevel 
  } = useTradingStore();
  const { stakedAmount, isStaking, stakingError, stake, unstake } = useStakingStore();

  useEffect(() => {
    const priceInterval = setInterval(updatePrice, 3000);
    const stakingInterval = setInterval(updateStakingInfo, 10000);
    return () => {
      clearInterval(priceInterval);
      clearInterval(stakingInterval);
    };
  }, [updatePrice, updateStakingInfo]);

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toFixed(2)}`;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'from-red-500 to-orange-500';
      case 'Medium': return 'from-yellow-500 to-green-500';
      case 'Low': return 'from-blue-500 to-green-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#232836] rounded-xl p-6 text-white">
          <h3 className="text-gray-400 mb-2">Total Value Locked</h3>
          <p className="text-3xl font-bold text-blue-400">{formatValue(totalValueLocked)}</p>
        </div>
        <div className="bg-[#232836] rounded-xl p-6 text-white">
          <h3 className="text-gray-400 mb-2">APY</h3>
          <p className="text-3xl font-bold text-blue-400">{stakingAPY}%</p>
        </div>
        <div className="bg-[#232836] rounded-xl p-6 text-white">
          <h3 className="text-gray-400 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-400">{totalUsers}</p>
        </div>
      </div>

      {/* Risk Level Selection */}
      <div className="bg-[#232836] rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Investment Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              onClick={() => setRiskLevel(level as 'High' | 'Medium' | 'Low')}
              className={`p-4 rounded-lg ${
                riskLevel === level 
                  ? `bg-gradient-to-r ${getRiskColor(level)} text-white` 
                  : 'bg-[#1a1f2e] text-gray-400 hover:bg-[#2a2f3e]'
              } transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{level} Risk</span>
                {level === 'High' && <Zap className="w-5 h-5" />}
                {level === 'Medium' && <ChartBar className="w-5 h-5" />}
                {level === 'Low' && <Shield className="w-5 h-5" />}
              </div>
              <p className="text-sm opacity-80">
                {level === 'High' && 'Maximum yield potential with higher risk exposure'}
                {level === 'Medium' && 'Balanced approach with moderate risk and returns'}
                {level === 'Low' && 'Conservative strategy focusing on capital preservation'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Staking Interface */}
      <div className="bg-[#232836] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">Stake Your Tokens</h3>
          <p className="text-gray-400">Earn rewards by staking your tokens</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1a1f2e] rounded-lg p-4">
              <p className="text-gray-400 mb-1">Your Staked Amount</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{stakedAmount.toFixed(2)}</span>
                <span className="text-gray-400">Tokens</span>
              </div>
            </div>
            <div className="bg-[#1a1f2e] rounded-lg p-4">
              <p className="text-gray-400 mb-1">Current APY</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">{stakingAPY}%</span>
                <span className="text-gray-400">Annual Yield</span>
              </div>
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
              onClick={() => stake(100)}
              disabled={isStaking}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
            >
              <span>{isStaking ? 'Staking...' : 'Stake 100 Tokens'}</span>
              {!isStaking && <ArrowRight className="w-4 h-4" />}
            </button>
            <button
              onClick={() => unstake(100)}
              disabled={isStaking || stakedAmount < 100}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-red-500 transition-colors flex items-center justify-center space-x-2"
            >
              <span>{isStaking ? 'Unstaking...' : 'Unstake 100 Tokens'}</span>
              {!isStaking && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#232836] rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Market Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#1a1f2e] rounded-lg">
              <span className="text-gray-400">Price</span>
              <span className="text-white font-medium">${price.toFixed(4)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#1a1f2e] rounded-lg">
              <span className="text-gray-400">24h Volume</span>
              <span className="text-white font-medium">{formatValue(volume24h)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#1a1f2e] rounded-lg">
              <span className="text-gray-400">Market Cap</span>
              <span className="text-white font-medium">{formatValue(marketCap)}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#232836] rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Portfolio Allocation</h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1f2e] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Staking</span>
                <span className="text-white font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-[#1a1f2e] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Lending</span>
                <span className="text-white font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-[#1a1f2e] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Liquidity Pools</span>
                <span className="text-white font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}