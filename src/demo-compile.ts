import fs from 'fs';
import * as process from 'process';

const solc = require('solc');

async function main() {
  console.debug(process.cwd());

  // Load the contract source code
  const sourceCode = await fs.readFileSync('./contracts/Demo.sol', 'utf8');
  // Compile the source code and retrieve the ABI and Bytecode
  const output = compileSol(sourceCode, 'Demo');
  if (output) {
    const { abi, bytecode } = output;
    // Store the ABI and Bytecode into a JSON file
    const artifact = JSON.stringify({ abi, bytecode }, null, 2);
    fs.writeFileSync('./contracts/Demo.json', artifact);
  } else {
    console.error('compilation failed');
  }
}

function compileSol(sourceCode: string, contractName: string) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: 'Solidity',
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } }
  };
  // Parse the compiler output to retrieve the ABI and Bytecode

  const outputJson = solc.compile(JSON.stringify(input));
  const output = JSON.parse(outputJson);
  if (output.errors) {
    console.error('compile errors', output);
    return;
  }
  const artifact = output.contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object
  };
}

main().then(() => process.exit(0));
