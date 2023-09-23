import cryptoRandomString from 'crypto-random-string';

export const generateRandomNumber = (prefix: number = 9) => {
  const randomString = cryptoRandomString({ length: 9, type: 'numeric' });
  const randomNumber = Number(`${prefix}${randomString}`);
  return randomNumber;
};
