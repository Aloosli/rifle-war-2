<template>
    <div>
      <label>Enter your TORN.com API key:</label>
      <input type="text" v-model="apiKey">
      <button @click="saveApiKey">Save</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiKey: '',
      };
    },
    methods: {
      saveApiKey() {
        this.$emit('save', this.apiKey);
      },
    },
  };
  
  </script>
  