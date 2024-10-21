// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.useFakeTimers(); // removes warnings when executing test comand

describe('throttledGetDataFromApi', () => {
  const fakeUrl = '/fakeUrl';
  const response = { data: [] };

  beforeEach(async () => {
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(response);
  });
  afterEach(() => jest.clearAllMocks());

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(fakeUrl);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(fakeUrl);
    jest.runAllTimers();
    expect(axios.get).toHaveBeenCalledWith(fakeUrl);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(fakeUrl);
    jest.runAllTimers();
    expect(data).toEqual(response.data);
  });
});
