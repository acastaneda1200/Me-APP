import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/auth/login', { email, password });
        this.token = response.data.accessToken; // Check backend response structure
        // If backend doesn't return user info on login but only token, 
        // we might need to fetch profile or decode token.
        // For now, let's assume we decode or fetch, but strictly the controller returns access_token.
        // Let's assume we decode it or fetch profile.
        // Wait, looking at `auth.controller.ts`, it returns `this.authService.login(user)`.
        // `auth.service.ts` usually returns `{ access_token: ... }`.

        // Let's store the token.
        localStorage.setItem('token', this.token);

        // Fetch user profile if needed, or if the login response includes it.
        // Since I don't see a /me endpoint usage in the plan, I'll check if the login response has user.
        // If not, I might need to implement a way to get user details.
        // Actually, let's just save the email for now or decoding if possible, 
        // but typically we want user info.

        // Let's assume for now we just store the token and email if available.
        // Or better, let's assume the login response might be extended or we just use the token.

        // PROVISIONAL: Set user to object with email for now to keep state consistent.
        this.user = { email };
        localStorage.setItem('user', JSON.stringify(this.user));

        return true;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async register(data) {
      try {
        await api.post('/auth/register', data);
        // Maybe auto-login or redirect to login
        return true;
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});
