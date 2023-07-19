import {TodoService} from '../../../../src/common/services/todoService';
import 'whatwg-fetch';

describe('TodoService', () => {
  let todoService;
  let authServiceMock;
  let httpClientMock;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(() => 'super_valid_test_token_trust_me'),
    };

    httpClientMock = {
      fetch: jest.fn(),
    };

    todoService = new TodoService(authServiceMock);
    todoService.http = httpClientMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuthorizationHeaders', () => {
    it('should return headers with the token if it exists', async () => {
      const expectedHeaders = {
        'Authorization': 'Bearer super_valid_test_token_trust_me',
        'Content-Type': 'application/json',
      };

      const result = await todoService.getAuthorizationHeaders();

      expect(result).toEqual(expectedHeaders);
    });

    it('should return headers without the token if it does not exist', async () => {
      authServiceMock.getToken.mockReturnValueOnce(null);

      const expectedHeaders = {
        'Content-Type': 'application/json',
      };

      const result = await todoService.getAuthorizationHeaders();

      expect(result).toEqual(expectedHeaders);
    });
  });

  describe('getTodos', () => {
    it('should fetch todos with authorization headers', async () => {
      const response = {ok: true, json: jest.fn(() => Promise.resolve({todos: []}))};
      httpClientMock.fetch.mockResolvedValueOnce(response);

      const result = await todoService.getTodos();

      expect(httpClientMock.fetch).toHaveBeenCalledWith('http://localhost:8000/api/todos', {
        headers: {
          'Authorization': 'Bearer super_valid_test_token_trust_me',
          'Content-Type': 'application/json',
        },
      });
      expect(response.json).toHaveBeenCalled();
      expect(result).toEqual({todos: []});
    });

    it('should return an empty array if the fetch fails', async () => {
      httpClientMock.fetch.mockRejectedValueOnce(new Error('Failed to fetch todos'));
      const result = await todoService.getTodos();
      expect(result).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should be able to crete a todo with authorization headers', async () => {
      const todo = {id: 1, title: 'test', completed: false};
      const response = {ok: true, json: jest.fn(() => Promise.resolve(todo))};
      httpClientMock.fetch.mockResolvedValueOnce(response);

      const result = await todoService.addTodo(todo);

      expect(httpClientMock.fetch).toHaveBeenCalledWith('http://localhost:8000/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Authorization': 'Bearer super_valid_test_token_trust_me',
          'Content-Type': 'application/json',
        }
      });
      expect(response.json).toHaveBeenCalled();
      expect(result).toEqual(todo);
    });

    it('should return an empty array if the fetch fails', async () => {
      const todo = {id: 1, title: 'test', completed: false};
      httpClientMock.fetch.mockRejectedValueOnce(new Error('Failed to add todo'));
      const result = await todoService.addTodo();
      expect(result).toEqual([]);
    });
  });

  describe('rmTodo', () => {
    it('should remove the todo passed', function () {
      // TODO: Implement this test
    });
  });
});
