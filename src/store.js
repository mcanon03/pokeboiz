import Vue from "vue";
import Vuex from "vuex";
import * as pokeAPI from "./services/pokemon";

Vue.use(Vuex);

export default new Vuex.Store({
  // is information pulled from API
  state: {
    pokemonGenerations: [],
    // pokemonByGen: [],
    pokemon: [],

    // error handling
    error: null
  },
  mutations: {
    ADD_GENERATION: (state, gen) => {
      state.pokemonByGen.push(gen)
    },
    ADD_POKEMON: (state, pokemon) => {
      state.pokemon = pokemon;
    },
    ADD_GEN: (state, gen) => {
      state.pokemonGenerations = gen;
    },
    SET_ERROR: (state, error) => {
      state.error = error;
    }
  },
  getters: {
    pokemonWithGen(state) {
      return state.pokemon.map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];
        let gen = '';
        let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  
        if (id >= 1 && id <= 151) {
          gen = '1'
        } else if (id >= 152 && id <= 251) {
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
        
        return { ...key, id, gen, img };
    })
    },
    pokemonGenWithIdAndName(state) {
      return state.pokemonGenerations.map(key => {
        let id = key.url.split("/").slice(-2, -1)[0];
        let name = '';

        switch (id) {
          case "1":
            name = "Gen 1 (Blue/Red/Yellow)";
            break;
          case "2":
            name = "Gen 2 (Gold/Silver/Crystal)";
            break;
          case "3":
            name = "Gen 3 (Ruby/Sapphire/Emerald)";
            break;
          case "4":
            name = "Gen 4 (Diamond/Pearl/Platinum)";
            break;
          case "5":
            name = "Gen 5 (Black/White)";
            break;
          case "6":
            name = "Gen 6 (X/Y)";
            break;
          case "7":
            name = "Gen 7 (Sun/Moon)";
            break;
          default:
            name = "New Gen!";
            break;
        }
        return {...key, id, name};
      })
    }
  },
  // things that are asynchronous (ex: API calls)
  // components only access store through actions
  actions: {
    // context = store
    async getAllPokemon(context) {
      try {
        const response = await pokeAPI.getAllPokemon();
        context.commit('ADD_POKEMON', response.results)
      } catch (e) {
        context.commit('SET_ERROR', 'Failure to get all pokemon');
      }
    },

    async getAllPokemonGen(context) {
      try {
        const response = await pokeAPI.getAllPokemonGen();
        context.commit('ADD_GEN', response.results)
      } catch (e) {
        context.commit('SET_ERROR', 'Failure to get all pokemon generations');
      }
    },

    async getAllPokemonTypes(context) {
      try {
        const response = await pokeAPI.filterPokemonByType('fairy');
        console.log(response)
      } catch (e) {
        context.commit('SET_ERROR', 'Failure to get all pokemon generations');
      }
    }
  }
});
