<template>
  <div>
    <div>
      <div>
        <label>Select a Pokemon Type: </label>
        <select v-model="selectedType" @change="filteredPokemon(selectedType)">
          <option
            v-for="(pokemonType, index) in pokemonTypes.results"
            :key="index"
            >{{ pokemonTypes.results[index].name }}</option
          >
          <option selected="selected">all</option>
        </select>
      </div>
    </div>

    <!-- displays pokemon cards -->
    <div>
      <ul class="card-list">
        <li
          class="card"
          v-for="pokemon in pokemonListWithIds"
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
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getAllPokemon,
  getAllPokemonTypes,
  filterPokemonByType
} from "@/services/pokemon.js";

export default {
  // data needs to be a function --> when you instantiate the component, they will have an independent set of data
  data() {
    return {
      // data pulled from API
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
      // manipulated data
      selectedType: "all",
      
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

    async filteredPokemon(type) {
      try {
        if(type != "all") {
        // reset array
          this.pokemonByType = [];

          const response = await filterPokemonByType(type);

          response.pokemon.forEach(key => {
            if (key.pokemon.url.split("/").slice(-2, -1)[0] < 150) {
              this.pokemonByType.push({
                ...key.pokemon,
                id: key.pokemon.url.split("/").slice(-2, -1)[0]
              });
            }
          });

          // this is manipulating the original data set (bad)
          this.pokemonList = this.pokemonByType;
        } else {
          // resets filter to all types (DIY)
          const response = await getAllPokemon();
          this.pokemonList = response.results.splice(0, 150).map(key => {
              let id = key.url.split("/").slice(-2, -1)[0];

              return { ...key, id };
            });
        }

          this.$router.push({
            path: "pokemon",
            query: {
              type: type
            }
          });

      } catch (e) {
        console.error("Failed to get pokemon of a specific type", e);
      }
    }
  },

  computed: {
    pokemonListWithIds() {
      return this.pokemonList.map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];

        return { ...key, id };
      });
    }
  }
};

// sets intial data set
async function created() {
  try {
    const response = await getAllPokemon();
    this.pokemonList = response.results.splice(0, 150).map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];

        return { ...key, id };
      });
  } catch (e) {
    console.error("Failed to load pokemon");
  }

  try {
    const response = await getAllPokemonTypes();
    this.pokemonTypes = response;
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
