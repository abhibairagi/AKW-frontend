// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    isAuthenticated: false,
    token: null,
  }),
  actions: {
    login(user) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = {};
      this.isAuthenticated = false;
      this.token = null;
    },
    setToken(token) {
      this.token = token;
    },
  },
  persist: {
    enabled: true,
  },
});
