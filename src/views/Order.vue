<template>
<div class="order-container">

    <div class="menu-component">
      <Menu/>
    </div>
    <div class="order-component">
      <OrderDetails/>
    </div>

</div>
</template>

<script>
import OrderDetails from "../components/OrderDetails.vue";
import Menu from "../components/Menu.vue";

export default {
  name: "Order",
  components: {
    Menu,
    OrderDetails
  }
}
</script>

<style>


.order-container {
  display: flex;
  padding: 1em;
  justify-content: space-evenly;
}

.menu-component, .order-component {
  width: 45%;
  text-align: center;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

@media  screen and (max-width: 855px) {
  .order-container{
    flex-direction: column;
  }

  .menu-component, .order-component {
    width: 100%;
    margin-top: 2em;
  }

}


</style>

