/* jshint esversion: 8 */
require("dotenv").config();

const API_URL = process.env.MUMBAI_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

console.log("Connected with", API_URL);

// Let's see the contract ABI json
const contract = require("../artifacts/contracts/CLIFTY3.sol/CLIFTY3.json");
// console.log(JSON.stringify(contract.abi))

// Let's mint. Before this step, I deployed the main contract and filled it as the address
const contractAddress = "0xC7CC67bbF050Da535253065fc7317c2648098f13"; // New Clifty 1000+ tokens
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function createNFT(to, tokenURI, no) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    console.log("Running nonce", nonce);

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(to, tokenURI, no).encodeABI(),
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
    "ipfs://QmQZdtmjjfDxj4ZypYwFu2FAjCxHjjmRWwnvix6if9HrMU",
    1
);
