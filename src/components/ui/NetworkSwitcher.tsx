'use client';

import { useChainId, useSwitchChain } from 'wagmi';
import { CHAIN_CONFIGS } from '@/utils/constants';

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  const currentChain = CHAIN_CONFIGS[chainId as keyof typeof CHAIN_CONFIGS];
  
  const supportedChains = Object.entries(CHAIN_CONFIGS).map(([id, config]) => ({
    id: parseInt(id),
    ...config,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Network</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">
            {currentChain?.name || `Chain ${chainId}`}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-600 mb-2">
          Switch Network:
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {supportedChains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => switchChain({ chainId: chain.id })}
              disabled={isPending || chain.id === chainId}
              className={`p-3 text-left rounded-lg border transition-colors ${
                chain.id === chainId
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
              } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="font-medium">{chain.name}</div>
              <div className="text-sm text-gray-500">
                {chain.nativeCurrency.symbol}
              </div>
            </button>
          ))}
        </div>

        {isPending && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
            Switching network... Please confirm in your wallet.
          </div>
        )}
      </div>
    </div>
  );
}