<template>
    <div>
      <div v-if="isLogin">
        <Login />
        <button @click="toggleForm">Don't have an account? Sign Up</button>
      </div>
      <div v-else>
        <SignUp />
        <button @click="toggleForm">Already have an account? Log In</button>
      </div>
    </div>
  </template>
  
  <script>
  import Login from '@/components/LoginComponent.vue';
  import SignUp from '@/components/SignUpComponent.vue';
  
  export default {
    components: {
      Login,
      SignUp,
    },
    data() {
      return {
        isLogin: true,
      };
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
      },
    },
  };
  </script>
  
  