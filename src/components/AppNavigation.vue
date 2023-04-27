<template>
  
  <nav>
    <h1>Rifle War</h1>
    <ul>
      <li><router-link to="/faction-list">Faction List</router-link></li>
      <li><router-link to="/target-list">Target List</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppNavigation",
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background-color: #252525;
  padding: 1rem;
}

h1 {
  color: white;
  margin: 0;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 1rem;
}

a {
  color: white;
  text-decoration: none;
}

a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>

