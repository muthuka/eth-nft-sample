# NFT Sample

This project demonstrates a basic NFT contract and minting process. It involves a simple contract implemented using Open Zeppelin and also minting it from a Ethereum Goerli or Polygon Mumbai network. I used the tutorials to create this and also hardhat for development. This sample code showcases both ERC-721 & ERC-1155.

## Setup

You need to create a .env file with the following setup.

```text
GOERLI_API_URL="https://eth-goerli.alchemyapi.io/v2/REPLACE-API-KEY"
MUMBAI_API_URL="https://polygon-mumbai.g.alchemy.com/v2/REPLACE-API-KEY"
ARBITRUM_API_URL="https://arb-rinkeby.g.alchemy.com/v2/REPLACE-API-KEY"
OPTIMISM_API_URL="https://opt-kovan.g.alchemy.com/v2/REPLACE-API-KEY"

PRIVATE_KEY="REPLACE-PRIVATE-KEY"
PUBLIC_KEY="REPLACE-PUBLIC-KEY"

ETHERSCAN_API_KEY="YOUR-API-KEY" // From Etherscan
POLYGONSCAN_API_KEY="YOUR-API-KEY" // From Polyscan
ARBISCAN_API_KEY="YOUR-API-KEY" // From Arbiscan
OPTISCAN_API_KEY="YOUR-API-KEY" // From Optimism
```

Once done, the following commands will help you run

```bash
npm install
npx hardhat compile
npx hardhat --network mumbai run scripts/deploy.js
node scripts/mint-721.js -- To mint a new NFT on the specified contract
node scripts/transfer-1155.js - To transfer any item in a ERC-1155 contract
npx hardhat verify --network goerli YOUR_CONTRACT_ADDRESS
```

The last command helps you to submit the flattened contract to Etherscan for future ABI extract features.

Based on the network chosen, please make sure that the code points to the right API_URL in mint-nft.js

```js
const API_URL = process.env.GOERLI_API_URL
```

## Tutorials used

* <https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/>
* <https://ethereum.org/en/developers/tutorials/how-to-mint-an-nft/>
* <https://ethereum.org/en/developers/tutorials/how-to-view-nft-in-metamask/>
* <https://docs.openzeppelin.com/contracts/4.x/erc721>
* <https://docs.openzeppelin.com/contracts/4.x/erc1155>
* <https://medium.com/geekculture/how-to-programmatically-deploy-and-mint-a-simple-nft-on-the-polygon-blockchain-88e1beede15d>
