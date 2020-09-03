<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/form">Form</router-link>
      <router-link to="/checkbox">Checkbox</router-link>
      <router-link to="/radio">Radio</router-link>
      <router-link to="/display">Display</router-link>
      <router-link to="/alert">Alert</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#nav {
  display: flex;
  flex-wrap: wrap;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
