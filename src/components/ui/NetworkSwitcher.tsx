
import { useChainId, useSwitchChain } from 'wagmi';
import { CHAIN_CONFIGS } from '@/utils/constants';
import { Network, CheckCircle } from 'lucide-react';

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  const currentChain = CHAIN_CONFIGS[chainId as keyof typeof CHAIN_CONFIGS];
  
  const supportedChains = Object.entries(CHAIN_CONFIGS).map(([id, config]) => ({
    id: parseInt(id),
    ...config,
  }));

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-foreground flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl shadow-md">
            <Network className="h-5 w-5 text-primary" />
          </div>
          Network
        </h3>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
          <CheckCircle className="w-3 h-3 text-success" />
          <span className="text-sm text-success-foreground font-medium">
            {currentChain?.name || `Chain ${chainId}`}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-br from-muted/30 to-slate-50/30 rounded-xl p-4 border border-border/30">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Switch Network:
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {supportedChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => switchChain({ chainId: chain.id })}
                disabled={isPending || chain.id === chainId}
                className={`p-4 text-left rounded-xl border transition-all ${
                  chain.id === chainId
                    ? 'bg-primary/10 border-primary/30 text-primary shadow-md'
                    : 'bg-card/70 border-border/50 hover:bg-card/90 text-foreground hover:shadow-sm'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{chain.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {chain.nativeCurrency.symbol}
                    </div>
                  </div>
                  {chain.id === chainId && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {isPending && (
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-warning/30 border-t-warning rounded-full animate-spin"></div>
              <p className="text-warning-foreground text-sm">
                Switching network... Please confirm in your wallet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}