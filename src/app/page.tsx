'use client';

import { WalletConnection } from '@/components/wallet/WalletConnection';
import { AccountInfo } from '@/components/wallet/AccountInfo';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { NetworkSwitcher } from '@/components/ui/NetworkSwitcher';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Crypto Payment Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Send cryptocurrency payments using RainbowKit
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Wallet Connection Section */}
          {!isConnected ? (
            <WalletConnection />
          ) : (
            <>
              <AccountInfo />
              <NetworkSwitcher />
              <PaymentForm />
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="space-y-2">
            <p>
              Built with{' '}
              <a href="https://rainbowkit.com" className="text-blue-600 hover:underline">
                RainbowKit
              </a>
              {' '},{' '}
              <a href="https://wagmi.sh" className="text-blue-600 hover:underline">
                wagmi
              </a>
              {' '}and{' '}
              <a href="https://viem.sh" className="text-blue-600 hover:underline">
                viem
              </a>
            </p>
            <p className="text-xs">
              🚨 This is a demo application. Use testnet only. Never send real funds to unknown addresses.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
