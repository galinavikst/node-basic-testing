// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    //__esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'without log'),
    mockTwo: jest.fn(() => 'without log'),
    mockThree: jest.fn(() => 'without log'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    // call functions to test
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    // call function to test
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
    // Cleanup: Restore the original console.log
    //logSpy.mockRestore();
  });
});
