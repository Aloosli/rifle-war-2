<template>
  <div id="app">
    <AppNavigation />
    <router-view :faction-id="factionId" />
  </div>
</template>

<script>
import AppNavigation from "./components/AppNavigation.vue";
import { useFactionStore } from "@/store/factionStore";

export default {
  name: "App",
  components: { AppNavigation },
  setup() {
    const factionStore = useFactionStore();

    return {
      factionId: factionStore.factionId,
    };
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>