/* jshint esversion: 8 */
require("dotenv").config();

const API_URL = process.env.GOERLI_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

console.log("Connected with", API_URL);

// Let's see the contract ABI json
const contract = require("../artifacts/contracts/CLIFTY2.sol/CLIFTY2.json");
// const contract = require("../artifacts/contracts/MKNFT4.sol/MKNFT4.json")
// console.log(JSON.stringify(contract.abi))

// Let's mint. Before this step, I deployed the main contract and filled it as the address
// npx hardhat --network ropsten run scripts/deploy.js
// const contractAddress = "0x452fc0C02FaaE4c45B6ab7f54dA8cb1F6128Dca0" // For NFT3
// const contractAddress = "0x74Af7b8BfB7836e0BC30545ec25A9401a4071AA5" // For NFT4
// const contractAddress = "0xbdE7230996265CEc10A49658AC8e5E209aB9eABA" // For Ajith Movies
// const contractAddress = "0x30C324E895d80Ce9e379290D7D5751e5cA98c090" // For NFT6
// const contractAddress = "0x1dFa2475AbAac10b611A5015420D72E165F5ede6" // For TestNFT1
// const contractAddress = "0x207c51588faf5Ee476348Fa5b8b5F3Dc05C7B911" // For something
// const contractAddress = "0x829d556Bf20042A236B31b63FF51EfB6433F8674" // For Goerli
// const contractAddress = "0xAFB897d13E703Ac1c458cDb6CB15F96Ee8eA4C02" // New Clifty in Goerli
// const contractAddress = "0xeE79A303d85C4dFbbBbDE5430a72945AF7C30aB2"; // New Clifty 1000+ tokens
const contractAddress = "0x9530A1Cc9B03bc856CA59BF072181e917fB2b6B1"; // New Clifty 1000+ tokens
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function createNFT(to, tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    console.log("Running nonce", nonce);

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(to, tokenURI).encodeABI(),
    };

    const signed = await web3.eth.accounts
        .signTransaction(tx, PRIVATE_KEY)
        .then((signedTx) => signedTx.rawTransaction);
    console.log("Signed with " + signed);

    await web3.eth.sendSignedTransaction(signed, function (err, hash) {
        if (!err) {
            console.log("New hash: " + hash + "\n");
        } else {
            console.log("Error: " + err + "\n");
        }
    });
}

// Let's do it!
// mintNFT("ipfs://QmYHnhJWh9znfFrUZPh7FcC5goDcbUVWUQ6NG6nmZQmEov");
// mintNFT("https://gateway.pinata.cloud/ipfs/QmbT9ATdHn8L6p9Ajde1LkD2LxTqBoWzP9jAT1Wy6nNzPb");
createNFT(
    "0x5F97421292a4eAa6266677582f849972eCc84a84",
    "https://asset.clifty.io/ipfs/QmdZmax6C6Yg7a2eaCp54Qxz4dbG5xY1ySyPn9hAy4zc7p"
);
