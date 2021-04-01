<template>
<div>
<h1>Login To Start Listening</h1>
  <form @submit.prevent="login">
      <p>Username:</p>
      <input type="text" v-model="username">
      <p>Password:</p>
      <input type="password" v-model="password">
      <div class="button">
        <button type="submit" @click="goToProfile()" class="login-button">Login</button>
      </div>
  </form>
    <p v-if="error" class="error">{{error}}</p>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    goToProfile(){
      this.$router.push('/profile');
    },
  }
}
</script>
<style scoped>
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}
.button {
  display: flex;
}
.login-button {
  margin-left: auto;
}
</style>
