<template>
  <ul class="card-container">
    <li v-for="(member, index) in personalAttackList" :key="index">
      <div
        :class="[
          'card',
          member.status?.state === 'Hospital' ? 'hospital' : 'healthy',
        ]"
      >
        <div class="card-content">
          <button class="remove-button" @click="removeFromList(index)">
            <i class="fas fa-trash-alt"></i>
          </button>
          <div class="name">
            {{ member.name }}
          </div>
          <div v-if="member.status" class="status">
            {{ member.status.state === "Hospital" ? "In Hospital" : "Healthy" }}
          </div>
        </div>
        <div class="card-actions">
          <button class="attack-button">
            <a
              :href="`https://www.torn.com/loader.php?sid=attack&user2ID=${member.ID}`"
              target="_blank"
              rel="noopener noreferrer"
              class="attack-link"
            >
              Attack
            </a>
          </button>
        </div>

        <div class="status-indicator"></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { useFactionStore } from "../store/factionStore";

export default {
  props: {
    personalAttackList: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const factionStore = useFactionStore();

    return {
      factionStore,
    };
  },
  methods: {
    removeFromList(index) {
      this.factionStore.personalTargetList.splice(index, 1);
      this.factionStore.savePersonalTargetListToFirestore();
    },
    async loadPersonalTargetListFromFirestore() {
      await this.factionStore.loadPersonalTargetListFromFirestore();
      console.log("Loaded personal attack list from Firestore:", this.factionStore.personalTargetList);
      this.$emit("updatePersonalAttackList", this.factionStore.personalTargetList);
    },
  },
};
</script>


<style scoped>
.attack-link {
  color: #1c1c1e;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.attack-button {
  background-color: #64416b;
  border: none;
  border-radius: 5px;
  color: #1c1c1e;
  font-weight: bold;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.attack-button:hover .attack-link {
  color: #1c1c1e;
  text-decoration: none;
}

.attack-button:focus {
  outline: none;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.card {
  position: relative;
  background-color: #343434;
  
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
}

.name {
  font-size: 1rem;
  font-weight: bold;
  color: #ede7e5;
  margin-bottom: 0.25rem;
}

.remove-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #3ed3b3;
  font-size: 0.7rem;
  outline: none;
}

.remove-button:hover {
  color: #2dbb9c;
}

.status {
  color: #2dbb9c;
  margin-bottom: 0.25rem;
}

.card-actions {
  position: relative;
}

.status-indicator {
  height: 10px;
  background-color: green;
  margin: 5px;
  border-radius: 5px 5px 5px 5px;
  width: 100%;
} 
.card.hospital .status-indicator {
  background-color: red;
}
</style>