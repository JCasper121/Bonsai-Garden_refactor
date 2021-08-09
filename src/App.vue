<template>
  <Banner/>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <span class="nav-spacer"><a>|</a></span>
    <router-link to="/order">Order</router-link>
  </div>
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
  font-size: 1.5em;
  color: #535f6b;
}

.nav-spacer {
  padding: 0 0.5em;
}

#nav a.router-link-exact-active {
  color: #15202b;
}
</style>
