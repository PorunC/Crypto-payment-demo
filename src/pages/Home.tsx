import { CustomConnectButton } from '@/components/ui/CustomConnectButton';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { useAccount } from 'wagmi';

export function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CustomConnectButton />
        </div>
        
        {isConnected && (
          <PaymentForm />
        )}
      </div>
    </div>
  );
}