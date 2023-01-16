const ethers = require("ethers");
require("dotenv").config();

// This attempt does not work; `msg.sender` ends up being my `Winner.sol`
// contract, meaning that contract is now on the winner leader board :P
async function main() {
  // NOTE: since my hardhat project already compiled the contract that was
  // deployed to testnet, I can grab the ABI from here instead of needing to
  // copy it from etherscan.
  // (however, any changes to the `Winner.sol` contract, or if the artifact no
  // longer exists whe this script is called, this won't work)
  let artifacts = await hre.artifacts.readArtifact("Winner");
  const contractABI = artifacts.abi;
  // const contractABI = [...];
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.TESTNET_ALCHEMY_RPC_URL
  );
  let wallet = new ethers.Wallet(
    process.env.TESTNET_WALLET_PRIVATE_KEY,
    provider
  );
  const winnerContract = new ethers.Contract(
    process.env.TESTNET_WINNER_CONTRACT_ADDRESS,
    artifacts.abi,
    // NOTE: wallet here can actually be `provider`, but if we use `provider`,
    // we can only make READ calls to Ethereum; a `wallet` is needed in order to
    // make WRITE calls (signed transactions with a private key).
    wallet
  );

  const owner = await winnerContract.owner();
  console.log("winnerContract owner:", owner);

  console.log("\ncalling winnerContract.win()...");
  await winnerContract.win();
  console.log(
    "Finished! Check the attemptContract etherscan Events tab to see if you're now a Winner in the events:",
    `https://goerli.etherscan.io/address/${process.env.TESTNET_ATTEMPT_CONTRACT_ADDRESS}#events`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
