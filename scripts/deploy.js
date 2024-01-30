const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.deployContract("chai");

  await chai.waitForDeployment();

  console.log(
    `Contracted deployed to ${chai.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3