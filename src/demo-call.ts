import { Contract, formatEther, Wallet } from 'ethers';
import { isError } from './utils-shared';
import 'dotenv/config';
import fs from 'fs';
import { getBalances, newInfuraProvider } from './utils';
import * as process from 'process';

const network = process.env.ETHEREUM_NETWORK;

const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;
const demoContractAddress = process.env.DEMO_CONTRACT_ADDRESS;

console.log(`Deploy Demo.sol contract...\nowner : ${address}`);

async function callDemoContract() {
  try {
    const { abi } = JSON.parse(fs.readFileSync('./contracts/Demo.json').toString('utf-8'));

    // Configuring the connection to an Ethereum node
    const provider = newInfuraProvider();

    const balancesBefore = await getBalances(provider, [address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    const contract = new Contract(demoContractAddress, abi, signer);
    // Issuing a transaction that calls the `echo` method
    const tx = await contract.echo('Hello, world!');
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);

    const balancesAfter = await getBalances(provider, [address]);

    const fee = balancesBefore[0].wei - balancesAfter[0].wei;
    console.log(`gas price         WEI: ${receipt.gasPrice}`);
    console.log(`gas used          WEI: ${receipt.gasUsed}`);
    console.log(`cumulativeGasUsed WEI: ${receipt.cumulativeGasUsed}`);
    console.log(`fee difference by account WEI: ${fee}`);
    console.log(`fee difference by account ETH: ${formatEther(fee)}`);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

callDemoContract();
