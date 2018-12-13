<template>
  <div id="app">
    <div id="nav">
      <h1>Pokemon Gen 1</h1>
      <div>
        <router-link to="/pokemon">Home</router-link> |
        <router-link to="/type">Types</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  font-family: "Montserrat Alternates", Arial, Helvetica, sans-serif;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
