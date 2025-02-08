import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { web3State, safeAccountState } from './store';

export function useWeb3() {
  const [web3StateValue, setWeb3State] = useRecoilState(web3State);
  const [safeAccount, setSafeAccount] = useRecoilState(safeAccountState);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_requestAccounts', []);
          const network = await provider.getNetwork();
          const balance = await provider.getBalance(accounts[0]);

          setWeb3State({
            isConnected: true,
            address: accounts[0],
            chainId: Number(network.chainId),
            balance: ethers.formatEther(balance),
            error: null,
          });
        } catch (error) {
          setWeb3State(prev => ({
            ...prev,
            error: 'Failed to connect wallet',
          }));
        }
      } else {
        setWeb3State(prev => ({
          ...prev,
          error: 'No Web3 wallet detected',
        }));
      }
    };

    return () => {
      // Cleanup
    };
  }, [setWeb3State]);

  return {
    ...web3StateValue,
    safeAccount,
  };
}