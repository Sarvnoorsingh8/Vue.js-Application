<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style>
nav {
  padding: 20px;
}

nav a {
  margin-right: 10px;
  color: #42b983;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #35495e;
}
</style>
