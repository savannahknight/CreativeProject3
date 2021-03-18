<template>

<div class="wrapper">
  <div class="heading">
  <h1>Your Cart</h1>
  </div>
  <div class="empty">
  <h4 v-show="this.$root.$data.cart.length === 0">There are no items in your cart.</h4>
  </div>
  <div class="products">
    <div class="product" v-for="product in this.$root.$data.cart" :key="product.id">
      <div class="info">
        <h1>{{product.name}}</h1>
        <p>{{product.country}}</p>
      </div>
      <div class="image">
        <img :src="'/images/products/'+product.image">
      </div>
      <div class="price">
        <h2>{{product.price}}</h2>
        <p class="quantity">Quantity: {{product.quantity}}</p>
        <button class="auto" @click="removeItem(product.id)">Remove Item</button>
      </div>
      <hr size="8" width="100%" color="black">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
    }
  },
  computed: {
    cart() {
      return this.$root.$data.cart;
    }
  },
  methods: {
    removeItem(id) {
      let item = this.$root.$data.cart.find(item => item.id === id);
      const index = this.$root.$data.cart.indexOf(item);
      if(index > -1) {
        this.$root.$data.cart[index].quantity -= 1;
        if(this.$root.$data.cart[index].quantity === 0) {
          this.$root.$data.cart.splice(index, 1);
        }
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
}
.heading {
  display: flex;
  align-times: center;
  justify-content: center;
  text-align: center;
}
.empty {
  background: #F2921D;
  display: flex;
  justify-content: center;
  text-align: center;
}
.products {
  margin-top: 20px;
}
.product {
  margin: 10px;
  margin-top: 50px;
  width: 100%;
}
.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}
.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  justify-content: left;
}
.info {
  background: #5a9157;
  color: #000;
  padding: 10px 30px;
  height: 80px;
  width: 200px;
}
.info h1 {
  font-size: 16px;
}
.info h2 {
  font-size: 14px;
}
.info p {
  margin: 0px;
  font-size: 10px;
}
.quantity {
  display: flex;
  font-weight: bold;
  font-size: 18px;
  padding: 6px;
  margin-left: 20px;
  flex-wrap: wrap;
}
.price {
  display: flex;
}
button {
  height: 50px;
  background: #000;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  color: white;
  border: none;
}
.auto {
  margin-left: auto;
}
</style>
