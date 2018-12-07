<template>
    <div>
        <el-button class='btn' v-for="(pokemonType, index) in pokemonTypes.results" :key="index">{{ pokemonTypes.results[index].name }}</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pokemonTypes: {
                    results: [{
                        name: ''
                    }]
                }
            }
        },
    
        async created() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/type/');
                this.pokemonTypes = await response.json();
            } catch (e) {
                console.error(e);
            }
    
        },
    }
</script>

<style>
    .btn {
        /* align-items: center; */
        text-transform: capitalize;
        padding: 1rem;
        width: 150px;
    }
</style>