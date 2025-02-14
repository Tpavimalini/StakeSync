import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function RiskMetricsView() {
  const [selectedRisk, setSelectedRisk] = useState('');
  const [expanded, setExpanded] = useState(null);

  const riskStrategies = {
    low: {
      title: 'Low Risk',
      description: 'Focus on staking & lending (Aave, Lido).',
      details: `Conservative Strategy (Low Risk) – "Fixed-Income & Treasury Management"
      🔹 Goal: Capital preservation & stable yield
      🔹 Inspired by: Bond laddering, money market funds, dividend investing
      ✅ Stablecoin Lending & Staking → Use Aave, Compound, Lido
      ✅ Yield Farming in Low-Volatility Pools → Blue-chip pairs on Balancer/Curve
      ✅ Risk Management: AI agents monitor liquidation risk & optimize collateral ratios
      ✅ Auto-Rebalancing: Maintain a fixed stablecoin allocation (USDC, DAI, USDT)

      Example Portfolio Allocation:
      60% → Lending (Aave USDC/DAI) for stable interest
      30% → Liquid Staking (Lido stETH, Rocket Pool ETH)
      10% → Curve/Balancer Low-Volatility Pools (USDC-DAI, ETH-stETH)`,
    },
    medium: {
      title: 'Medium Risk',
      description: 'Diversify across lending, staking, and low-risk LP pools.',
      details: `Moderate Strategy (Medium Risk) – "60/40 Portfolio & Smart Beta"
      🔹 Goal: Balance growth and stability
      🔹 Inspired by: 60/40 equity-bond split, factor investing
      ✅ Stable Yield + Growth Allocation → Split between lending/staking and yield farming
      ✅ Smart Beta Exposure → AI identifies high-performing assets based on historical APY & volatility
      ✅ Auto-Rebalancing: Adjust portfolio weightings based on market conditions

      Example Portfolio Allocation:
      40% → Lending (Aave USDC, Compound DAI)
      30% → Staking (Lido stETH, Rocket Pool ETH)
      20% → Yield farming in medium-risk liquidity pools (ETH-DAI Uniswap V3)
      10% → Riskier LP positions (Balancer, Convex Finance)`,
    },
    high: {
      title: 'High Risk',
      description: 'Include flash loans, arbitrage, and high-yield LPs (Uniswap, Curve).',
      details: `Aggressive Strategy (High Risk) – "Hedge Fund Style Arbitrage & High-Yield"
      🔹 Goal: Maximize return using leverage & arbitrage
      🔹 Inspired by: Hedge fund long-short strategies, structured derivatives
      ✅ Leveraged Lending & Yield Farming → Borrow funds at low rates, deploy into high-APY opportunities
      ✅ Flash Loans & Arbitrage → AI agents detect price inefficiencies across DEXs
      ✅ Dynamic Asset Rotation: AI shifts funds based on real-time APY, slippage, and liquidation risk
      ✅ MEV Optimization: Protect against frontrunning with Flashbots

      Example Portfolio Allocation:
      30% → Leveraged Yield Farming (Aave ETH borrow → LP in Curve/Uniswap)
      30% → High-Risk LP Pools (GMX, Sushi, Balancer)
      20% → Flash Loans & Arbitrage Opportunities
      20% → Options/Perps Trading (GMX, Lyra, Synthetix)`,
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Risk Metrics & Strategies</h2>
      <div className="flex space-x-4 mb-6">
        {Object.keys(riskStrategies).map((risk) => (
          <button
            key={risk}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              selectedRisk === risk ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setSelectedRisk(risk)}
          >
            {riskStrategies[risk].title}
          </button>
        ))}
      </div>
      {selectedRisk && (
        <div className="bg-[#232836] rounded-xl p-6 text-gray-400">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setExpanded(expanded === selectedRisk ? null : selectedRisk)}
          >
            <p className="text-lg font-bold text-white">{riskStrategies[selectedRisk].description}</p>
            {expanded === selectedRisk ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
          </div>
          {expanded === selectedRisk && <p className="mt-4 whitespace-pre-wrap">{riskStrategies[selectedRisk].details}</p>}
        </div>
      )}
    </div>
  );
}
