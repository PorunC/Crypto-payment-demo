
import { useState } from 'react';
import { useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { formatTransactionHash } from '@/utils/formatters';
import { CHAIN_CONFIGS } from '@/utils/constants';
import { Copy, Check } from 'lucide-react';

interface TransactionStatusProps {
  hash: `0x${string}`;
}

export function TransactionStatus({ hash }: TransactionStatusProps) {
  const chainId = useChainId();
  const [hashCopied, setHashCopied] = useState(false);
  
  const { data: receipt, isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  const chainConfig = CHAIN_CONFIGS[chainId as keyof typeof CHAIN_CONFIGS];
  const explorerUrl = chainConfig ? `${chainConfig.blockExplorer}/tx/${hash}` : '#';

  const copyHashToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setHashCopied(true);
      setTimeout(() => setHashCopied(false), 2000); // 2秒后重置状态
    } catch (err) {
      console.error('Failed to copy hash:', err);
    }
  };

  const statusIcon = isLoading ? (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  ) : isSuccess ? (
    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
      <span className="text-green-600 text-lg">✓</span>
    </div>
  ) : isError ? (
    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
      <span className="text-red-600 text-lg">✗</span>
    </div>
  ) : null;

  const statusText = isLoading ? 'Transaction pending...' : isSuccess ? 'Transaction confirmed!' : isError ? 'Transaction failed' : 'Unknown status';
  const statusColor = isLoading ? 'text-blue-600' : isSuccess ? 'text-green-600' : isError ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border">
      <div className="flex items-center space-x-4 mb-4">
        {statusIcon}
        <div>
          <h3 className={`text-lg font-semibold ${statusColor}`}>
            {statusText}
          </h3>
          <p className="text-sm text-gray-600">
            Transaction Hash: {formatTransactionHash(hash)}
          </p>
        </div>
      </div>

      {/* Transaction Details */}
      {receipt && (
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Block Number:</span>
            <span className="font-mono">{receipt.blockNumber.toString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gas Used:</span>
            <span className="font-mono">{receipt.gasUsed.toString()}</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            isLoading ? 'bg-blue-600 w-1/2' : 
            isSuccess ? 'bg-green-600 w-full' : 
            isError ? 'bg-red-600 w-full' : 'bg-gray-300 w-0'
          }`}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center text-sm font-medium"
        >
          View on Explorer
        </a>
        
        <button
          onClick={copyHashToClipboard}
          className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2 ${
            hashCopied 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={hashCopied ? "Copied!" : "Copy hash to clipboard"}
        >
          {hashCopied ? (
            <>
              <Check className="h-4 w-4 animate-pulse" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Hash
            </>
          )}
        </button>
      </div>

      {/* Additional Info */}
      {isLoading && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            ⏳ Your transaction is being processed. This usually takes 1-2 minutes depending on network congestion.
          </p>
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            🎉 Payment sent successfully! The recipient should see the funds in their wallet shortly.
          </p>
        </div>
      )}

      {isError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            ❌ Transaction failed. This could be due to insufficient funds, network issues, or other problems. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}