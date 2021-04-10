<template>
<div class="heading">
  <div class="container">
    <form class="pure-form">
      <fieldset>
        <legend>Register For An Account</legend>
        <input placeholder="Full Name" v-model="name">
      </fieldset>
      <fieldset>
        <input placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
      </fieldset>
      <fieldset>
        <div class="button">
          <button type="submit" class="login-button btn btn-primary" @click.prevent="uploadUser">Register</button>
        </div>
      </fieldset>
          <!-- <form @submit.prevent="goToProfile()"> -->
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login To Start Listening</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <div class="button">
          <button type="submit" class="login-button btn btn-primary" @click.prevent="login">Login</button>
        </div>
      </fieldset>
      </form>
        <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      name: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
      users:[],
    }

  },
  created: async function(){
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        return true;
      }
        catch (error) {
          console.log(error);
        }
    },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data;
        console.log(this.users);
        return true;
      }
        catch (error) {
          console.log(error);
        }
    },
    // register a user
    async uploadUser() {
      this.error = '';
      this.errorLogin = '';
      if (!this.name || !this.username || !this.password)
        return;
      try {
        let response = await axios.post("/api/users", {
          name: this.name,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
          this.error = error.response.data.message;
          this.$root.$data.user = null;
        }
    },
    // login a user
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async goToProfile(){
      let userArray = this.users.map(user=>user.username);
      if(userArray.includes(this.username)) {
        this.$root.$data.id = this.users[userArray.indexOf(this.username)]._id
        this.$router.push('/profile/' + this.users[userArray.indexOf(this.username)]._id);
      }
      else {
        console.log("not in array");
        await this.uploadUser();
        await this.getUsers();
        userArray = await this.users.map(user=>user.username);
        this.$root.$data.id = this.users[userArray.indexOf(this.username)]._id
        this.$router.push('/profile/' + this.users[userArray.indexOf(this.username)]._id);
      }
    },
  }
}
</script>
<style scoped>
form {
  border: 1px solid #ccc;
  border-color: white;
  background-color: black;
  border-radius: 4px;
  padding: 20px;
}
.space-above {
  margin-top: 50px;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-button {
  margin-left: auto;
}
input {
  width: 100%;
  color: white;
  margin-left: auto;
  margin-right: auto;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #3fcef2;
  width: 100%;
  flex-direction: column;
  align-content: center;
}
.container {
  text-align: center;
}
.heading form{
  font-size: 14px;
}
.heading form legend{
  font-size: 20px;
}
.username {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.password {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
input {
  color: #3fcef2;
  padding-right: 25px;
  margin-left: 25px;
}
</style>
