import { InfuraProvider, Provider } from 'ethers';
import * as process from 'process';
import 'dotenv/config';

const network = process.env.ETHEREUM_NETWORK;
const projectId = process.env.INFURA_PROJECT_ID;

export interface Balance {
  address: string;
  wei: bigint;
}

export async function getBalances(provider: Provider, addresses: string[]): Promise<Balance[]> {
  const balances: Balance[] = [];
  for (const address of addresses) {
    const wei = await provider.getBalance(address);
    balances.push({ address, wei });
  }
  return balances;
}

export function newInfuraProvider() {
  console.debug('newInfuraProvider', { network, projectId });
  return new InfuraProvider(network, projectId);
}
