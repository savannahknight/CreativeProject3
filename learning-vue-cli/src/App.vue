<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <img src="/images/logo.png">
          </router-link>
      </div>
      <div id="side">
        <router-link to="/browse">
        <div class="menu-item browse">
          <img src="/images/globe.png">
          <p>Browse</p>
        </div>
      </router-link>
      <router-link to="/cart">
        <div class="menu-item">
          <img src="/images/love.png">
          <p>{{calcQuantity}} items</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
      <a href="https://github.com/savannahknight/CreativeProject3.git">Git Repository</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    calcQuantity(){
      let cartQuantity = 0;
      for(let i = 0; i < this.$root.$data.cart.length; i++ ) {
        cartQuantity += this.$root.$data.cart[i].quantity;
      }
      return cartQuantity;
    },
  },
}
</script>
<style>
* {
  box-sizing: border-box;
}
body {
  margin: 50px 100px;
}
#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}
#menu a {
  color: #B84901;
}
#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}
#brand img {
  height: 200px;
}
#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}
#side img {
  width: 50px;
}
.menu-item {
  display: flex;
  flex-direction: column;
}
.menu-item p {
  margin: 0px;
}
.browse {
  margin-right: 50px;
}
.footer {
  background: #F2921D;
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: black;
  height: 40px;
  text-align: center;
  padding: 10px;
}
.footer a{
  color: black;
}
a, a:hover, a:focus {
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}
</style>
