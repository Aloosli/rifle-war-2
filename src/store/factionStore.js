import { defineStore } from "pinia";
import { auth, db } from "@/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const useFactionStore = defineStore({
  id: "faction",
  state: () => ({
    factionId: "",
    enemyFactionList: [],
    personalTargetList: [],
  }),
  actions: {
    setFactionId(id) {
      this.factionId = id;
      this.saveFactionIdToFirestore();
    },
    addToEnemyFactionList(member) {
      this.enemyFactionList.push(member);
      this.saveEnemyFactionListToFirestore();
    },
    addToPersonalTargetList(member) {
      this.personalTargetList.push(member);
      this.savePersonalTargetListToFirestore();
    },
    async saveFactionIdToFirestore() {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { factionId: this.factionId });
      }
    },
    async saveEnemyFactionListToFirestore() {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { enemyFactionList: this.enemyFactionList });
      }
    },
    async savePersonalTargetListToFirestore() {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          personalTargetList: this.personalTargetList,
        });
      }
    },
    async loadFactionIdFromFirestore() {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          this.factionId = docSnapshot.data().factionId;
        }
      }
    },
    async loadEnemyFactionListFromFirestore() {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists() && docSnapshot.data().enemyFactionList) {
          this.enemyFactionList = docSnapshot.data().enemyFactionList;
        }
      }
    },
    async loadPersonalTargetListFromFirestore() {
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists() && docSnapshot.data().personalTargetList) {
          this.personalTargetList = docSnapshot.data().personalTargetList;
        }
      }
    },
  },
});