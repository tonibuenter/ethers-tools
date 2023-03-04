import { formatEther, InfuraProvider, isError, JsonRpcProvider } from 'ethers';
import 'dotenv/config';
import * as process from 'process';

const network = process.env.ETHEREUM_NETWORK;
const projectId = process.env.INFURA_PROJECT_ID;
const apiKeySecret = process.env.INFURA_API_KEY_SECRET;
const infuraUrl = process.env.INFURA_URL;

const address = process.env.MAIN_ADDRESS;

console.debug({ network, projectId, apiKeySecret, address });

async function getBalanceUsingJsonRpcProvider() {
  try {
    // Configure the ITX provider using your Infura credentials
    const itx = new JsonRpcProvider(infuraUrl);
    const balance = await itx.getBalance(address);
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
    const itx = new InfuraProvider(network, projectId);
    const balance = await itx.getBalance(address);
    console.log(`Current ITX balance: ` + formatEther(balance));
  } catch (e) {
    console.error(e.code);
    if (isError(e, 'UNKNOWN_ERROR')) {
      console.error(e);
    }
  }
}
