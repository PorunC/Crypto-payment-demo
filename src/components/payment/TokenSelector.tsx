'use client';

import { useBalance } from 'wagmi';
import { useAccount } from 'wagmi';
import { SUPPORTED_TOKENS } from '@/types/payment.types';
import { formatTokenAmount } from '@/utils/formatters';
import type { Token } from '@/types/payment.types';

interface TokenSelectorProps {
  chainId: number;
  onTokenSelect: (token: Token) => void;
  onClose: () => void;
}

function TokenItem({ token, onSelect }: { token: Token; onSelect: (token: Token) => void }) {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: token.address === '0x0000000000000000000000000000000000000000' 
      ? undefined 
      : token.address as `0x${string}`,
  });

  return (
    <button
      onClick={() => onSelect(token)}
      className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">
              {token.symbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-800">{token.symbol}</div>
            <div className="text-sm text-gray-600">{token.name}</div>
          </div>
        </div>
        
        <div className="text-right">
          {balance && (
            <div className="font-semibold text-gray-800">
              {formatTokenAmount(balance.value, balance.decimals, 6)}
            </div>
          )}
          <div className="text-sm text-gray-600">Balance</div>
        </div>
      </div>
    </button>
  );
}

export function TokenSelector({ chainId, onTokenSelect, onClose }: TokenSelectorProps) {
  const supportedTokens = SUPPORTED_TOKENS[chainId] || [];

  if (supportedTokens.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Select Token</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="text-center py-8 text-gray-500">
            No supported tokens for this network.
            <br />
            Please switch to a supported network.
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Token</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2">
          {supportedTokens.map((token) => (
            <TokenItem
              key={token.address}
              token={token}
              onSelect={(selectedToken) => {
                onTokenSelect(selectedToken);
                onClose();
              }}
            />
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 Your token balances are displayed in real-time. Make sure you have enough balance plus gas fees for the transaction.
          </p>
        </div>
      </div>
    </div>
  );
}