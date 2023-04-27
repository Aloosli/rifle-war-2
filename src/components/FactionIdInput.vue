<template>
  <form @submit.prevent="onSubmit" action="#">
    <label for="factionId">Faction ID:</label>
    <input type="number" v-model="factionId" id="factionId" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      factionId: null,
      apiKey: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.stopPropagation();
      console.log(
        "Emitting faction-id-submit event with factionId:",
        parseInt(this.factionId, 10)
      );
      this.$emit("faction-id-submit", parseInt(this.factionId, 10));
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
label {
  margin-right: 0.5rem;
  color: #51557E
}
button {
  background-color: #816797;
  border: none;
  border-radius: 5px;
  color: #1c1c1e;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
