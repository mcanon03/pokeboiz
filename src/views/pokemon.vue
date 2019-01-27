<template>
  <div>
    <pokeDropdown></pokeDropdown>
    <!-- <ul class="card-list">
      <li
        class="card"
        v-for="pokemon in displayedPokemon"
        :key="pokemon.name"
        @click="clickedCard(pokemon.name)"
      >
        <h3>{{ pokemon.name }}</h3>
        <img
          :src="
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id
            }.png`
          "
          alt
        />
      </li>
    </ul> -->

  </div>
</template>

<script>
import pokeDropdown from '@/components/pokeDropdown.vue'

import {
  getAllPokemon,
  getAllPokemonTypes,
  filterPokemonByType
} from "@/services/pokemon.js";

export default {
  components: {
    pokeDropdown
  },
  // data needs to be a function --> when you instantiate the component, they will have an independent set of data
  data() {
    return {
      // data pulled from API
      pokemonGenerations: {},
      // pokemonList: [
      //   {
      //     id: "",
      //     name: "",
      //     url: ""
      //   }
      // ],
      // pokemonTypes: {
      //   results: [
      //     {
      //       name: ""
      //     }
      //   ]
      // },

      // manipulated data
      displayedPokemonGenerations: {},
      // displayedPokemon: {},
      // selectedType: "all",
      // displayedPokemon: [
      //   {
      //     id: "",
      //     name: "",
      //     url: ""
      //   }
      // ]
    };
  },

  //Lifecycle
  created,

  // methods: {
  //   clickedCard(name) {
  //     this.$router.push(`/pokemon/${name}`);
  //   },

  //   async filteredPokemon(type) {
  //     try {
  //       if (type != "all") {
  //         // resets array
  //         this.displayedPokemon = [];

  //         const response = await filterPokemonByType(type);
  //         response.pokemon.forEach(key => {
  //           if (key.pokemon.url.split("/").slice(-2, -1)[0] < 150) {
  //             this.displayedPokemon.push({
  //               ...key.pokemon,
  //               id: key.pokemon.url.split("/").slice(-2, -1)[0]
  //             });
  //           }
  //         });
  //       } else {
  //         // resets filter to all types (DIY)
  //         this.displayedPokemon = this.pokemonList;
  //       }

  //       this.$router.push({
  //         path: "pokemon",
  //         query: {
  //           type: type
  //         }
  //       });
  //     } catch (e) {
  //       console.error("Failed to get pokemon of a specific type", e);
  //     }
  //   }
  // },

  // beforeRouteUpdate(to, from, next) {
  //   if (!to.query.type) {
  //     this.selectedType = "all";
  //     this.displayedPokemon = this.pokemonList;
  //   }

  //   next();
  // }
};

// sets intial data set
async function created() {
  // try {
  //   const response = await getAllPokemon();
  //   this.pokemonList = response.results.splice(0, 151).map(key => {
  //     let id = key.url.split("/").slice(-2, -1)[0];

  //     return { ...key, id };
  //   });

  //   this.displayedPokemon = this.pokemonList;
  // } catch (e) {
  //   console.error("Failed to load pokemon");
  // }

  // try {
  //   const response = await getAllPokemonTypes();
  //   this.pokemonTypes = response;
  // } catch (e) {
  //   console.error("Failed to load pokemon types");
  // }

  // renames pokeGenerations to understandable labels to be displayed in drop down
    try {
      const response = await getAllPokemonGen();
      console.log(response)
      // this.pokemonGenerations = response.results.map(key => {
      //   let id = key.url.split("/").slice(-2, -1)[0];

      //   return { ...key, id };
      // });

      // this.displayedPokemonGenerations = this.pokemonGenerations.slice();

      // this.displayedPokemonGenerations.map(key => {
      //   switch (key.id) {
      //     case "1":
      //       key.name = "Gen 1 (Blue/Red/Yellow)";
      //       break;
      //     case "2":
      //       key.name = "Gen 2 (Gold/Silver/Crystal)";
      //       break;
      //     case "3":
      //       key.name = "Gen 3 (Ruby/Sapphire/Emerald)";
      //       break;
      //     case "4":
      //       key.name = "Gen 4 (Diamond/Pearl/Platinum)";
      //       break;
      //     case "5":
      //       key.name = "Gen 5 (Black/White)";
      //       break;
      //     case "6":
      //       key.name = "Gen 6 (X/Y)";
      //       break;
      //     case "7":
      //       key.name = "Gen 7 (Sun/Moon)";
      //       break;
      //     default:
      //       key.name = "New Gen!";
      //       break;
      //   }
      // });
    } catch (e) {
      console.error("Failed to get pokemon generations");
    }

    // creates array of all pokemon types up to latest gen
    // try {
    //   const response = await getAllPokemonTypes();
    //   console.log(response)

    //   // response.results.map(key => {
    //   //   this.pokemonTypes.push(key.name);
    //   // });

    // } catch (e) {
    //   console.error("Failed to load pokemon types");
    // }

    // // creates arry of pokemon of first gen
    // try {
    //   const response = await filterPokemonGen("1");

    //   response.types.map(key => {
    //     this.firstGenPokemonTypes.push(key.name);
    //   });
    // } catch (e) {
    //   console.error("Failed to load pokemon types");
    // }
}
</script>

<style>
.card-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  border: 1px solid black;
  border-radius: 3px;
  padding: 1rem;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  text-transform: capitalize;
}
</style>
