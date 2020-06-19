export default {
  getToken() {
    const token = uni.getStorageSync("access_token");
    if (token) {
      return JSON.parse(token);
    }
    return null;
  },
  setToken(value) {
    uni.setStorageSync("access_token", value);
  }
};
