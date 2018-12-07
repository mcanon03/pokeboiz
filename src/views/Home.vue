<template>
  <div>
    <div>
      <el-checkbox-group>
        <el-checkbox-button
          v-for="(pokemonType, index) in pokemonTypes.results"
          :key="index"
          @change="getPokemonForType(pokemonTypes.results[index].name)"
        >{{ pokemonTypes.results[index].name }}</el-checkbox-button>
      </el-checkbox-group>
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

import { getAllPokemon } from '@/services/pokemon.js'
 
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
      }
    };
  },

  //Lifecycle
  created,

  methods: {
    clickedCard,
    async getPokemonForType(type) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
        const body = await response.json();
        let filteredPokemon = [];

        body.pokemon.forEach(key => filteredPokemon.push(key.pokemon));

        this.pokemonList = filteredPokemon;

        this.$router.push({ path: "pokemon", query: { type: type } });
      } catch (e) {
        console.error("Failed to get pokemon of a specific type");
      }
    }
  },

  computed: {
    pokemonListWithIds() {
      return this.pokemonList.map(key => {
        let id = key.url.substring(34).slice(0, -1);

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

async function created() {
  try {
    const body = await getAllPokemon();
    // gets all pokemon
    this.pokemonList = body.results.splice(0, 150);
  } catch (e) {
    console.error("Failed to load pokemon");
  }

  try {
    const response = await fetch("https://pokeapi.co/api/v2/type/");
    // gets all types
    // TODO: cycle through types for only gen 1
    this.pokemonTypes = await response.json();
  } catch (e) {
    console.error("Failed to load pokemon types");
  }
};

function clickedCard(name) {
  // this.$route: info about current route
  // this.$router: full set of routes
  // this.$router.push({ name: 'pokemon', params: { name }});
  this.$router.push(`/pokemon/${name}`);
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