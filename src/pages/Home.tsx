import { WalletConnection } from '@/components/wallet/WalletConnection';
import { AccountInfo } from '@/components/wallet/AccountInfo';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { useAccount } from 'wagmi';

export function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-lg flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">₿</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Crypto Payment
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Send cryptocurrency payments securely using RainbowKit & Vite
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
              <PaymentForm />
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <div className="space-y-3">
            <div className="flex justify-center items-center space-x-6">
              <a href="https://rainbowkit.com" className="text-primary hover:text-primary/80 transition-colors font-medium">
                RainbowKit
              </a>
              <a href="https://wagmi.sh" className="text-primary hover:text-primary/80 transition-colors font-medium">
                wagmi
              </a>
              <a href="https://viem.sh" className="text-primary hover:text-primary/80 transition-colors font-medium">
                viem
              </a>
              <a href="https://vitejs.dev" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Vite
              </a>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 max-w-md mx-auto">
              <p className="text-xs text-warning-foreground">
                ⚠️ Demo Application - Use testnet only. Never send real funds to unknown addresses.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}