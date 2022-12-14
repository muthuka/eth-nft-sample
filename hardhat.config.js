/* jshint esversion: 8 */

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const {
    MUMBAI_API_URL,
    ROPSTEN_API_URL,
    GOERLI_API_URL,
    ARBITRUM_API_URL,
    OPTIMISM_API_URL,
    KOVAN_API_URL,
    PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    ARBISCAN_API_KEY,
    OPTISCAN_API_KEY,
} = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "goerli",
    networks: {
        hardhat: {},
        ropsten: {
            url: ROPSTEN_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        goerli: {
            url: GOERLI_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        kovan: {
            url: KOVAN_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        mumbai: {
            url: MUMBAI_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
            gasPrice: 8000000000,
        },
        arbitest: {
            url: ARBITRUM_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
            gasPrice: 8000000000,
        },
        optitest: {
            url: OPTIMISM_API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
            gasPrice: 8000000000,
        },
    },
    etherscan: {
        apiKey: {
            //ethereum
            mainnet: ETHERSCAN_API_KEY,
            ropsten: ETHERSCAN_API_KEY,
            rinkeby: ETHERSCAN_API_KEY,
            goerli: ETHERSCAN_API_KEY,
            kovan: ETHERSCAN_API_KEY,
            // arbitrum
            arbitrumOne: ARBISCAN_API_KEY,
            arbitrumTestnet: ARBISCAN_API_KEY,
            // optimism
            optimisticEthereum: OPTISCAN_API_KEY,
            optimisticGoerli: OPTISCAN_API_KEY,
            //polygon
            polygon: POLYGONSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
};
