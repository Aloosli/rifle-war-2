import { useLoginStore } from '@/store/loginStore';
import { setDoc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { getFirestore, collection, doc } from "firebase/firestore";
import "firebase/firestore";
import { auth } from "../firebase"; // Import auth

export const useApiKeyStore = defineStore({
  id: "api-key",
  state: () => ({
    apiKey: "",
  }),
  actions: {
    async saveApiKey(apiKey) {
      const loginStore = useLoginStore();

      if (loginStore.user) {
        const currentUserRef = doc(
          collection(getFirestore(), "users"),
          loginStore.user.uid
        );
        try {
          await setDoc(currentUserRef, { apiKey }, { merge: true });
          this.apiKey = apiKey;
          alert("API key added successfully");
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("User is not logged in");
      }
    },
    async loadApiKey() {
      const loginStore = useLoginStore();
      const currentUserRef = doc(
        collection(getFirestore(), "users"),
        loginStore.user.uid
      );
      const currentUserSnapshot = await getDoc(currentUserRef);
      if (currentUserSnapshot.exists()) {
        this.apiKey = currentUserSnapshot.data().apiKey;
      }
    },
    // Add the loadApiKeyFromFirestore function
    async loadApiKeyFromFirestore() {
      const user = auth.currentUser;
      if (user) {
        const apiKeyDoc = await getDoc(doc(collection(getFirestore(), "users"), user.uid));
        if (apiKeyDoc.exists()) {
          this.apiKey = apiKeyDoc.data().apiKey;
        }
      }
    },
  },
});

