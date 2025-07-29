import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
  WalletList,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  sepolia,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { metaMaskWallet, okxWallet, walletConnectWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';

import '@rainbow-me/rainbowkit/styles.css';

const wallets: WalletList = [
  {
    groupName: "Popular Wallets",
    wallets: [metaMaskWallet, okxWallet, walletConnectWallet, coinbaseWallet],
  },
];

const chains = [mainnet, polygon, optimism, arbitrum, sepolia] as const;

const config = getDefaultConfig({
  appName: 'Crypto Payment Demo',
  projectId: 'YOUR_PROJECT_ID',
  chains,
  wallets,
  ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#3b82f6',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          initialChain={sepolia}
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}