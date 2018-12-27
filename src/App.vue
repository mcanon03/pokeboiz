<template>
  <div>
    <!-- <div id="nav">
      <h1>Pokemon Gen 1</h1>
      <div>
        <router-link to="/pokemon">Home</router-link>
      </div>
    </div> -->
    <app-header></app-header>
    <router-view />
  </div>
</template>

<script>
import header from "./components/header.vue";

export default {
  components: {
    "app-header": header
  }
};
</script>

<style>
* {
  font-family: "Montserrat Alternates", Arial, Helvetica, sans-serif;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
