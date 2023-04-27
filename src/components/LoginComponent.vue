<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useApiKeyStore } from "@/store/apiKeyStore";
import { useLoginStore } from "@/store/loginStore";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const login = async () => {
      const apiKeyStore = useApiKeyStore();
      const loginStore = useLoginStore();
      await loginStore.login(email.value, password.value);
      await apiKeyStore.loadApiKey();
      email.value = "";
      password.value = "";

      router.push("/dashboard");
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

