/* jshint esversion: 8 */

require("dotenv").config();

const API_URL = process.env.GOERLI_API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

console.log("Connected with", API_URL);

// Let's see the contract ABI json
const contract = require("../artifacts/contracts/CLIFTY1.sol/CLIFTY1.json");
const contractAddress = "0xB0d92840E3cD95b68c6017c9acD9fE9D77f7258c";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signed = await web3.eth.accounts
        .signTransaction(tx, PRIVATE_KEY)
        .then((signedTx) => signedTx.rawTransaction);
    // console.log("Signed with " + signed);

    await web3.eth.sendSignedTransaction(signed, function (err, hash) {
        if (!err) {
            console.log("New hash: " + hash + "\n");
        } else {
            console.log("Error: " + err + "\n");
        }
    });
}

// Let's do it!
mintNFT("ipfs://QmVDxSG1tqEPQtxbVV8Crb6eUFSAJoZZAZoG6VGbtaunoJ");
