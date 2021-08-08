<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/order">Order</router-link>
  </div>
  <Banner/>
  <router-view/>
</template>

 <script>
 import Banner from "./components/Banner.vue";

  export default {
    name: "App",
    components: {
      Banner
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: rgb(144,179,30);

}

#nav a {
  font-weight: bold;
  color: #535f6b;
}

#nav a.router-link-exact-active {
  color: #15202b;
}
</style>
