// // Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import * as fsSync from 'fs';
import * as fs from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  let mockFn: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 1000);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    expect(setTimeout).toBeCalledTimes(1);
    jest.runAllTimers();
  });

  test('should call callback only after timeout', () => {
    expect(mockFn).not.toBeCalled();
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let mockFn: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, 500);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    expect(setInterval).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.advanceTimersByTime(1500); // Fast forward the time to 1500ms
    expect(setInterval).toBeCalledTimes(1);
    expect(mockFn).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const fakePath = './fake.ts';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(fakePath);
    expect(path.join).toHaveBeenCalledWith(__dirname, fakePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fsSync, 'existsSync').mockReturnValue(false);
    const res = await readFileAsynchronously(fakePath);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockContent = 'mock content';

    jest.spyOn(fsSync, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(mockContent));

    const res = await readFileAsynchronously(fakePath);
    expect(res).toBe(mockContent);
  });
});
