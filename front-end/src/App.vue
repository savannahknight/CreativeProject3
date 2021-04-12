<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <img src="../images/logo2.jpg">
          </router-link>
      </div>
      <div id="side">
      <div class="menu-item">
        <router-link to="/redirect"><i class="fa fa-user fa-2x"></i></router-link>
        <p v-show="user">Profile</p>
        <p v-show="!user">Login</p>
      </div>
      <router-link to="/genre">
        <div class="menu-item">
          <i class="fa fa-globe fa-2x"></i>
          <p>Browse</p>
        </div>
      </router-link>
      <!-- <p v-else><a @click="logout"></a>Logout</p> -->
      <!-- <router-link :to="{path: '/profile/' + this.$root.$data.id}">
        <div class="menu-item">
          <i class="fa fa-user fa-2x"></i>
          <p>Profile</p>
        </div>
      </router-link> -->

      <router-link :to="{path: '/playlist/' + this.$root.$data.id}">
        <div class="menu-item">
          <i class="fa fa-music fa-2x"></i>
          <p>Playlist</p>
        </div>
      </router-link>
    </div>
    <button v-if="user" @click="logout" class="logout-button btn btn-primary">Logout</button>
  </div>
  <router-view />
    <div class="footer">
      <div class="footer-link">
        <a href="https://github.com/savannahknight/CreativeProject3.git">Git Repository</a>
      </div>
      <div class="bottom">
        &copy; savannahbyu.com | Created by Savannah Knight and Justin Hill
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
  async logout() {
    try {
      await axios.delete("/api/users");
      this.$root.$data.user = null;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
}

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
i {
  margin: auto;
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
  margin: 5px;
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
  height: 80px;
  text-align: center;
  padding: 10px;
  padding-top: 20px;
}
.bottom {
  color: white;
}
.footer-link a{
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
.logout-button {
  width: 80px;
}
</style>
