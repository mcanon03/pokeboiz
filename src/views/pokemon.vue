<template>
<div>
    <h1>{{ selected }}</h1>
    <div>
      Select a Pokemon Gen: 
      <poke-dropdown :selected='selected'
        :options="displayedPokemonGenerations"
        displayValue="name"
      />
    </div>
    
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
  getAllPokemonGen,
  filterPokemonGen
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
      pokemonByGen: [
        {
          gen: '',
          id: '',
          name: ''
        }
      ],

      // manipulated data
      displayedPokemonGenerations: {},
      displayedPokemon: {},


      // default data
      selected: "All"
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
  this.$on('update', (selection) => {
    this.selected = selection;
  })

  // gets all pokemon and assigns to gen
  try {
    const response = await getAllPokemon();
    this.pokemon = response.results.map(key => {
      let id = key.url.split("/").slice(-2, -1)[0];
      let gen = '';

      if (id >= 1 && id <= 151) {
        gen = '1'
      } else if (id >= 152 && id <= 351) {
        gen = '2'
      } else if (id >= 252 && id <= 386) {
        gen = '3'
      } else if (id >= 387 && id <= 493) {
        gen = '4'
      } else if (id >= 494 && id <= 649) {
        gen = '5'
      } else if (id >= 650 && id <= 721) {
        gen = '6'
      } else if (id >= 722 && id <= 807) {
        gen = '7'
      }
        
      return { ...key, id, gen };
    });
    console.log(this.displayedPokemon)
  } catch (e) {
    console.error("Failed to load pokemon");
  }

  // renames pokeGenerations to understandable labels to be displayed in drop down
    try {
      const response = await getAllPokemonGen();
      this.pokemonGenerations = response.results.map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];

        return { ...key, id };
      });

      this.displayedPokemonGenerations = this.pokemonGenerations.slice();

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

    // // creates array of all pokemon types up to latest gen
    // try {
    //   const response = await getAllPokemonTypes();
    
    //   this.pokemonTypes = response.results;
    //   this.displayedPokemonTypes = this.pokemonTypes

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
