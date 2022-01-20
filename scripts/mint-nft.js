require("dotenv").config()

const API_URL = process.env.ROPSTEN_API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL);

console.log("Connected with", API_URL);

// Let's see the contract ABI json
const contract = require("../artifacts/contracts/ThalaMovies.sol/ThalaMovies.json")
// const contract = require("../artifacts/contracts/MKNFT4.sol/MKNFT4.json")
// console.log(JSON.stringify(contract.abi))

// Let's mint. Before this step, I deployed the main contract and filled it as the address
// npx hardhat --network ropsten run scripts/deploy.js
// const contractAddress = "0x452fc0C02FaaE4c45B6ab7f54dA8cb1F6128Dca0" // For NFT3
// const contractAddress = "0x74Af7b8BfB7836e0BC30545ec25A9401a4071AA5" // For NFT4
const contractAddress = "0xbdE7230996265CEc10A49658AC8e5E209aB9eABA" // For Ajith Movies
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    console.log("Signed transaction");
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}

// Let's do it!
mintNFT("https://gateway.pinata.cloud/ipfs/QmbT9ATdHn8L6p9Ajde1LkD2LxTqBoWzP9jAT1Wy6nNzPb");
