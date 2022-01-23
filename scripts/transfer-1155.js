// A sample transfer of ERC-1155 items to an address
// If the token is non-fungible, send 1 in the count parameter

require("dotenv").config()

const API_URL = process.env.ROPSTEN_API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL);

console.log("Connected with", API_URL);

// Let's see the contract ABI json
const contract = require("../artifacts/contracts/MKNFT7.sol/MKNFT7.json")
// console.log(JSON.stringify(contract.abi))

// Let's mint. Before this step, I deployed the main contract and filled it as the address
// npx hardhat --network ropsten run scripts/deploy.js
const contractAddress = "0x3cBd6215216A3B654a6A2F564408435c568086F6" // For MKNFT7
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function transferNFT(toAddress, tokenIndex, count) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.safeTransferFrom(PUBLIC_KEY, toAddress, tokenIndex, count, "0x0").encodeABI()
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
transferNFT("0x08a2C83F6acDB9ffC55A177a8749B7eD8221f74f", 0, 3500);
// transferNFT("0x08a2C83F6acDB9ffC55A177a8749B7eD8221f74f", 2, 1);
