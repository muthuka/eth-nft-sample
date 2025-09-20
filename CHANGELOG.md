# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-09-20

### 🚀 Major Upgrades
- **Node.js**: Upgraded from v18.12.1 to v24.7.0
- **OpenZeppelin**: Upgraded from v4.8.0 to v5.4.0
- **Hardhat**: Upgraded from v2.12.4 to v2.26.3
- **Ethers.js**: Upgraded from v5.7.2 to v6.15.0
- **Alchemy SDK**: Migrated from deprecated `@alch/alchemy-web3` to `alchemy-sdk` v3.6.3

### 🔧 Breaking Changes
- **Counters Utility**: Removed OpenZeppelin Counters utility (deprecated in v5), replaced with simple uint256 counters
- **Ownable Constructor**: Updated all contracts to pass `msg.sender` as initial owner parameter
- **Solidity Version**: Upgraded from 0.8.17 to 0.8.20
- **Network Support**: Removed deprecated networks (Goerli, Kovan, Mumbai, Rinkeby)

### ✨ New Features
- **Modern Networks**: Added support for Sepolia, Polygon, Arbitrum, Optimism, and Base
- **Comprehensive Testing**: Added unit tests for all contracts with coverage reporting
- **Enhanced Scripts**: Updated all deployment and interaction scripts
- **NPM Scripts**: Added convenient npm scripts for testing, deployment, and coverage

### 🛠️ Technical Improvements
- **Dependency Updates**: All dependencies updated to latest compatible versions
- **Hardhat Configuration**: Updated to use Nomic Foundation packages
- **Error Handling**: Improved error handling and validation
- **Code Quality**: Enhanced code structure and documentation

### 📦 New Dependencies
- `solidity-coverage`: Added for test coverage reporting
- `alchemy-sdk`: Modern Alchemy integration
- `@nomicfoundation/hardhat-ethers`: Updated Hardhat Ethers integration
- `@nomicfoundation/hardhat-verify`: Updated contract verification
- `@nomicfoundation/hardhat-chai-matchers`: Enhanced testing matchers

### 🗑️ Removed Dependencies
- `@alch/alchemy-web3`: Replaced with alchemy-sdk
- `@nomiclabs/hardhat-ethers`: Replaced with @nomicfoundation packages
- `@nomiclabs/hardhat-etherscan`: Replaced with @nomicfoundation packages
- `@nomiclabs/hardhat-waffle`: Replaced with @nomicfoundation packages
- `ethereum-waffle`: No longer needed

### 🧪 Testing
- Added comprehensive unit tests for all NFT contracts
- Implemented test coverage reporting
- Added tests for ERC-721 and ERC-1155 functionality
- Added access control and ownership tests

### 📚 Documentation
- Updated README with current setup instructions
- Added comprehensive contract overview
- Updated network configuration examples
- Added modern tutorial references

## [1.0.0] - 2022-01-09

### Features
* 12/14/22 - Added linter
* 1/9/22 - Added a simple contract for NFT minting
* 1/9/22 - Added support for limited NFT's
