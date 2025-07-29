
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { formatTokenAmount } from '@/utils/formatters';
import { Wallet } from 'lucide-react';
import { CustomConnectButton } from '@/components/ui/CustomConnectButton';

export function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  if (!isConnected) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg">
        <div className="text-center space-y-6 py-12 px-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-lg flex items-center justify-center">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-foreground">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Connect your Web3 wallet to proceed with cryptocurrency payments
            </p>
          </div>
          <div className="flex justify-center pt-4">
            <CustomConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl shadow-md">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          Wallet Connected
        </h3>
        <CustomConnectButton />
      </div>
      
      {address && (
        <div className="bg-gradient-to-br from-muted/30 to-slate-50/30 rounded-xl p-4 border border-border/30">
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-card/70 rounded-lg p-3">
              <span className="text-sm text-muted-foreground">Address</span>
              <span className="font-mono text-sm text-foreground break-all max-w-[200px] truncate">
                {address}
              </span>
            </div>
            
            {balance && (
              <div className="flex justify-between items-center bg-card/70 rounded-lg p-3">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="font-semibold text-foreground">
                  {formatTokenAmount(balance.value, balance.decimals, 4)} {balance.symbol}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}