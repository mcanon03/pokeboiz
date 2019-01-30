<template>
  <div>
    <select v-model="selectedOption" @change="notifySelection">
      <option v-for='option in options' :key='option.id'>
        {{ option[displayValue] }} 
      </option>
      <option>All</option>
    </select>
  </div>
</template>

<script>

const pokeDropdown = {
  name: 'pokeDropdown',
  props: [
    'options',
    'displayValue',
    'selected'
  ],
  data() {
    return {
      selectedOption: null
    }
  },
  methods: {
    notifySelection() {
      this.$parent.$emit('update', this.selectedOption)
    }
  },
  created() {
    this.selectedOption = this.selected;
  }
}

export default pokeDropdown;
</script>

<style scope>
</style>
