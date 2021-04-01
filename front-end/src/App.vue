<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <img src="../images/logo2.jpg">
          </router-link>
      </div>
      <div id="side">
        <router-link to="/genre">
        <div class="menu-item genre">
          <i class="fa fa-globe fa-2x"></i>
          <p>Genre</p>
        </div>
      </router-link>
      <router-link to="/playlist">
        <div class="menu-item">
          <i class="fa fa-music fa-2x"></i>
          <p>Playlist</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
    <div class="footer">
      <a href="https://github.com/savannahknight/CreativeProject3.git">Git Repository</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    
  },
}
</script>
<style>
* {
  box-sizing: border-box;
  background: black;
  font-family: 'Roboto Condensed', sans-serif;
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
  color: red;
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
  color: #3fcef2;
  margin-left: 20px;
}
#side img {
  width: 50px;
}
.menu-item {
  display: flex;
  flex-direction: column;
  color: #3fcef2;
}
.menu-item p {
  margin: 0;
}
.genre {
  margin-right: 50px;
}
.footer {
  background: black;
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  padding: 10px;
}
.footer a{
  color: white;
}
a, a:hover, a:focus {
  color: #3fcef2;
  text-decoration: none;
  transition: all 0.3s;
}
.fa {
  color: #3fcef2;
  align-items: flex-end;
}
</style>
