<template>
  <div>
    <h2> Sup </h2>
  </div>
</template>

<script>

const pokeCards = {
  name: 'pokeCards',
  props: [

  ],
  data() {
    return {
    }
  },
  methods: {

  },
  created() {

  }
}

export default pokeCards;
</script>

<style scope>
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
