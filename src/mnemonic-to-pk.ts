import { ethers, Mnemonic } from 'ethers';
import * as process from 'process';
import 'dotenv/config';

const mnemonicPhrase = process.env.MNEMONIC;

if (!mnemonicPhrase) {
  console.log('Add MNEMONIC to .env');
  process.exit(0);
}
const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
console.log('address:', wallet.address.toLowerCase());
console.log('privateKey:', wallet.privateKey.toLowerCase());
