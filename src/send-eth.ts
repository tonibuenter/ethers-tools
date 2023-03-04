import { formatEther, parseUnits, Wallet } from 'ethers';
import { isError } from './utils-shared';
import 'dotenv/config';
import { getBalances, newInfuraProvider } from './utils';

const network = process.env.ETHEREUM_NETWORK;

const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;
const x0000Address = process.env.X0000_ADDRESS;
const ethValue = '0.001';
const ethValueWei = parseUnits(ethValue, 'ether');

console.log(`Sending ${ethValue} ETH \nfrom : ${address} \nto   : ${x0000Address} \non network: ${network}`);

async function sendEth() {
  try {
    // Configuring the connection to an Ethereum node
    const provider = newInfuraProvider();

    const balancesBefore = await getBalances(provider, [address, x0000Address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    // Creating and sending the transaction object
    const tx = await signer.sendTransaction({
      to: x0000Address,
      value: ethValueWei
    });
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);

    const balancesAfter = await getBalances(provider, [address, x0000Address]);
    balancesAfter.forEach(({ address, wei }) => console.log(`balance ${address}: ${formatEther(wei)}`));

    const fee = balancesBefore[0].wei - parseUnits(ethValue, 'ether') - balancesAfter[0].wei;
    console.log(`gas price         WEI: ${receipt.gasPrice}`);
    console.log(`gas used          WEI: ${receipt.gasUsed}`);
    console.log(`cumulativeGasUsed WEI: ${receipt.cumulativeGasUsed}`);
    console.log(`fee receipt    WEI: ${receipt.fee}`);
    console.log(`fee difference WEI: ${fee}`);
    console.log(`fee receipt    ETH: ${formatEther(receipt.fee)}`);
    console.log(`fee difference ETH: ${formatEther(fee)}`);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

sendEth();
