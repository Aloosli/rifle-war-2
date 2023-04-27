<template>
  <div>
    <h2>Sign Up Component</h2>
    <form @submit.prevent="signUp">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />

      <label for="factionId">Faction ID:</label>
      <input type="number" id="factionId" v-model="factionId" required />

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const factionId = ref("");

    const signUp = async () => {
      // Check if the user belongs to your faction using the faction ID
      if (factionId.value === 10566) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          router.push("/dashboard");
          // Redirect to another route, e.g., the dashboard
          // this.$router.push('/dashboard');
        } catch (error) {
          console.error(error);
          // Handle sign up error
        }
      } else {
        console.error("User does not belong to the faction");
        // Handle the case when the user is not from your faction
      }
    };

    return {
      email,
      password,
      factionId,
      signUp,
    };
  },
};
</script>
