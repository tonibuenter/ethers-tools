import { ContractFactory, formatEther, InfuraProvider, Wallet } from 'ethers';
import { isError } from './utils-shared';
import 'dotenv/config';
import fs from 'fs';
import { getBalances } from './utils';

const network = process.env.ETHEREUM_NETWORK;
const projectId = process.env.INFURA_PROJECT_ID;

const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;

console.log(`Deploy Demo.sol contract...\nowner : ${address}`);

async function deployDemoContract() {
  try {
    const { abi, bytecode } = JSON.parse(fs.readFileSync('./contracts/Demo.json').toString('utf-8'));

    // Configuring the connection to an Ethereum node
    const provider = new InfuraProvider(network, projectId);

    const balancesBefore = await getBalances(provider, [address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    const factory = new ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy();
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${contract.deploymentTransaction().hash}`);
    // Waiting for the transaction to be mined
    const receipt = await contract.waitForDeployment();
    // The contract is now deployed on chain!
    const contractAddress = await contract.getAddress();
    console.log(`Contract deployed at ${contractAddress}`);
    console.log(`You can update DEMO_CONTRACT in .env to use the new contract address`);

    // The transaction is now on chain!

    const balancesAfter = await getBalances(provider, [address]);

    const fee = balancesBefore[0].wei - balancesAfter[0].wei;
    console.log(`gas price WEI : ${receipt.deploymentTransaction().gasPrice}`);
    console.log(`hash          : ${receipt.deploymentTransaction().hash}`);
    console.log(`provider      : ${receipt.deploymentTransaction().provider}`);
    console.log(`fee difference by account WEI: ${fee}`);
    console.log(`fee difference by account ETH: ${formatEther(fee)}`);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

deployDemoContract();
