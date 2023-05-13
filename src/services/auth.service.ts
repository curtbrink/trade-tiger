const COOKIE_NAME = 'tradeTigerAuthToken';

export default {
  setAuthToken(token: string) {
    return localStorage.setItem(COOKIE_NAME, token);
  },
  getAuthToken() {
    return localStorage.getItem(COOKIE_NAME);
  },
  hasAuthToken() {
    return !!this.getAuthToken();
  },
};
