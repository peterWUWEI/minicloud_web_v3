import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const login = async (credentials) => {
    try {
      await axios.post(`${baseUrl}/users/login`, credentials);
      user.value = {
        email: credentials.email,
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(user.value));
    } catch (error) {
      console.log('error', error);
      return error;
    }
  };
  const logout = () => {
    user.value = null;
    // Clear all cached data from localStorage
    localStorage.clear();
  };
  const isAuthenticated = computed(() => {
    // Check if the stored token is valid
    if (!localStorage.getItem('user')) return false;
    return true;
  });

  return { user, token, login, logout, isAuthenticated };
});
