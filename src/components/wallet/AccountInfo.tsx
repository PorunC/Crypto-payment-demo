'use client';

import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { formatAddress, formatTokenAmount } from '@/utils/formatters';

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  if (!isConnected || !address) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border">
      <div className="flex flex-col">
        <div className="text-sm text-gray-600">Connected as:</div>
        <div className="font-mono text-sm font-semibold">
          {formatAddress(address)}
        </div>
        {balance && (
          <div className="text-sm text-gray-600">
            {formatTokenAmount(balance.value, balance.decimals, 4)} {balance.symbol}
          </div>
        )}
      </div>
      
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
}