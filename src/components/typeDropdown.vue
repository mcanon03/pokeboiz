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
  </div>
</template>

<script>
import {
  getAllPokemon,
  getAllPokemonTypes,
  filterPokemonByType
} from "@/services/pokemon.js";

export default {
  props: [
    
  ],

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
      displayedPokemon: [
        {
          id: "",
          name: "",
          url: ""
        }
      ]
    };
  },

  //Lifecycle
  created,

  methods: {
    clickedCard(name) {
      this.$router.push(`/pokemon/${name}`);
    },

    async filteredPokemon(type) {
      try {
        if (type != "all") {
          // resets array
          this.displayedPokemon = [];

          const response = await filterPokemonByType(type);

          response.pokemon.forEach(key => {
            if (key.pokemon.url.split("/").slice(-2, -1)[0] < 150) {
              this.displayedPokemon.push({
                ...key.pokemon,
                id: key.pokemon.url.split("/").slice(-2, -1)[0]
              });
            }
          });
        } else {
          // resets filter to all types (DIY)
          this.displayedPokemon = this.pokemonList;
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

  beforeRouteUpdate(to, from, next) {
    if (!to.query.type) {
      this.selectedType = "all";
      this.displayedPokemon = this.pokemonList;
    }

    next();
  }
};

// sets intial data set
async function created() {
  try {
    const response = await getAllPokemon();
    this.pokemonList = response.results.splice(0, 151).map(key => {
      let id = key.url.split("/").slice(-2, -1)[0];

      return { ...key, id };
    });

    this.displayedPokemon = this.pokemonList;
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
