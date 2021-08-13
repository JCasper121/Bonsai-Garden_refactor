<template>
  <div class="menu-wrapper">
      <h1 class="header">
          Menu
      </h1>
          <div class="menu">
                <el-collapse title="Menu" accordion>
                    <el-collapse-item title="Appetizers" name="1">
                        <div v-for="item in appetizers" :key="item.id" class="collapse-item-content">
                            <div class="appetizer-item menu-item">

                                <div class="flex-item">
                                    <p class="item-title">{{item.title}}</p>
                                </div>

                                <div class="flex-item">
                                    <p>{{formattedPrice(item.price)}}</p>
                                </div>

                                <div class="flex-item">
                                        <div class="quantity-wrapper">
                                            <span  @click="decrementQuantity(item.id)" class="icon is-small">
                                                <i class="fas fa-minus" ></i>
                                            </span>
                                            <h3 class="quantity">{{ order[item.id] }}</h3>
                                            <span  @click="incrementQuantity(item.id)" class="icon is-small">
                                                <i class="fas fa-plus" ></i>
                                            </span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>

                
                    <el-collapse-item title="Main Dishes" name="2">
                        <div v-for="item in mains" :key="item.id" class="collapse-item-content">
                            <div class="main-item menu-item">

                                <div class="flex-item">
                                    <p class="item-title">{{item.title}}</p>
                                </div>

                                <div class="flex-item">
                                    <p>{{formattedPrice(item.price)}}</p>
                                </div>

                                <div class="flex-item">
                                    <div class="quantity-wrapper">
                                        <span  @click="decrementQuantity(item.id)" class="icon is-small">
                                            <i class="fas fa-minus" ></i>
                                        </span>
                                        <h3 class="quantity">{{ order[item.id] }}</h3>
                                        <span  @click="incrementQuantity(item.id)" class="icon is-small">
                                            <i class="fas fa-plus" ></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>


                    <el-collapse-item title="Sides" name="3">
                        <div v-for="item in sides" :key="item.id" class="collapse-item-content">
                            <div class="side-item menu-item">

                                <div class="flex-item">
                                    <p class="item-title">{{item.title}}</p>
                                </div>

                                <div class="flex-item">
                                    <p>{{formattedPrice(item.price)}}</p>
                                </div>

                                <div class="flex-item">
                                    <div class="quantity-wrapper">
                                        <span  @click="decrementQuantity(item.id)" class="icon is-small">
                                            <i class="fas fa-minus" ></i>
                                        </span>
                                        <h3 class="quantity">{{ order[item.id] }}</h3>
                                        <span  @click="incrementQuantity(item.id)" class="icon is-small">
                                            <i class="fas fa-plus" ></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
          </div>
  </div>
</template>

<script>
import shared from "../helper-functions/shared";

export default {
    name: "Menu",
    data() {
        return {
            appetizers: [],
            mains: [],
            sides: [],
            menu: [],
             order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    },
    created() {
        console.log("Shared: ", shared);
        this.formattedPrice = shared.formatPrice;
    },
    mounted() {
        const menu = this.$store.state.menu;
        this.menu = this.$store.state.menu;
        menu.forEach(item => {
            switch (item.category) {
                case "appetizer":
                    this.appetizers.push(item);
                    break;
                case "main":
                    this.mains.push(item);
                    break;
                case "side":
                    this.sides.push(item);
                    break;
                default:
                    this.sides.push(item);
            }
        })
        console.log("Menu: ", this.menu);
    },
    methods: {
        incrementQuantity(id) {
            console.log("Inside incrementQuantity menu[id]: ", this.menu[id])
            this.$store.dispatch('incrementQuantity', this.menu[id]);
                this.order[id] ++;
        },

        decrementQuantity(id) {
            this.$store.dispatch('decrementQuantity', this.menu[id]);
            if(this.order[id] !== 0) {
                console.log("Inside decrementQuantity")
                this.order[id] --;
            }
        },
    },

}
</script>

<style>
.el-collapse-item {
    border-bottom: 4px solid rgb(144,179,30);
    border-left: 4px solid rgb(144,179,30);
    border-right: 4px solid rgb(144,179,30);
    border-collapse: collapse;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    font-size: 1.2em;
    padding: 1em 0;
}

.el-collapse-item:nth-child(1) {
    border-top: 4px solid rgb(144,179,30);

}

.collapse-item-content:nth-of-type(odd) {
    background-color: rgba(144,179,30, 0.3);
}

.el-collapse-item__content {
    font-size: 1em;
}

.menu-item {    
    max-height: 2.5em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5em 0;
}


.flex-item {
    width: 33%;
}

.item-title {
    font-weight: 700;
}

.quantity-wrapper {
    display:flex;
    justify-content: center;
    align-items: center;

}

.quantity {
    padding: 10px;

}

.icon {
    padding: 5px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    background-color:rgb(184, 171, 171);
    border-radius: 5px;
}

.icon:active {
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);

}

</style>
