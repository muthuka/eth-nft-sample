# NFT Sample

This project demonstrates a comprehensive NFT contract and minting process. It includes multiple NFT contracts implemented using OpenZeppelin v5 and supports deployment on modern blockchain networks including Ethereum Sepolia, Polygon, Arbitrum, Optimism, and Base. Built with Hardhat for development, this sample code showcases both ERC-721 & ERC-1155 standards with comprehensive unit testing.

## Setup

You need to create a .env file with the following setup.

```text
# Network RPC URLs
SEPOLIA_API_URL="https://eth-sepolia.g.alchemy.com/v2/REPLACE-API-KEY"
POLYGON_API_URL="https://polygon-mainnet.g.alchemy.com/v2/REPLACE-API-KEY"
ARBITRUM_API_URL="https://arb-mainnet.g.alchemy.com/v2/REPLACE-API-KEY"
OPTIMISM_API_URL="https://opt-mainnet.g.alchemy.com/v2/REPLACE-API-KEY"
BASE_API_URL="https://base-mainnet.g.alchemy.com/v2/REPLACE-API-KEY"

# Alchemy API Key (for Alchemy SDK)
ALCHEMY_API_KEY="REPLACE-API-KEY"

# Wallet Configuration
PRIVATE_KEY="REPLACE-PRIVATE-KEY"
PUBLIC_KEY="REPLACE-PUBLIC-KEY"

# Block Explorer API Keys
ETHERSCAN_API_KEY="YOUR-API-KEY" // From Etherscan
POLYGONSCAN_API_KEY="YOUR-API-KEY" // From PolygonScan
ARBISCAN_API_KEY="YOUR-API-KEY" // From Arbiscan
OPTISCAN_API_KEY="YOUR-API-KEY" // From Optimism
BASESCAN_API_KEY="YOUR-API-KEY" // From BaseScan
```

Once done, the following commands will help you run

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Deploy to different networks
npm run deploy:sepolia
npm run deploy:polygon
npm run deploy:arbitrum
npm run deploy:optimism
npm run deploy:base

# Mint NFTs
node scripts/mint-721.js
node scripts/mint-721s.js

# Transfer ERC-1155 tokens
node scripts/transfer-1155.js

# Verify contracts on block explorers
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
npx hardhat verify --network polygon YOUR_CONTRACT_ADDRESS
```

## Available Scripts

- `npm test` - Run all unit tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run compile` - Compile all contracts
- `npm run deploy` - Deploy to local hardhat network
- `npm run deploy:sepolia` - Deploy to Ethereum Sepolia testnet
- `npm run deploy:polygon` - Deploy to Polygon mainnet
- `npm run deploy:arbitrum` - Deploy to Arbitrum mainnet
- `npm run deploy:optimism` - Deploy to Optimism mainnet
- `npm run deploy:base` - Deploy to Base mainnet

## Contract Overview

This project includes multiple NFT contracts:

### ERC-721 Contracts
- **CLIFTY1**: Basic NFT with 10 token limit
- **CLIFTY2**: NFT with 10,000 token limit  
- **MKNFT2-6**: Various NFT contracts with different limits and features
- **TestNFT1**: Test contract with 100 token limit
- **ThalaMovies**: Movie-themed NFT collection

### ERC-1155 Contract
- **MKNFT7**: Multi-token contract with predefined token types (Gold, Silver, Thor's Hammer, Sword, Shield)

## Features

- ✅ Node.js 24.7.0 support
- ✅ OpenZeppelin v5 compatibility
- ✅ Modern blockchain network support (Sepolia, Polygon, Arbitrum, Optimism, Base)
- ✅ Comprehensive unit testing with coverage
- ✅ Alchemy SDK integration
- ✅ Hardhat development environment
- ✅ Ethers.js v6 support
- ✅ TypeScript-ready configuration

## Requirements

- Node.js >= 24.7.0
- npm or yarn package manager
- Alchemy API key for blockchain interactions
- Private key for deployment and transactions

## Tutorials and Resources

* <https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/>
* <https://ethereum.org/en/developers/tutorials/how-to-mint-an-nft/>
* <https://docs.openzeppelin.com/contracts/5.x/erc721>
* <https://docs.openzeppelin.com/contracts/5.x/erc1155>
* <https://hardhat.org/docs>
* <https://docs.alchemy.com/docs/alchemy-sdk-quickstart>
