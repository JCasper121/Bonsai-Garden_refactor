<template>

    <div class="banner-wrapper">
      <h1 class="banner-text">Bonsai Garden</h1>
    </div>

</template>

<script>
    export default {
        name: "Banner",
    }
</script>

<style  scoped>

.banner-wrapper {
    width: 100%;
    background-size: cover;
    padding: 4em 0;
    position: relative; 
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: black;
}

.banner-wrapper::before {    
    background-position: center;
    background-repeat: no-repeat;
    content: "";
    background-image: url("../assets/sushi_banner.jpg");
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.5;
}

.banner-text {
  color: rgb(144,179,30);
  position: relative;
  font-size: 5rem;
  line-height: 0.9;
  text-align: center;
}
</style>