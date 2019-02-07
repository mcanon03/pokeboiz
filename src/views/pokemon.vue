<template>
<div>
    <h1>{{ selected }}</h1>
    <div>
      Select a Pokemon Gen: 
      <poke-dropdown :selected='selected'
        :options="pokemonGenWithIdAndName"
        displayValue="name"
      />
    </div>

    <poke-card-list 
      :options="displayedPokemon"
    />
    
    <ul class="card-list">
      <li
        class="card"
        v-for="pokemon in displayedPokemon"
        :key="pokemon.name"
        @click="clickedCard(pokemon.name)"
      >
        <h3>{{ pokemon.name }}</h3>
        <img
          :src="
            pokemon.img
          "
          alt
        />
      </li>
    </ul>

  </div>
</template>

<script>
import pokeDropdown from '@/components/pokeDropdown.vue'
import pokeCardList from '@/components/pokeCardList.vue'

import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  components: {
    pokeDropdown,
    pokeCardList
  },
  // data needs to be a function --> when you instantiate the component, they will have an independent set of data
  data() {
    return {
      selected: "All"
    };
  },

  //Lifecycle
  created,

  // getters map to computed
  computed: {
    ...mapGetters([
      'pokemonWithGen',
      'pokemonGenWithIdAndName'
    ]),
    getGenIdBySelectedName() {
      const gen = this.pokemonGenWithIdAndName.find(gen => {
        return gen.name === this.selected;
      });
      return gen.id;
    },
    displayedPokemon() {
      if (this.selected === 'All') {
        return this.pokemonWithGen;
      }
      return this.pokemonWithGen.filter(pokemon => {
        return pokemon.gen === this.getGenIdBySelectedName;
      })
    }
  },

  methods: {
    ...mapActions([
      'getAllPokemon',
      'getAllPokemonGen',
      'getAllPokemonTypes'
    ])
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
  }
};

// sets intial data set
async function created() {
  await this.getAllPokemon();
  await this.getAllPokemonGen();
  await this.getAllPokemonTypes();
  
  this.$on('update', (selection) => {
    this.selected = selection;
  });

    // creates array of all pokemon types up to latest gen
    try {
      const response = await getAllPokemonTypes();
    
      this.pokemonTypes = response.results;
      this.displayedPokemonTypes = this.pokemonTypes

    } catch (e) {
      console.error("Failed to load pokemon types");
    }
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
