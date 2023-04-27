<template>
  <div>
    
    <FactionIdInput class="Faction-Input" @faction-id-submit="inputFactionId" />
    <button @click="refreshMembers">
      <i class="fa-solid fa-arrows-rotate"></i></button>
    <FactionMembers
      v-if="factionId"
      :faction-id="factionId"
      :apiKey="apiKey"
      ref="factionMembers"
    />
  </div>
</template>

<script>
import { useApiKeyStore } from "@/store/apiKeyStore";
import FactionIdInput from "../components/FactionIdInput.vue";
import FactionMembers from "../components/FactionMembers.vue";
import { useFactionStore } from "@/store/factionStore";

export default {
  components: {
    FactionIdInput,
    FactionMembers,
  },
  data() {
    return {
      factionId: null,
      apiKey: "",
    };
  },
  methods: {
    inputFactionId(newFactionId) {
      console.log("New Faction ID:", newFactionId);
      this.factionId = newFactionId;
      const factionStore = useFactionStore();
      factionStore.setFactionId(newFactionId);
    },
    refreshMembers() {
      this.$refs.factionMembers.fetchMembers();
    },
  },
  mounted() {
    const factionStore = useFactionStore();
    factionStore.loadFactionIdFromFirestore().then(() => {
      this.factionId = factionStore.factionId;
    });
    const apiKeyStore = useApiKeyStore(); // Add this line
    apiKeyStore.loadApiKeyFromFirestore().then(() => {
      // Add this block
      this.apiKey = apiKeyStore.apiKey;
    });
  },
  watch: {
    apiKey: {
      handler(newValue, oldValue) {
        console.log("API Key changed:", newValue, oldValue);
        this.apiKey = newValue;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.Faction-Input {
  margin-top: 20px;
  margin-bottom: 20px;
}
button {
  margin-top: 20px;
  border-radius: 20px;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  border-style: none;

}
</style>
