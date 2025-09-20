/* jshint esversion: 8 */

require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const {
    SEPOLIA_API_URL,
    POLYGON_API_URL,
    ARBITRUM_API_URL,
    OPTIMISM_API_URL,
    BASE_API_URL,
    PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    ARBISCAN_API_KEY,
    OPTISCAN_API_KEY,
    BASESCAN_API_KEY,
} = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.20",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            loggingEnabled: true,
            verbose: true,
        },
        ...(SEPOLIA_API_URL && PRIVATE_KEY && {
            sepolia: {
                url: SEPOLIA_API_URL,
                accounts: [`0x${PRIVATE_KEY}`],
            },
        }),
        ...(POLYGON_API_URL && PRIVATE_KEY && {
            polygon: {
                url: POLYGON_API_URL,
                accounts: [`0x${PRIVATE_KEY}`],
            },
        }),
        ...(ARBITRUM_API_URL && PRIVATE_KEY && {
            arbitrum: {
                url: ARBITRUM_API_URL,
                accounts: [`0x${PRIVATE_KEY}`],
            },
        }),
        ...(OPTIMISM_API_URL && PRIVATE_KEY && {
            optimism: {
                url: OPTIMISM_API_URL,
                accounts: [`0x${PRIVATE_KEY}`],
            },
        }),
        ...(BASE_API_URL && PRIVATE_KEY && {
            base: {
                url: BASE_API_URL,
                accounts: [`0x${PRIVATE_KEY}`],
            },
        }),
    },
    etherscan: {
        apiKey: {
            //ethereum
            mainnet: ETHERSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY,
            // arbitrum
            arbitrumOne: ARBISCAN_API_KEY,
            arbitrumSepolia: ARBISCAN_API_KEY,
            // optimism
            optimisticEthereum: OPTISCAN_API_KEY,
            optimisticSepolia: OPTISCAN_API_KEY,
            //polygon
            polygon: POLYGONSCAN_API_KEY,
            polygonAmoy: POLYGONSCAN_API_KEY,
            //base
            base: BASESCAN_API_KEY,
            baseSepolia: BASESCAN_API_KEY,
        },
    },
};
