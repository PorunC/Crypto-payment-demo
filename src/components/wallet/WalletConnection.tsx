'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { formatTokenAmount } from '@/utils/formatters';

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">Connect Your Wallet</h2>
      <ConnectButton />
      
      {isConnected && address && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full max-w-md">
          <div className="text-sm text-gray-600">Connected Address:</div>
          <div className="font-mono text-sm text-gray-800 break-all">
            {address}
          </div>
          
          {balance && (
            <div className="mt-2">
              <div className="text-sm text-gray-600">Balance:</div>
              <div className="font-semibold text-gray-800">
                {formatTokenAmount(balance.value, balance.decimals)} {balance.symbol}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}