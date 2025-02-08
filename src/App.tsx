import React from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from './components/Layout';
import { 
  BarChart3, 
  Zap, 
  Network, 
  Wallet2,
  Github,
  FileText,
  MessageCircle
} from 'lucide-react';

function App() {
  const features = [
    {
      title: 'AI-Driven Arbitrage Execution',
      description: 'Automated trading strategies powered by advanced AI algorithms',
      icon: <BarChart3 className="w-6 h-6 text-cyan-500" />
    },
    {
      title: 'Flash Loan Optimization',
      description: 'Maximize returns through intelligent flash loan strategies',
      icon: <Zap className="w-6 h-6 text-cyan-500" />
    },
    {
      title: 'Multi-Agent Liquidity Swarm',
      description: 'Coordinated AI agents working together to optimize your yields',
      icon: <Network className="w-6 h-6 text-cyan-500" />
    },
    {
      title: 'Multi-Chain DeFi Integration',
      description: 'Seamless operations across multiple blockchain networks',
      icon: <Wallet2 className="w-6 h-6 text-cyan-500" />
    }
  ];

  const stats = [
    {
      label: 'Total Funds Managed',
      value: '$142M+',
    },
    {
      label: 'Active AI Agents',
      value: '1,234',
    },
    {
      label: 'Average APY Optimization',
      value: '47%',
    }
  ];

  return (
    <RecoilRoot>
      <Layout>
        {/* Hero Section */}
        <div className="relative overflow-hidden -mt-8">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
          <div className="relative py-20">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-inter mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                StakeSync
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-inter">
                AI-Powered Smart Accounts for DeFi Automation
              </p>
              <p className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
                Optimize yield, execute flash loans, and automate liquidity strategies across multiple chains using AI-driven agents.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-cyan-500/20">
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 py-12 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400">© 2025 StakeSync. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Whitepaper
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 flex items-center gap-2">
                <Github className="w-5 h-5" /> GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Support
              </a>
            </div>
          </div>
        </footer>
      </Layout>
    </RecoilRoot>
  );
}

export default App;