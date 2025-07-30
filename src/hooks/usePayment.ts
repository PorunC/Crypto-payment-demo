
import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSendTransaction } from 'wagmi';
import { parseUnits } from 'viem';
import { ERC20_ABI } from '@/utils/constants';
import { validateAmount, validateAddress } from '@/utils/formatters';
import type { Token, PaymentState } from '@/types/payment.types';

export function usePayment() {
  const { address } = useAccount();
  const { writeContract, data: contractHash, error: contractError, isPending: contractPending } = useWriteContract();
  const { sendTransaction, data: ethHash, error: ethError, isPending: ethPending } = useSendTransaction();
  
  const hash = contractHash || ethHash;
  const error = contractError || ethError;
  const isPending = contractPending || ethPending;
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [paymentState, setPaymentState] = useState<PaymentState>({
    amount: import.meta.env.VITE_PAYMENT_DEFAULT_AMOUNT || '',
    recipient: import.meta.env.VITE_PAYMENT_RECIPIENT_ADDRESS || '',
    selectedToken: null,
  });

  const updatePaymentState = (updates: Partial<PaymentState>) => {
    setPaymentState(prev => ({ ...prev, ...updates }));
  };

  const validatePayment = (): string | null => {
    if (!address) return 'Please connect your wallet';
    if (!paymentState.selectedToken) return 'Please select a token';
    if (!validateAmount(paymentState.amount)) return 'Please enter a valid amount';
    if (!validateAddress(paymentState.recipient)) return 'Please enter a valid recipient address';
    return null;
  };

  const sendPayment = async () => {
    const validationError = validatePayment();
    if (validationError) {
      updatePaymentState({ error: validationError });
      return;
    }

    const { amount, recipient, selectedToken } = paymentState;
    
    try {
      updatePaymentState({ error: null });

      if (selectedToken!.address === '0x0000000000000000000000000000000000000000') {
        // Native token transfer (ETH, MATIC, etc.)
        await sendTransaction({
          to: recipient as `0x${string}`,
          value: parseUnits(amount, selectedToken!.decimals),
        });
      } else {
        // ERC20 token transfer
        await writeContract({
          address: selectedToken!.address as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [
            recipient as `0x${string}`,
            parseUnits(amount, selectedToken!.decimals),
          ],
        });
      }
    } catch (err) {
      updatePaymentState({
        error: err instanceof Error ? err.message : 'Transaction failed',
      });
    }
  };

  const resetPayment = () => {
    setPaymentState({
      amount: import.meta.env.VITE_PAYMENT_DEFAULT_AMOUNT || '',
      recipient: import.meta.env.VITE_PAYMENT_RECIPIENT_ADDRESS || '',
      selectedToken: null,
    });
  };

  return {
    paymentState,
    updatePaymentState,
    sendPayment,
    resetPayment,
    hash,
    isPending: isPending || isConfirming,
    isConfirmed,
    error: error?.message,
  };
}