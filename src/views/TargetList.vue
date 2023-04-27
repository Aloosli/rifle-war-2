<template>
  <div>
    <h1>Assist Targets</h1>
    <button @click="refreshPersonalAttackList">
      <i class="fa-solid fa-arrows-rotate"></i>
    </button>

    <PersonalAttackList
      :personalAttackList="personalAttackListData"
      ref="personalAttackList"
      @updatePersonalAttackList="handleUpdatePersonalAttackList"
    />
  </div>
</template>

<script>
import PersonalAttackList from "../components/PersonalAttackList.vue";
import { useFactionStore } from "../store/factionStore";
import { auth } from "@/firebase";

export default {
  components: {
    PersonalAttackList,
  },
  data() {
    return {
      personalAttackListData: [],
    };
  },
  methods: {
    refreshPersonalAttackList() {
      console.log("Refreshing personal attack list...");
      this.$refs.personalAttackList.loadPersonalTargetListFromFirestore();
    },
    handleUpdatePersonalAttackList(updatedList) {
      console.log("Received updated personal attack list:", updatedList);
      this.personalAttackListData = updatedList;
    },
  },
  mounted() {
    const factionStore = useFactionStore();

    auth.onAuthStateChanged((user) => {
      if (user) {
        factionStore.loadPersonalTargetListFromFirestore().then(() => {
          this.personalAttackListData = factionStore.personalTargetList;
        });
      }
    });
  },
};
</script>
