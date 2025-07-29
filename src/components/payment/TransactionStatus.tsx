'use client';

import { useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { formatTransactionHash } from '@/utils/formatters';
import { CHAIN_CONFIGS } from '@/utils/constants';

interface TransactionStatusProps {
  hash: `0x${string}`;
}

export function TransactionStatus({ hash }: TransactionStatusProps) {
  const chainId = useChainId();
  const { data: receipt, isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  const chainConfig = CHAIN_CONFIGS[chainId as keyof typeof CHAIN_CONFIGS];
  const explorerUrl = chainConfig ? `${chainConfig.blockExplorer}/tx/${hash}` : '#';

  const getStatusIcon = () => {
    if (isLoading) {
      return (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      );
    }
    
    if (isSuccess) {
      return (
        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-lg">✓</span>
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-red-600 text-lg">✗</span>
        </div>
      );
    }
    
    return null;
  };

  const getStatusText = () => {
    if (isLoading) return 'Transaction pending...';
    if (isSuccess) return 'Transaction confirmed!';
    if (isError) return 'Transaction failed';
    return 'Unknown status';
  };

  const getStatusColor = () => {
    if (isLoading) return 'text-blue-600';
    if (isSuccess) return 'text-green-600';
    if (isError) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border">
      <div className="flex items-center space-x-4 mb-4">
        {getStatusIcon()}
        <div>
          <h3 className={`text-lg font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </h3>
          <p className="text-sm text-gray-600">
            Transaction Hash: {formatTransactionHash(hash)}
          </p>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status:</span>
          <span className={`font-semibold ${getStatusColor()}`}>
            {isLoading && 'Pending'}
            {isSuccess && 'Success'}
            {isError && 'Failed'}
          </span>
        </div>

        {receipt && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Block Number:</span>
              <span className="font-mono">{receipt.blockNumber.toString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gas Used:</span>
              <span className="font-mono">{receipt.gasUsed.toString()}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Confirmations:</span>
              <span className="font-semibold text-green-600">
                {receipt.status === 'success' ? '✓ Confirmed' : 'Failed'}
              </span>
            </div>
          </>
        )}
      </div>

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
          onClick={() => navigator.clipboard.writeText(hash)}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Copy Hash
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