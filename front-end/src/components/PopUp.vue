<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <div class="notice">
        <h2 class="text">You are signed out</h2>
        <p class="sign-text">Sign in to add songs to your playlist</p>
      </div>
      <div class="buttons">
        <router-link to="/redirect"><button class="logout-button btn btn-primary">Log in</button></router-link>
        <router-link to="/redirect"><button class="btn btn-primary">Sign up</button></router-link>
        <button type="button" @click="close" class="pure-button">Close</button>
      </div>
    </div>
  </div>
</transition>
</template>
<!-- not registering that i am logged out when i click to sign in -->
<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 50%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px white;
  transition: all 0.5s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Form */

form {
  font-size: 11pt;
  background-color: white;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
}

.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}
.buttons {
  display: flex;
  justify-content: space-between;
  background-color: white;
}
.notice{
  text-align: center;
  background-color: white;
}
.text {
  font-size: 30px;
  color: black;
}
.sign-text {
  color: black;
  background-color: white;
}
</style>
