<template>
    <div>
      <h1>Dashboard</h1>
      <ApiKeyInput @save="saveApiKey" />
    </div>
  </template>
  
  <script>
  import ApiKeyInput from "@/components/ApiKeyInput.vue";
  import { useApiKeyStore } from "@/store/apiKeyStore";
  
  export default {
    components: {
      ApiKeyInput,
    },
    methods: {
      saveApiKey(apiKey) {
        const apiKeyStore = useApiKeyStore();
        apiKeyStore.saveApiKey(apiKey);
      },
    },
  };
  </script>
  