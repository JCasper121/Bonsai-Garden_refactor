<template>
    <div class="order-wrapper">
        <h1 class="header">
          Order Details
        </h1>
        <div class="order-details">
            <el-collapse title="Order Details" v-model="activeNames" accordion>
              <el-collapse-item :title="formattedPrice" name="1" v-show="true">
              </el-collapse-item>

          
              <el-collapse-item title="Takeout/Delivery" name="2">
                <div class="collapse-item-content">
                  <div class="form-group">
                    <h3>Delivery</h3>
                    <input type="radio" name="delivery" value="delivery"> 
                  </div>
                  <div class="form-group">
                    <h3>Takeout</h3>
                    <input type="radio" name="delivery" value="takeout">
                  </div>
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
export default {
    name: "OrderDetails",
    data() {
      return {
        activeNames: ["1"],
      }
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
      formattedPrice() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        var formattedPrice = formatter.format(this.total);
        return formattedPrice;
    }
  },


}
</script>

<style>
.header {
  font-size: 2.5em;
  border-bottom: 4px solid rgb(144,179,30);
}
.el-collapse-item__header {
  font-size: 1.5em;
}

.order-wrapper {
  display: flex;
  flex-direction: column;
}


</style>