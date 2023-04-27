// store/loginStore.js
import { defineStore } from 'pinia';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
      } catch (error) {
        console.error(error);
        // Handle login error
      }
    },
  },
});

