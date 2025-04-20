<script>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const display = ref(false);
    const displayConfirmation = ref(false);
    const displayErrorMsg = ref('');
    const router = useRouter();
    const logoUrl = new URL('../../assets/favicon.png', import.meta.url).href;

    const openConfirmation = () => {
      displayConfirmation.value = true;
    };

    const closeConfirmation = () => {
      displayConfirmation.value = false;
    };

    const handleLogin = async () => {
      const response = await authStore.login({
        email: email.value,
        password: password.value
      });
      if (authStore.isAuthenticated) {
        router.push('/services');
      } else if (response.status !== 200) {
        displayConfirmation.value = true;
        console.log('response', response);
        displayErrorMsg.value = response.response.data;
      }
    };
    return {
      email,
      password,
      logoUrl,
      handleLogin,
      display,
      displayConfirmation,
      openConfirmation,
      closeConfirmation,
      displayErrorMsg
    };
  }
};
</script>

<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <img class="image-center" :src="logoUrl" alt="Logo Image" />
          <br />
          <div class="text-center mb-8">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              欢迎回来
            </div>
            <span class="text-muted-color font-medium">请登录</span>
          </div>

          <div>
            <form @submit.prevent="handleLogin">
              <label
                for="email1"
                class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                >邮箱/用户名</label
              >
              <InputText
                id="email1"
                type="text"
                placeholder="邮箱地址/用户名"
                class="w-full md:w-[30rem] mb-8"
                v-model="email"
                required
              />

              <label
                for="password1"
                class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                >密码</label
              >
              <Password
                id="password1"
                v-model="password"
                placeholder="请输入密码"
                :toggleMask="true"
                class="mb-4"
                fluid
                :feedback="false"
                required
              ></Password>

              <Button label="登录" class="w-full" type="submit"></Button>
            </form>
            <div class="card">
              <Dialog
                header="登录出错"
                v-model:visible="displayConfirmation"
                :style="{ width: '350px' }"
                :modal="true"
              >
                <div class="flex items-center justify-center">
                  <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
                  <span>{{ displayErrorMsg }}</span>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.image-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100;
}
</style>
