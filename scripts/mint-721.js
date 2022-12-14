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
// console.log(JSON.stringify(contract.abi))

// Let's mint. Before this step, I deployed the main contract and filled it as the address
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
