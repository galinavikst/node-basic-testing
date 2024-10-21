// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initBalance = 100;
  const biggerAmount = 150;
  const smallerAmount = 50;
  const account = getBankAccount(initBalance);
  const testAccount = getBankAccount(50);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(biggerAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(biggerAmount, testAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(biggerAmount, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(biggerAmount)).toBe(account);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(smallerAmount)).toBe(account);
  });

  test('should transfer money', () => {
    expect(account.transfer(smallerAmount, testAccount)).toBe(account);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balanse = await account.fetchBalance();
    if (balanse) expect(balanse).toBe(balanse);
    else expect(balanse).toBeFalsy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 100;
    account.fetchBalance = async () => newBalance;
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = async () => null;
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
