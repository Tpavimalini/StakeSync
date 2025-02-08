import React from 'react';
import { useWeb3 } from '../lib/web3/hooks';
import { Wallet2 } from 'lucide-react';

export function ConnectWallet() {
  const { isConnected, address, error } = useWeb3();

  if (error) {
    return (
      <div className="text-red-500 flex items-center gap-2">
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
        <Wallet2 className="w-4 h-4 text-cyan-500" />
        <span className="text-sm text-cyan-500">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </div>
    );
  }

  return (
    <button
      className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
      onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}
    >
      <Wallet2 className="w-5 h-5" />
      <span>Connect Wallet</span>
    </button>
  );
}