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
                      <div class="item-quantity">
                          <i class="fas fa-times"></i>
                          {{item.quantity}}
                      </div>
                    </div>
                  </div>

                </el-collapse-item>

            
                <el-collapse-item title="Takeout/Delivery" name="2">

                      <div class="radio-button-wrapper">
                          <div class="radio-button">
                            <label class="radio-label" for="takeout">Takeout</label>
                            <input id="takeout" class="radioButton" v-model='deliveryBool' type="radio" name="deliveryBool" value="false">
                          </div>
                          <div class="radio-button">
                            <label for="delivery">Delivery</label>
                            <input id="delivery" class="radioButton" v-model='deliveryBool' type="radio" name="deliveryBool" value="true">
                          </div>
                      </div>


                      <div 
                        id="map-container" 
                        class="hide">
                          <GoogleMap/>
                      </div>
                </el-collapse-item>


                <el-collapse-item title="Checkout" name="3">
                        Checkout
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import shared from "../helper-functions/shared";
// import GoogleMap from "./GoogleMap.vue";
import GoogleMap from "./GoogleMap.vue";

export default {
    name: "OrderDetails",
    components: {
      GoogleMap
    },
    data() {
      return {
        activeNames: ["1"],
        // gets set to false on first update() after mounting
        deliveryBool: "false",
      }
    },
    watch: {
      deliveryBool: function() {
        this.showOrHideMap();
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
    showOrHideMap() {
      //   Keeps toggle-to-show elements in sync
        if(this.deliveryBool == "true") {
            document.getElementById("map-container").removeAttribute("class");
            document.getElementById("address-form").removeAttribute("class");
        } else {
          document.getElementById("map-container").setAttribute("class", "hide");
            document.getElementById("address-form").setAttribute("class", "hide");
        }
    }
  },
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
  width: 100%;
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

.delivery {
  display: flex;
}

@media  screen and (max-width: 500px) {
  .delivery{
    flex-direction: column;
  }
}

.hide {
  display: none;
}



</style>