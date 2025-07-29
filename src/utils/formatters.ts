import { formatUnits, parseUnits } from 'viem';

export function formatTokenAmount(amount: bigint, decimals: number, precision = 4): string {
  const formatted = formatUnits(amount, decimals);
  const num = parseFloat(formatted);
  
  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';
  
  return num.toFixed(precision).replace(/\.?0+$/, '');
}

export function parseTokenAmount(amount: string, decimals: number): bigint {
  try {
    return parseUnits(amount, decimals);
  } catch (error) {
    throw new Error('Invalid amount format');
  }
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTransactionHash(hash: string): string {
  if (!hash) return '';
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export function validateAmount(amount: string): boolean {
  if (!amount || amount === '') return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}