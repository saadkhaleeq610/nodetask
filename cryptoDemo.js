import crypto from 'crypto'

// const hash = crypto.createHash("ssad113")
// hash.update('password1234');
// console.log(hash.digest('hex'));

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello this is a secret msg", 'utf8', "hex");
encrypted += cipher.final('hex')
console.log(encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);