import {AuthService} from '../../../../src/common/services/authService';
import 'whatwg-fetch';

describe('AuthService', () => {
  let authService;
  let httpClientMock;

  beforeEach(() => {
    httpClientMock = {
      fetch: jest.fn(() => Promise.resolve({ok: true})),
    };

    authService = new AuthService();
    authService.httpClient = httpClientMock;

    // Mock sessionStorage.setItem
    const sessionStorageMock = {
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'sessionStorage', {value: sessionStorageMock, writable: true});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should send a POST request with credentials and store the token', async () => {
      const credentials = {username: 'testuser', password: 'testpassword'};
      const token = 'testtoken';
      const response = {ok: true, json: jest.fn(() => Promise.resolve({token}))};
      httpClientMock.fetch.mockResolvedValueOnce(response);

      const result = await authService.login(credentials);

      expect(httpClientMock.fetch).toHaveBeenCalledWith('http://localhost:8000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      expect(response.json).toHaveBeenCalled();
      expect(authService.token).toBe(token);
      expect(result).toBe(true);
    });

    it('should return false when login fails', async () => {
      const credentials = {username: 'testuser', password: 'testpassword'};
      const response = {ok: false};
      httpClientMock.fetch.mockResolvedValueOnce(response);

      const result = await authService.login(credentials);

      expect(result).toBe(false);
    });
  });

  describe('signup', () => {
    it('should send a POST request with user data', async () => {
      const user = {username: 'testuser', password: 'testpassword'};

      const result = await authService.signup(user);

      expect(httpClientMock.fetch).toHaveBeenCalledWith('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(user),
      });
      expect(result).toBe(true);
    });

    it('should return false when signup fails', async () => {
      const user = {username: 'testuser', password: 'testpassword'};
      const response = {ok: false};
      httpClientMock.fetch.mockResolvedValueOnce(response);

      const result = await authService.signup(user);

      expect(result).toBe(false);
    });
  });

  describe('logout', () => {
    it('should make a post request to clear all session related info', async () => {
      const user = {username: 'testuser', password: 'testpassword'};
      const response = {ok: true};
      httpClientMock.fetch.mockResolvedValueOnce(response);

      const result = await authService.logout(user);

      expect(result).toBe(true);
      expect(authService.token).toBe(null);
      expect(authService.user).toBe(null);
    });
  });
});
