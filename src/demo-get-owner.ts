import { ContractFactory, formatEther } from 'ethers';
import { isError } from './utils-shared';
import 'dotenv/config';
import fs from 'fs';
import { getBalances, newInfuraProvider } from './utils';

const address = process.env.MAIN_ADDRESS;

console.log(`Deploy Demo.sol contract...\nowner : ${address}`);

async function getDemoOwner() {
  try {
    const { abi, bytecode } = JSON.parse(fs.readFileSync('./contracts/Demo.json').toString('utf-8'));

    // Configuring the connection to an Ethereum node
    const provider = newInfuraProvider();

    const balancesBefore = await getBalances(provider, [address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${formatEther(wei)}`));

    // Creating a signing account from a private key

    const contract: ContractFactory = new ContractFactory(abi, bytecode, provider);

    console.log(`contract object`, contract);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

getDemoOwner();
