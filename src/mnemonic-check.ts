import { ethers, Mnemonic } from 'ethers';
import * as process from 'process';
import 'dotenv/config';

const mnemonicPhrase = process.env.MAIN_MNEMONIC;
const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;

if (!mnemonicPhrase) {
  console.log('Add MAIN_MNEMONIC to .env');
  process.exit(0);
}
const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
console.log('mnemonic   :', wallet.mnemonic.phrase);
console.log('address    :', wallet.address.toLowerCase());
console.log('privateKey :', wallet.privateKey.toLowerCase());

if (address && privateKey) {
  console.log('address check    :', address.toLowerCase() === wallet.address.toLowerCase());
  console.log('privateKey check :', privateKey.toLowerCase() === wallet.privateKey.toLowerCase());
}
