// This file is a sample to create many NFTs on the same contract with a simple
// JSON format
require("dotenv").config()

const API_URL = process.env.ROPSTEN_API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const {
    createAlchemyWeb3
} = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL);

console.log("Connected with", API_URL);

// Let's see the contract ABI json
const contract = require("../artifacts/contracts/ThalaMovies.sol/ThalaMovies.json")
// console.log(JSON.stringify(contract.abi))

// Let's mint. Before this step, I deployed the main contract and filled it as the address
// npx hardhat --network ropsten run scripts/deploy.js
const contractAddress = "0x9c3cc59426537726bCB9278B0bCcC24bFA271441" // For Ajith Movies
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 5000000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signed = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
        .then((signedTx) => signedTx.rawTransaction);
    // console.log("Signed with " + signed);

    await web3.eth.sendSignedTransaction(signed,
        function (err, hash) {
            if (!err) {
                console.log("New hash: " + hash + "\n");
            } else {
                console.log("Error: " + err + "\n");
            }
        }
    );
}

// Let's do it!
async function main() {

    const fs = require('fs');
    let rawdata = fs.readFileSync('./ThalaMovies.json');
    let movies = JSON.parse(rawdata);

    const forLoop = async _ => {
        console.log('Start')

        for (let index = 0; index < movies.length; index++) {
            // Get num of each fruit
            console.log(index + ". Minting " + movies[index]["name"] + " with " + movies[index]["jsonHash"]);
            await mintNFT("https://gateway.pinata.cloud/ipfs/" + movies[index]["jsonHash"]);
        }

        console.log('End')
    }

    await forLoop();
}

main();