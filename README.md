# Crypto Payment Demo

A modern cryptocurrency payment application built with RainbowKit, wagmi, and Vite.

## Features

- 🔗 **Multi-Wallet Support**: Connect with MetaMask, WalletConnect, Coinbase Wallet, and more
- 🌐 **Multi-Chain Support**: Ethereum, Polygon, Optimism, Arbitrum, and Sepolia testnet
- 💰 **Token Payments**: Send ETH, MATIC, USDC, USDT, and other ERC20 tokens
- ⚡ **Real-time Transaction Tracking**: Monitor transaction status with detailed feedback
- 📋 **Interactive Address Display**: Click to toggle between shortened and full address view
- 🎯 **One-Click Copy**: Copy addresses and transaction hashes with visual feedback
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS and smooth animations
- ⚙️ **Environment Configuration**: Configure recipient and default amounts via environment variables
- 🔒 **Security First**: Input validation and error handling

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- Some testnet tokens for testing

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Configure environment variables:
```bash
cp .env.example .env
```
   Edit `.env` file and configure:
   - `VITE_PAYMENT_RECIPIENT_ADDRESS`: The default recipient address for payments
   - `VITE_PAYMENT_DEFAULT_AMOUNT`: The default payment amount

3. Get a WalletConnect Project ID:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a new project
   - Copy your Project ID
   - Update `src/providers.tsx` with your Project ID

4. Start the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Basic Payment Flow

1. **Connect Wallet**: Click "Connect Wallet" and choose your preferred wallet
2. **Select Network**: Choose from supported networks (Ethereum, Polygon, etc.)
3. **Choose Token**: Select which token to send (ETH, MATIC, USDC, etc.)
4. **Configure Amount**: Adjust the payment amount (pre-configured via environment variables)
5. **Verify Recipient**: Check the recipient address (configured via environment variables)
6. **Send Payment**: Confirm the transaction in your wallet
7. **Track Status**: Monitor the transaction progress in real-time

### Interactive Features

#### Address Display & Copy
- **Click Address**: Toggle between shortened (`0x1234...abcd`) and full address display
- **Copy Address**: Click the copy icon to copy the recipient address to clipboard
- **Visual Feedback**: Green checkmark animation confirms successful copy

#### Transaction Hash Copy
- **Copy Hash**: Click "Copy Hash" button on transaction status page
- **Animated Feedback**: Button turns green with pulsing checkmark icon
- **Auto Reset**: Copy status automatically resets after 2 seconds

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

## Environment Variables

The application uses environment variables for payment configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_PAYMENT_RECIPIENT_ADDRESS` | Default recipient address for payments | `0x742d35Cc6564C0532E4a0D4b0A6b1f0a91e1F4c2` |
| `VITE_PAYMENT_DEFAULT_AMOUNT` | Default payment amount | `0.01` |

Copy `.env.example` to `.env` and update the values according to your needs.

## Technology Stack

- **Frontend**: Vite, React, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Web3**: RainbowKit, wagmi, viem
- **State Management**: React hooks and Context API
- **Icons**: Lucide React for consistent iconography
- **Clipboard API**: Modern async clipboard functionality
- **Animations**: CSS transitions and Tailwind animation utilities

## User Experience Highlights

### 🎯 Intuitive Interactions
- **Smart Address Display**: Automatically shows shortened addresses with option to view full
- **Visual Copy Feedback**: Immediate visual confirmation when copying addresses or hashes
- **Smooth Animations**: 200ms transitions for all interactive elements

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets for mobile users
- **Accessible**: Proper ARIA labels and keyboard navigation

### ⚡ Performance Optimized
- **Fast Loading**: Vite build system for optimal bundle size
- **Real-time Updates**: Instant transaction status updates
- **Efficient State**: Minimal re-renders with optimized React hooks

## Deployment

This application can be deployed on any platform that supports Vite applications, such as Vercel, Netlify, or traditional hosting providers.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
