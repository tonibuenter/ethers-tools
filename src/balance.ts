import { formatEther, isError } from 'ethers';
import 'dotenv/config';
import * as process from 'process';
import { newInfuraProvider } from './utils';

const apiKeySecret = process.env.INFURA_API_KEY_SECRET;

const address = process.env.MAIN_ADDRESS;

console.debug({ apiKeySecret, address });

async function getBalanceUsingJsonRpcProvider() {
  try {
    // Configure the ITX provider using your Infura credentials
    const provider = newInfuraProvider();
    const balance = await provider.getBalance(address);
    console.log(`Current balance ${address}: ` + formatEther(balance));
  } catch (e) {
    console.error(e.code);
    if (isError(e, 'UNKNOWN_ERROR')) {
      console.error(e);
    }
  }
}

Promise.all([getBalanceUsingJsonRpcProvider(), getBalanceUsingInfuraProvider()]);

async function getBalanceUsingInfuraProvider() {
  try {
    // Configure the ITX provider using your Infura credentials
    const provider = newInfuraProvider();
    const balance = await provider.getBalance(address);
    console.log(`Current ITX balance: ` + formatEther(balance));
  } catch (e) {
    console.error(e.code);
    if (isError(e, 'UNKNOWN_ERROR')) {
      console.error(e);
    }
  }
}
