<template>
  <div class="menu-wrapper">
      <h1 class="header">
          Menu
      </h1>
          <div class="menu">
                <el-collapse title="Menu" accordion>
                    <el-collapse-item title="Appetizers" name="1">
                        <div v-for="item in appetizers" :key="item.id" class="collapse-item-content">
                            <div class="flex-item">
                                <p class="item-title">{{item.title}}</p>
                            </div>

                            <div class="flex-item">
                                <p>{{formatPrice(item.price)}}</p>
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
                    </el-collapse-item>

                
                    <el-collapse-item title="Main Dishes" name="2">
                        <div v-for="item in mains" :key="item.id" class="collapse-item-content">
                            <div class="flex-item">
                                <p class="item-title">{{item.title}}</p>
                            </div>

                            <div class="flex-item">
                                <p>{{formatPrice(item.price)}}</p>
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
                    </el-collapse-item>


                    <el-collapse-item title="Sides" name="3">
                        <div v-for="item in sides" :key="item.id" class="collapse-item-content">
                            <div class="flex-item">
                                <p class="item-title">{{item.title}}</p>
                            </div>

                            <div class="flex-item">
                                <p>{{formatPrice(item.price)}}</p>
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
                    </el-collapse-item>
                </el-collapse>
          </div>
  </div>
</template>

<script>

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
        formatPrice(decimal) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            })

            var formattedPrice = formatter.format(decimal);
            return formattedPrice;
        }
    },
    computed: {
    }
}
</script>

<style>

.el-collapse {
    min-width: 400px;
}

.el-collapse-item {
    border-bottom: 4px solid rgb(144,179,30);
    border-left: 4px solid rgb(144,179,30);
    border-right: 4px solid rgb(144,179,30);
    border-collapse: collapse;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    font-size: 1.2em;
    padding: 1em 0;
}

.el-collapse-item__content {
    font-size: 1em;
}

.collapse-item-content {
    height: 2.5em;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
    background-color:rgba(0,0,0,0.12);
    border-radius: 5px;
}

.icon:active {
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);

}

</style>
