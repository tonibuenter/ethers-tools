import { Provider } from 'ethers';

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
