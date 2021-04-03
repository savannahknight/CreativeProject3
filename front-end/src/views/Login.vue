<template>
<div class="heading">
<h1>Login To Start Listening</h1>
  <form @submit.prevent="goToProfile()">
      <p>Username:</p>
      <input type="text" v-model="username">
      <p>Password:</p>
      <input type="password" v-model="password">
      <div class="button">
        <button type="submit" class="login-button">Login</button>
      </div>
  </form>
    <p v-if="error" class="error">{{error}}</p>
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
      error: '',
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
    async uploadUser() {
      try {
        await axios.post("/api/users", {
          username: this.username,
          password: this.password,
        });
      }
        catch (error) {
          console.log(error);
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
  background-color: white;
  border-radius: 4px;
  padding: 20px;
}
.button {
  display: flex;
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
</style>
