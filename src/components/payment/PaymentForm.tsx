'use client';

import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { usePayment } from '@/hooks/usePayment';
import { TokenSelector } from './TokenSelector';
import { TransactionStatus } from './TransactionStatus';
import { validateAddress, validateAmount } from '@/utils/formatters';

export function PaymentForm() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { 
    paymentState, 
    updatePaymentState, 
    sendPayment, 
    resetPayment,
    hash,
    isPending,
    isConfirmed,
    error 
  } = usePayment();

  const [showTokenSelector, setShowTokenSelector] = useState(false);

  if (!isConnected) {
    return (
      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-800">Please connect your wallet to make payments.</p>
      </div>
    );
  }

  if (hash && (isPending || isConfirmed)) {
    return (
      <div className="space-y-4">
        <TransactionStatus hash={hash} />
        <button
          onClick={resetPayment}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800">Send Payment</h3>

      {/* Token Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Token
        </label>
        <button
          onClick={() => setShowTokenSelector(true)}
          className="w-full p-3 text-left border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          {paymentState.selectedToken ? (
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{paymentState.selectedToken.symbol}</span>
              <span className="text-gray-600">{paymentState.selectedToken.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">Choose a token to send</span>
          )}
        </button>

        {showTokenSelector && (
          <TokenSelector
            chainId={chainId}
            onTokenSelect={(token) => {
              updatePaymentState({ selectedToken: token });
              setShowTokenSelector(false);
            }}
            onClose={() => setShowTokenSelector(false)}
          />
        )}
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          value={paymentState.amount}
          onChange={(e) => updatePaymentState({ amount: e.target.value })}
          placeholder="0.0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          step="any"
          min="0"
        />
        {paymentState.amount && !validateAmount(paymentState.amount) && (
          <p className="text-red-500 text-sm">Please enter a valid amount</p>
        )}
      </div>

      {/* Recipient Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          type="text"
          value={paymentState.recipient}
          onChange={(e) => updatePaymentState({ recipient: e.target.value })}
          placeholder="0x..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
        />
        {paymentState.recipient && !validateAddress(paymentState.recipient) && (
          <p className="text-red-500 text-sm">Please enter a valid Ethereum address</p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={sendPayment}
        disabled={isPending || !paymentState.selectedToken || !validateAmount(paymentState.amount) || !validateAddress(paymentState.recipient)}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
      >
        {isPending ? 'Sending...' : 'Send Payment'}
      </button>

      {/* Payment Summary */}
      {paymentState.selectedToken && paymentState.amount && validateAmount(paymentState.amount) && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Payment Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span>{paymentState.amount} {paymentState.selectedToken.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span className="font-mono">{paymentState.recipient.slice(0, 10)}...{paymentState.recipient.slice(-6)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}