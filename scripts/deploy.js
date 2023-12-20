const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const tenderManagementSystem = await ethers.deployContract("TenderManagementSystem");
    const contract_address = await tenderManagementSystem.getAddress()
    console.log("Contract address:",contract_address)
    saveFrontendFiles(deployer.address,contract_address);

  }

   function saveFrontendFiles(deployer_address,contract_address) {
    const fs = require("fs");
    const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      path.join(contractsDir, "contract-address.json"),
      JSON.stringify({ DeployerAddress: deployer_address,TenderManagementSystem: contract_address }, undefined, 2)
    );
  
    const TenderManagementSystemArtifact = artifacts.readArtifactSync("TenderManagementSystem");
  
    fs.writeFileSync(
      path.join(contractsDir, "TenderManagementSystem.json"),
      JSON.stringify(TenderManagementSystemArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });