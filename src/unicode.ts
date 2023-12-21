import fs from 'fs';

fs.writeFileSync('outdata/unicode-tmp.txt', new Uint8Array([33, 33]));
console.debug('end of unicode example!');
