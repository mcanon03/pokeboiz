import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Pokemon from "@/views/Pokemon.vue";
import Type from "@/views/Type.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/pokemon",
      name: "home",
      component: Home
    },
    {
      path: "/type",
      name: "type",
      component: Type
    },
    {
      path: "/pokemon/:name",
      name: "pokemon",
      component: Pokemon
    },
    {
      // if path doesn't match any defined route, it will redirect to /pokemon
      path: "*",
      redirect: "/pokemon"
    }
  ]
});
