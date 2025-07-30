import { CustomConnectButton } from '@/components/ui/CustomConnectButton';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { useAccount } from 'wagmi';
import { usePayment } from '@/hooks/usePayment';

export function Home() {
  const { isConnected } = useAccount();
  const paymentHook = usePayment();
  const { hash, isPending, isConfirmed } = paymentHook;
  
  // Hide connect button when payment is in progress
  const isPaymentInProgress = hash && (isPending || isConfirmed);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {!isPaymentInProgress && (
          <div className="flex justify-center mb-6">
            <CustomConnectButton />
          </div>
        )}
        
        {isConnected && (
          <PaymentForm paymentHook={paymentHook} />
        )}
      </div>
    </div>
  );
}