<template>
  <div>
    <h1 class="header">{{ pokemon.name }}</h1>

    <h2 class="header">Default Form</h2>
    <ul>
      <li
        class="img"
        v-for="defaultSprite in defaultSprites"
        :key="defaultSprite"
      >
        <img :src="defaultSprite" />
      </li>
    </ul>

    <h2 class="header">Shiny Form</h2>
    <ul>
      <li class="img" v-for="shinySprite in shinySprites" :key="shinySprite">
        <img :src="shinySprite" />
      </li>
    </ul>

    <h2 class="header">Type</h2>
    <p class="header list" v-for="type in pokemon.types" :key="type.name">
      {{ type.type.name }}
    </p>

    <h2 class="header">Moves</h2>
    <ul class="col-4">
      <li class="list" v-for="move in pokemon.moves" :key="move.name">
        {{ move.move.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemon: {
        name: "",
        sprites: {
          // need to default keys?
        },
        types: [
          {
            type: {
              name: ""
            }
          }
        ],
        moves: [
          {
            move: {
              name: ""
            }
          }
        ]
      }
    };
  },

  async created() {
    // params = parameters
    // set of arguments that is getting passed in
    // whole bunch of options being used
    try {
      const name = this.$route.params.name;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      );
      this.pokemon = await response.json();
    } catch (e) {
      console.error(e);
    }
  },

  computed: {
    defaultSprites() {
      const spriteKey = Object.keys(this.pokemon.sprites);

      return spriteKey
        .filter(key => !key.includes("shiny"))
        .reduce((obj, key) => {
          if (this.pokemon.sprites[key] != null) {
            obj[key] = this.pokemon.sprites[key];
          }
          return obj;
        }, {});
    },

    shinySprites() {
      const spriteKey = Object.keys(this.pokemon.sprites);

      return spriteKey
        .filter(key => key.includes("shiny"))
        .reduce((obj, key) => {
          if (this.pokemon.sprites[key] != null) {
            obj[key] = this.pokemon.sprites[key];
          }
          return obj;
        }, {});
    }
  }
};
</script>

<style scoped>
* {
  text-transform: capitalize;
}

ul {
  list-style: none;
  text-align: center;
}

.header {
  text-align: center;
}

.col-4 {
  columns: 4;
}

.img {
  display: inline;
}
</style>
