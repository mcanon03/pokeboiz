<template>
  <div>
    <app-header></app-header>
    <!-- <gen-dropdown></gen-dropdown>
    <pokemon-cards></pokemon-cards> -->

    <!-- <type-dropdown></type-dropdown> -->
    <router-view />
  </div>
</template>

<script>
import header from "./components/header.vue";
import genDropdown from "./components/genDropdown.vue";
import pokemonCards from "./views/pokemon.vue"

export default {
  components: {
    "app-header": header,
    "gen-dropdown": genDropdown,
    "pokemon-cards": pokemonCards
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
