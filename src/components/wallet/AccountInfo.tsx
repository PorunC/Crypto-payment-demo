import { useAccount, useBalance } from 'wagmi';
import { formatAddress, formatTokenAmount } from '@/utils/formatters';
import { CustomConnectButton } from '@/components/ui/CustomConnectButton';

export function AccountInfo() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  if (!isConnected || !address) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-6">
        <div className="flex justify-center">
          <CustomConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Wallet Status
        </h3>
        <CustomConnectButton />
      </div>
      
      {balance && (
        <div className="bg-gradient-to-br from-muted/30 to-slate-50/30 rounded-xl p-4 border border-border/30">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="font-semibold text-foreground">
              {formatTokenAmount(balance.value, balance.decimals, 4)} {balance.symbol}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}