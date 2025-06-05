const hre = require("hardhat");

async function main() {
  const TodoList = await hre.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  // For ethers v6: use waitForDeployment and getAddress
  await todoList.waitForDeployment();

  const deployedAddress = await todoList.getAddress();
  console.log("TodoList deployed to:", deployedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
