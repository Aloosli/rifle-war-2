<template>
  <ul class="card-container">
    <li v-for="(member, index) in computedMembers" :key="index">
      <div
        :class="[
          'card',
          member.status?.state === 'Hospital' ? 'hospital' : 'healthy',
        ]"
      >
        <div class="card-content">
          <button class="remove-button" @click="addToMyList(member)">
            <i class="fas fa-plus"></i>
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
              :href="member.attackUrl"
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
import axios from "axios";
import { useFactionStore } from "@/store/factionStore"; 

export default {
  props: {
    factionId: {
      type: Number, String,
      default: 0,
    },
    apiKey: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      members: [],
    };
  },
  computed: {
    computedMembers() {
      return this.members.map((member) => {
        const attackUrl = `https://www.torn.com/loader.php?sid=attack&user2ID=${member.ID}`;
        return { ...member, attackUrl };
      });
    },
  },
  watch: {
    factionId: {
      handler(newValue, oldValue) {
        console.log("factionId changed:", newValue, oldValue);
        console.log("factionId type:", typeof newValue); 
        if (newValue) {
          this.fetchMembers();
        }
      },
      immediate: true,
    },
    apiKey: {
    handler(newValue, oldValue) {
      console.log("API Key changed in FactionMembers.vue:", newValue, oldValue);
      if (newValue) {
        this.fetchMembers();
      }
    },
    immediate: true,
  },
  },

  methods: {
    async fetchMembers() {
      

      console.log("Fetching members for faction ID:", this.factionId);
      console.log("API Key:", this.apiKey);
      if (!this.factionId) {
        return;
      }

      const apiKey = this.apiKey;
      const response = await axios.get(
        `https://api.torn.com/faction/${this.factionId}?selection=members&key=${apiKey}`
      );
      console.log("API response:", response);

      const membersData = response.data.members || {};
      const memberIds = Object.keys(membersData);
      const members = memberIds.map((id) => {
        const attackUrl = `https://www.torn.com/loader.php?sid=attack&XID=${id}`;
        return { ID: id, attackUrl, ...membersData[id] };
      });
      console.log("Fetched members:", members);

      this.members = members;
      
      this.updateStatus();
    },

    async updateStatus() {
      const intervalDuration = 60000 / 90;
      let currentIndex = 0;

      setInterval(async () => {
        if (this.members && this.members.length > 0) {
          const member = this.members[currentIndex];
          console.log("Updating status for member:", member);
          const apiKey = this.apiKey;
          const response = await axios.get(
            `https://api.torn.com/user/${member.ID}?selections=status&key=${apiKey}`
          );

          // Check if response.data.status is defined before assigning
          if (response.data.status) {
            const prevState = member.status?.state;
            member.status = response.data.status;

            if (
              prevState === "Hospital" &&
              member.status.state !== "Hospital"
            ) {
              this.notifyMemberOutOfHospital(member);
            }
          }

          currentIndex = (currentIndex + 1) % this.members.length;
        }
      }, intervalDuration);
    },

    notifyMemberOutOfHospital(member) {
      alert(`${member.name} just left the hospital!`);
    },
    addToMyList(member) {
      const factionStore = useFactionStore(); // Update this line
      factionStore.addToPersonalTargetList(member); 
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





