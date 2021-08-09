<template>
    <div class="order-wrapper">
        <h1 class="header">
          Order Details
        </h1>
        <div class="order-details">
            <el-collapse title="Order Details" v-model="activeNames" accordion>
              <el-collapse-item :title="formattedPrice(total)" name="1" v-show="true" class="order-quantities">
                
                <div v-for="item in orderList" :key="item.id" class="order-list-item">
                  <div class="flex-item">
                    {{item.title}}
                  </div>
                  
                  <div class="flex-item quantity-wrapper"> 
                     <div class="item-quantity"><i class="fas fa-times"></i> {{item.quantity}}</div>
                  </div>
                </div>
              </el-collapse-item>

          
              <el-collapse-item title="Takeout/Delivery" name="2">
                <div class="radio-button-wrapper">
                      <el-radio v-model="deliveryBool" name="delivery" :value="true" :label="true"> Delivery</el-radio>
                      <el-radio v-model="deliveryBool" name="delivery" :value="false" :label="false"> Takeout</el-radio>
                </div>
                <!-- <button @click.prevent="logDeliveryBool">Log</button> -->
                <div id="map-container" v-if="deliveryBool">
                    <!-- <span class="warning">The maximum delivery distance is 5 miles</span><br> -->
                    Map
                    <GoogleMap/>
                </div>
              </el-collapse-item>


              <el-collapse-item title="Checkout" name="3">
                  <div class="collapse-item-content">
                      Checkout
                  </div>
              </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import shared from "../helper-functions/shared";
import GoogleMap from "./GoogleMap.vue";

export default {
    name: "OrderDetails",
    components: {
      GoogleMap
    },
    data() {
      return {
        activeNames: ["1"],
        deliveryBool: false,
      }
    },
    created() {
      this.formattedPrice = shared.formatPrice;
    },
    computed: {
      orderList() {
          var orderList = this.$store.getters.getOrder
          return orderList;
      },
      total() {
          var menu = this.$store.getters.getMenu;
          var total = 0;
          for(var i = 0; i < this.orderList.length; i++) {
            //   Calculate total
              var foodId = this.orderList[i].foodId;
              var quantity = this.orderList[i].quantity;
              var menuItem = menu.find(i => i.id === foodId);
              var itemPrice = menuItem.price * quantity;
              total += itemPrice;
          }
          return total;
      },
  },
  methods: {
    logDeliveryBool() {
      console.log("Delivery Bool: ", this.deliveryBool);
    }
  }


}
</script>

<style>
.header {
  font-size: 2.5em;
}
.el-collapse-item__header {
  font-size: 1.5em;
  padding-bottom: 0.3em;
}

.radio-button-wrapper {
  display: flex;
  justify-content: space-around;

}


.order-wrapper {
  display: flex;
  flex-direction: column;
}

.order-quantities {
  padding: 1em;

}

.order-list-item {
  display: flex;
  justify-content: space-around;
  text-align: left;
  padding: 0.3em;
  font-size: 1em;
  font-weight: bold;
}

.quantity-wrapper {
  text-align: center;
  font-size: 1.2em;
}

.order-list-item:nth-of-type(odd) {
  background-color: rgba(144,179,30, 0.3);
}


</style>