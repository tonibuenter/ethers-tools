import { ethers, Mnemonic } from 'ethers';

const mnemonicPhrase = 'liquid step trophy evidence move fitness replace ahead tool average proud quick';
const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
console.log('address', wallet.address);
console.log('privateKey', wallet.privateKey);
