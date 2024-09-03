require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infurahol",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    infurahol: {
      url: "https://sepolia.infura.io/v3/887666071b1844899a3865952de8e7bf",
      accounts: [
        "759b047157c23a0e93b3f13fbfdd09de6834a185fe0132714041c146dc3974f1",
      ],
    },
  },
  solidity: "0.8.20",
};
