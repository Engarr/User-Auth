import crypto from 'node:crypto';

export function hashUserPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64);
  return hashedPassword.toString('hex') + ':' + salt;
}

export function verifyPassword(
  storedPassword: string,
  suppliedPassord: string
) {
  const [hashedPassword, salt] = storedPassword.split(':');
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPassordBuf = crypto.scryptSync(suppliedPassord, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPassordBuf);
}
