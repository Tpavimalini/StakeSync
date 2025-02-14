import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Wallet, ArrowLeftRight, Settings, Landmark } from 'lucide-react';
import { useWalletStore } from './services/wallet';
import { StakingView } from './views/StakingView';
import { TradingView } from './views/TradingView';
import { LendingView } from './views/LendingView';
import { SettingsView } from './views/SettingsView';

function App() {
  const { isConnected, connect, disconnect, address } = useWalletStore();

  return (
    <Router>
      <div className="min-h-screen bg-[#1a1f2e]">
        <header className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">StakeSync</h1>
              </div>
              
              <div className="flex items-center space-x-6">
                <nav className="flex space-x-4">
                  <Link to="/" className="px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Staking
                  </Link>
                  <Link to="/trading" className="px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowLeftRight className="w-5 h-5 mr-2" />
                    Trading
                  </Link>
                  <Link to="/lending" className="px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center">
                    <Landmark className="w-5 h-5 mr-2" />
                    Lending
                  </Link>
                  <Link to="/settings" className="px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Link>
                </nav>
                
                <button 
                  onClick={isConnected ? disconnect : connect}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {isConnected ? 'Disconnect' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<StakingView />} />
            <Route path="/trading" element={<TradingView />} />
            <Route path="/lending" element={<LendingView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;