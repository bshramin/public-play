const crypto = require('crypto');

// Signature generated in Go
const signature = '899d681de4bd63db5dd7a76573538d7dac882d27fcbd816f3ded92aff4818ccb409ceb444228ecf5bebe50ebf4921b7bb2c51ffb4103a77a15672a670d4240bcc5215755182855ddb10d39fd55eb1d9b9721c92a70aad0cb9a571a733c075c4e15983cdf530906b3135d5050e31ea432aa443723c7e170ca42c0afe13d9dac0971c51cab17bcb74f35d2ad27fd9a97a036811bbf5f441e38109b0d263826e53e227d72fb9bb13e4372de7e1b0a96270ad4ffdefd55954076af4173ea8e3135a53e243a30f90681484d4ef39d259e3be2f55284c6ed62efa735c89e4b094359c0a442ccd5036f2d76779de217efc7313de7e13e87ae52e1893381325bfec51d74'; // Replace with the actual signature generated in Go
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApxP118yfdSma7t3Spajo
JujFieOPTpj1iWVCPXlQvJlb9WyTLDDTHiYGq/zIHnweDiSDOjwHT6WnTNbOVPpj
/pIA7K+z4GiwK43IUYok7qbpF5PGPlBYkY1Y+52jmd/TZKO3LrlIzlhcmz/huvnJ
SjLS446+p0Ttqu1BYO0D5YSaoB18IQjpRxsGSJLh/0zP+5A0lRpCtIi+7soR7oj8
u2AcaI9oFwAHoDAokbmHnf3SGZbFxNjvRK0MEnFkyjQ6khwNnFw7qTB0yfkfT66B
jpTZHnnYPZksCFvbXl5hq+LzkFHA0mMtQtqKYuGttEzFHOUhE7J2QyeTgwGl0jyf
ZwIDAQAB
-----END PUBLIC KEY-----`; // Replace with the actual public key in PEM format

// Message to verify
const message = 'Hello, World!';
const hashed = crypto.createHash('sha256').update(message).digest();
console.log('Hashed message:', hashed.toString('hex'));
// Convert the signature from base64 to a buffer
const signatureBuffer = Buffer.from(signature, 'hex');

// Load the public key from PEM format
const publicKey = crypto.createPublicKey(publicKeyPem);

console.log('Public key:', publicKey.export({ type: 'spki', format: 'pem' }));

// Verify the signature
const isVerified = crypto.verify(
  'sha256',
  message,
  publicKey,
  signatureBuffer
);

console.log('Signature verification:', isVerified);
