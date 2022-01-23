# NFT Sample

This project demonstrates a basic NFT contract and minting process. It involves a simple contract implemented using Open Zeppelin and also minting it from a Ropsten network. I used the tutorials to create this and also hardhat for development.

## Setup

You need to create a .env file with the following setup.

```text
ROPSTEN_API_URL="https://eth-ropsten.alchemyapi.io/v2/REPLACE-API-KEY"
PRIVATE_KEY="REPLACE-PRIVATE-KEY"
PUBLIC_KEY="REPLACE-PUBLIC-KEY"
ETHERSCAN_API_KEY="YOUR-API-KEY"
```

Once done, the following commands will help you run

```bash
npm install
npx hardhat compile
npx hardhat --network ropsten run scripts/deploy.js
node scripts/mint-721.js -- To mint a new NFT on the specified contract
npx hardhat verify --network ropsten YOUR_CONTRACT_ADDRESS
```

The last command helps you to submit the flattened contract to Etherscan for future ABI extract features.

Based on the network chosen, please make sure that the code points to the right API_URL in mint-nft.js

```js
const API_URL = process.env.ROPSTEN_API_URL
```

## Tutorials used

* <https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/>
* <https://ethereum.org/en/developers/tutorials/how-to-mint-an-nft/>
* <https://ethereum.org/en/developers/tutorials/how-to-view-nft-in-metamask/>
* <https://docs.openzeppelin.com/contracts/4.x/erc721>
* <https://docs.openzeppelin.com/contracts/4.x/erc1155>
