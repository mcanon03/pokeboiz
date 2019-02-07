<template>
  <div>
    <ul class="card-list">
      <li
        v-for='option in options' 
        :key='option.id'
      >
      </li>
    </ul>
  </div>
</template>

<script>

const pokeCardList = {  
  name: 'pokeCardList',
  props: [
    'options'
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

export default pokeCardList;
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
