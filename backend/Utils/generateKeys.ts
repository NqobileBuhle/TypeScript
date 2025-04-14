import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

const keyPair = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  },
});

const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

// Store these keys securely (e.g., in separate files or environment variables)
fs.writeFileSync(path.join(__dirname, 'private.key'), privateKey);
fs.writeFileSync(path.join(__dirname, 'public.key'), publicKey);

console.log('RSA key pair generated.');