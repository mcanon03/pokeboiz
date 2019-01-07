import Pokemon from "@/views/pokemon.vue";
import SinglePokemon from "@/views/singlePokemon.vue";
import GenDropdown from "@/components/genDropdown.vue"

export default [
  {
    path: "/pokemon",
    name: "home",
    component: GenDropdown
  },
  {
    path: "/pokemon/:name",
    name: "pokemon",
    component: SinglePokemon
  },
  {
    // if path doesn't match any defined route, it will redirect to /pokemon
    path: "*",
    redirect: "/pokemon"
  }
];
