# Crypto Payment Demo

A modern cryptocurrency payment application built with RainbowKit, wagmi, and Next.js.

## Features

- 🔗 **Multi-Wallet Support**: Connect with MetaMask, WalletConnect, Coinbase Wallet, and more
- 🌐 **Multi-Chain Support**: Ethereum, Polygon, Optimism, Arbitrum, and Sepolia testnet
- 💰 **Token Payments**: Send ETH, MATIC, USDC, USDT, and other ERC20 tokens
- ⚡ **Real-time Transaction Tracking**: Monitor transaction status with detailed feedback
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔒 **Security First**: Input validation and error handling

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- Some testnet tokens for testing

### Installation

1. Install dependencies:
```bash
npm install
```

2. Get a WalletConnect Project ID:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a new project
   - Copy your Project ID

3. Update the configuration:
   - Open `src/app/providers.tsx`
   - Replace `'YOUR_PROJECT_ID'` with your actual WalletConnect Project ID

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Basic Payment Flow

1. **Connect Wallet**: Click "Connect Wallet" and choose your preferred wallet
2. **Select Network**: Choose from supported networks (Ethereum, Polygon, etc.)
3. **Choose Token**: Select which token to send (ETH, MATIC, USDC, etc.)
4. **Enter Details**: Input the amount and recipient address
5. **Send Payment**: Confirm the transaction in your wallet
6. **Track Status**: Monitor the transaction progress in real-time

### Supported Networks

- **Ethereum Mainnet**: ETH, USDC, USDT
- **Polygon**: MATIC, USDC
- **Optimism**: ETH
- **Arbitrum**: ETH
- **Sepolia Testnet**: ETH (for testing)

### Safety Tips

⚠️ **Important Security Notes:**
- This is a demo application - use testnet only for experimentation
- Never send real funds to unknown addresses
- Always verify recipient addresses before sending
- Start with small amounts when testing

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Web3**: RainbowKit, wagmi, viem
- **State Management**: React hooks and Context API

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
