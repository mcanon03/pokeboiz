<template>
  <div id="gen-Dropdown">
    <label>Select a Pokemon Generation: </label>
    <select v-model="selectedGen" @change="filterTypes(selectedGen)">
      <option v-for="(gen, index) in displayedPokemonGenerations" :key="index">
        {{ gen.name }}
      </option>
      <option selected="selected">all</option>
    </select>
  </div>
</template>

<script>
import { getPokemonGen, filterPokemonGen, getAllPokemonTypes } from "@/services/pokemon.js";

export default {
  data() {
    return {
      // data pulled from API
      pokemonGenerations: [
        {
          name: "",
          url: ""
        }
      ],

      pokemonTypes: [],
      firstGenPokemonTypes: [],

      // manipulated data
      displayedPokemonGenerations: [
        {
          name: "",
          url: ""
        }
      ],
      displayedPokemonTypes: [],

      selectedGen: ""
    };
  },

  methods: {
    filterTypes(selectedGen) {
    
    // resets array -- gen 6/7/all
    this.displayedPokemonTypes = this.pokemonTypes.slice();
      
    // gen 1: 15 types
      if (selectedGen.includes("1")) { 
        this.displayedPokemonTypes = this.firstGenPokemonTypes;
      } 
    // gen 2: 18 types (no fairy or shadow)
      else if (selectedGen.includes("2")) {
        this.displayedPokemonTypes = this.displayedPokemonTypes.filter(type => type != "fairy" && type != "shadow")
      } 
    // gen 3/4/5: 19 types (no fairy)
      else if (selectedGen.includes("3") || selectedGen.includes("4") || selectedGen.includes("5")) {
        this.displayedPokemonTypes = this.displayedPokemonTypes.filter(type => type != "fairy")
      }
    }
  },

  async created() {
    // renames pokeGenerations to understandable labels to be displayed in drop down
    try {
      const response = await getPokemonGen();
      this.pokemonGenerations = response.results.map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];
        let dropdownName = ""

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

    // creates array of all pokemon types up to latest gen
    try {
      const response = await getAllPokemonTypes();

      response.results.map(key => {
        this.pokemonTypes.push(key.name);
      });

    } catch (e) {
      console.error("Failed to load pokemon types");
    }

    // creates arry of pokemon of first gen
    try {
      const response = await filterPokemonGen("1");

      response.types.map(key => {
        this.firstGenPokemonTypes.push(key.name);
      });
    } catch (e) {
      console.error("Failed to load pokemon types");
    }

  }
};
</script>

<style scope>
#gen-Dropdown {
  left: auto;
}
</style>
