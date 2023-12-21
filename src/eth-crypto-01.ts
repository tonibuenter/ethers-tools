import {createIdentity, signTransaction} from 'eth-crypto';
import Web3 from 'web3'
import BigNumber from 'bn.js';
import * as ganache from 'ganache'

const identity = createIdentity();

console.dir(identity);
/* > {
    address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
    privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
    publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
} */


const rawTransaction = {
  from: identity.address, // sender address
  to: '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0', // receiver address
  value: new BigNumber('1000000000000000000'), // amount of wei we want to send (= 1 ether)
  nonce: 0, // incremental tx-number. Add +1 for every transaction you do
  gasPrice: 5000000000,
  gasLimit: 21000 // normal gasLimit for code-less transactions
};
const serializedTx = signTransaction(
    rawTransaction,
    identity.privateKey
);
console.log('serializedTx:', serializedTx);



const creatorIdentity = createIdentity();
const recieverIdentity = createIdentity();

// create a web3-instance
const web3 = new Web3('http://'); // set 'http://' because web3 needs a provider
(web3 as any).transactionConfirmationBlocks = 1; // set confirmations-blocks to 1 for fast testing

// create a ganache-provider
const ganacheProvider = ganache.provider({
    accounts: [
        // we preset the balance of our creatorIdentity to 10 ether
        {
            secretKey: creatorIdentity.privateKey,
            balance: web3.utils.toWei('10', 'ether')
        },
        // we also give some wei to the recieverIdentity
        // so it can send transaction to the chain
        {
            secretKey: recieverIdentity.privateKey,
            balance: web3.utils.toWei('1', 'ether')
        }
    ]
});

// set ganache to web3 as provider
web3.setProvider(ganacheProvider);
