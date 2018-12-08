<template>
  <div>
    <div>
      <div>
        <el-checkbox-button
          v-for="(pokemonType, index) in pokemonTypes.results"
          :key="index"
          @change="filterPokemonByType(pokemonTypes.results[index].name)"
        >{{ pokemonTypes.results[index].name }}</el-checkbox-button>
      </div>
    </div>

    <div>
      <ul class="card-list">
        <li
          class="card"
          v-for="pokemon in pokemonListWithIds"
          :key="pokemon.name"
          @click="clickedCard(pokemon.name)"
        >
          <h3>{{ pokemon.id }} : {{ pokemon.name }}</h3>
          <!-- images are filtered by number -->
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
            alt
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { getAllPokemon, getAllPokemonTypes, filterPokemonByType } from '@/services/pokemon.js'
 
export default {
  // data needs to be a function --> when you instantiate the component, they will have an independent set of data
  data() {
    return {
      pokemonList: [
        {
          id: "",
          name: "",
          url: ""
        }
      ],
      pokemonTypes: {
        results: [
          {
            name: ""
          }
        ]
      },
      pokemonByTypes: [],
    };
  },

  //Lifecycle
  created,

  methods: {
    clickedCard(name) {
      // this.$route: info about current route
      // this.$router: full set of routes
      // this.$router.push({ name: 'pokemon', params: { name }});
      this.$router.push(`/pokemon/${name}`);
    },
    
    async filterPokemonByType(type) {
      try {
        const response = await filterPokemonByType(type);
        
        // reset array
        this.pokemonByTypes = [];

        response.pokemon.forEach(key => 
          {
            if (key.pokemon.url.split('/').slice(-2,-1)[0] < 150) {
                        this.pokemonByTypes.push({
            ...key.pokemon,
            id: key.pokemon.url.split('/').slice(-2,-1)[0]
          })
            }
          }
        );

        this.pokemonList = this.pokemonByTypes;

        this.$router.push({ path: "pokemon", query: { type: type } });
      } catch (e) {
        console.error("Failed to get pokemon of a specific type", e);
      }
    }
  },

  computed: {
    pokemonListWithIds() {
      return this.pokemonList.map(key => {
        let id = key.url.split('/').slice(-2,-1)[0];

        return { ...key, id }
      });
    },
    
    filterPokemonList() {
      if (this.$route.query.type) {
        // get names of all pokemon of a specific type
        // filter pokemonList to only show the pokemon of the selected type
        return this.pokemonList;
      } else {
        // need to reset this.pokemonList
        return this.pokemonList;
      }
    },

  }
};

// sets intial data set
async function created() {
  try {
    const response = await getAllPokemon();
    this.pokemonList = response.results.splice(0, 150);
  } catch (e) {
    console.error("Failed to load pokemon");
  }

  try {
    const response = await getAllPokemonTypes();
    this.pokemonTypes = response;
  } catch (e) {
    console.error("Failed to load pokemon types");
  }
};

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