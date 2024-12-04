import localforage from 'localforage';

localforage.config({
  name: 'myApp',
  storeName: 'myApp'
});

export const storage = {
  async setToken(token: string) {
    await localforage.setItem('auth_token', token);
  },

  async getToken(): Promise<string | null> {
    return await localforage.getItem('auth_token');
  },

  async removeToken() {
    await localforage.removeItem('auth_token');
  }
};