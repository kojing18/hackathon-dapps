require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/_wmaC0n2WZSKU-vJ-VF_cFkHdumjkvwV",
      //metamasukアカウント
      accounts: [""],
    },
  },
};
