<script>
import { useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout';
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
    const handleLogout = () => {
      authStore.logout();
      router.push('/login');
    };
    return { handleLogout, onMenuToggle, toggleDarkMode, isDarkTheme };
  }
};
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
        <i class="pi pi-bars"></i>
      </button>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
        </button>
      </div>
      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <Button
            lable="Logout"
            icon="pi pi-sign-out"
            severity="danger"
            @click="handleLogout"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
