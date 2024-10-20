// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: '2', action: Action.Add, expected: null },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 2, b: '3', action: Action.Subtract, expected: null },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 2, b: 3, action: undefined, expected: null },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: undefined, b: 3, action: Action.Divide, expected: null },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: null, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return ($expected) when ($a) and ($b) are used with ($action)',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
