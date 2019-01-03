<template>
  <div id="nav">
    <label>Select a Pokemon Generation:</label>
    <select>
      <option v-for="(gen, index) in displayedPokemonGenerations" :key="index">
        {{ gen.name }}
      </option>
      <option selected="selected">all</option>
    </select>
    <router-link to="/pokemon">Home</router-link>
  </div>
</template>

<script>
import { getPokemonGen, filterPokemonGen } from "@/services/pokemon.js";

export default {
  data() {
    return {
      pokemonGenerations: [
        {
          name: "",
          url: ""
        }
      ],
      displayedPokemonGenerations: [
        {
          name: "",
          url: ""
        }
      ]
    };
  },

  async created() {
    try {
      const response = await getPokemonGen();
      this.pokemonGenerations = response.results.map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];

        return { ...key, id };
      });

      this.displayedPokemonGenerations = this.pokemonGenerations;

      this.displayedPokemonGenerations.map(key => {
        switch (key.id) {
          case "1":
            key.name = "Gen 1 (Blue/Red/Yellow)";
            break;
          case "2":
            key.name = "Gen 2 (Gold/Silver/Crystal)";
            break;
          case "3":
            key.name = "Gen 3 (Ruby/Sapphire/Emerald)";
            break;
          case "4":
            key.name = "Gen 4 (Diamond/Pearl/Platinum)";
            break;
          case "5":
            key.name = "Gen 5 (Black/White)";
            break;
          case "6":
            key.name = "Gen 6 (X/Y)";
            break;
          case "7":
            key.name = "Gen 7 (Sun/Moon)";
            break;
          default:
            key.name = "New Gen!";
            break;
        }
      });
    } catch (e) {
      console.error("Failed to get pokemon generations");
    }

    try {
      const response = await filterPokemonGen(1);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style>
#nav {
  display: inline-block;
}
</style>
