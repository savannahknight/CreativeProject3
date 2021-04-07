<template>
<div class="heading">
<h1>Login To Start Listening</h1>
  <form @submit.prevent="goToProfile()">
    <div class= "username">
      <h5>Username:</h5>
      <input type="text" v-model="username" placeholder="Enter Text Here">
    </div>
    <div class = "password">
      <h5>Password:</h5>
      <input type="password" v-model="password" placeholder="Enter Text Here">
    </div>
    <div class="button">
      <button type="submit" class="login-button btn btn-primary">Login</button>
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
  border-color: white;
  background-color: black;
  border-radius: 4px;
  padding: 20px;
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
