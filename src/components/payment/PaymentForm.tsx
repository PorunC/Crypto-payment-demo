
import { useState } from 'react';
import { useChainId } from 'wagmi';
import { TokenSelector } from './TokenSelector';
import { TransactionStatus } from './TransactionStatus';
import { validateAddress, validateAmount } from '@/utils/formatters';
import { CreditCard, ArrowRight, Coins, Copy, Check } from 'lucide-react';
import type { PaymentState } from '@/types/payment.types';

interface PaymentFormProps {
  paymentHook: {
    paymentState: PaymentState;
    updatePaymentState: (updates: Partial<PaymentState>) => void;
    sendPayment: () => void;
    resetPayment: () => void;
    hash: `0x${string}` | undefined;
    isPending: boolean;
    isConfirmed: boolean;
    error: string | null;
  };
}

export function PaymentForm({ paymentHook }: PaymentFormProps) {
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
  } = paymentHook;

  const [showTokenSelector, setShowTokenSelector] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const isValidPayment = paymentState.selectedToken && 
                        validateAmount(paymentState.amount) && 
                        validateAddress(paymentState.recipient);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止触发地址切换
    try {
      await navigator.clipboard.writeText(paymentState.recipient);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后重置状态
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  if (hash && (isPending || isConfirmed)) {
    return (
      <div className="space-y-4">
        <TransactionStatus hash={hash} />
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-semibold"
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl shadow-md">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            Send Payment
          </h3>
        </div>

        {/* Token Selection Section */}
        <div className="bg-gradient-to-br from-muted/30 to-slate-50/30 rounded-xl p-4 border border-border/30">
          <h4 className="font-semibold text-base text-foreground mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Coins className="h-4 w-4 text-primary" />
            </div>
            Select Token
          </h4>
          <button
            onClick={() => setShowTokenSelector(true)}
            className="w-full p-3 text-left bg-card/70 border border-border/50 rounded-xl hover:bg-card/90 transition-colors"
          >
            {paymentState.selectedToken ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">
                    {paymentState.selectedToken.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">{paymentState.selectedToken.symbol}</span>
                  <span className="text-muted-foreground ml-2">{paymentState.selectedToken.name}</span>
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground">Choose a token to send</span>
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

        {/* Amount Input Section */}
        <div className="bg-gradient-to-br from-muted/30 to-slate-50/30 rounded-xl p-4 border border-border/30">
          <label className="block text-sm font-semibold text-foreground mb-3">
            Amount
          </label>
          <input
            type="number"
            value={paymentState.amount}
            onChange={(e) => updatePaymentState({ amount: e.target.value })}
            placeholder="0.0"
            className="w-full p-3 bg-card/70 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors text-foreground placeholder:text-muted-foreground"
            step="any"
            min="0"
          />
          {paymentState.amount && !validateAmount(paymentState.amount) && (
            <p className="text-destructive text-sm mt-2">Please enter a valid amount</p>
          )}
        </div>

        {/* Payment Summary */}
        {isValidPayment && (
          <div className="bg-gradient-to-br from-primary/5 to-blue-50/50 rounded-xl p-4 border border-primary/20">
            <h4 className="font-semibold text-foreground mb-3">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center bg-card/50 rounded-lg p-3">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-semibold text-foreground">{paymentState.amount} {paymentState.selectedToken.symbol}</span>
              </div>
              <div className="flex justify-between items-center bg-card/50 rounded-lg p-3">
                <span className="text-muted-foreground">To:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFullAddress(!showFullAddress)}
                    className="font-mono text-foreground hover:text-primary transition-colors px-1 py-0.5 rounded text-left break-all"
                    title="Click to toggle full address"
                  >
                    {showFullAddress 
                      ? paymentState.recipient 
                      : `${paymentState.recipient.slice(0, 10)}...${paymentState.recipient.slice(-6)}`
                    }
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 hover:bg-primary/10 rounded transition-colors flex-shrink-0"
                    title={copied ? "Copied!" : "Copy address"}
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground hover:text-primary" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={sendPayment}
          disabled={isPending || !isValidPayment}
          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              Send Payment
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}