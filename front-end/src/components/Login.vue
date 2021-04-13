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
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login To Start Listening</legend>
        <input placeholder="Username" v-model="usernameLogin">
        <input type="password" placeholder="Password" v-model="passwordLogin">
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
  methods: {
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
  margin-bottom: 100px;
  width: 70%;
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
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
@media only screen and (max-width: 680px) {
    .container {
      width: 100%;
    }
  }
</style>
