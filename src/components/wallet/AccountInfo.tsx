import { useAccount } from 'wagmi';
import { CustomConnectButton } from '@/components/ui/CustomConnectButton';

export function AccountInfo() {
  const { address, isConnected } = useAccount();

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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Wallet Status
        </h3>
        <CustomConnectButton />
      </div>
    </div>
  );
}