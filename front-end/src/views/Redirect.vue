<template>
<div class="redirect">
  <Profile v-if="user" />
  <Login v-else />
</div>
</template>

<script>
import Profile from "../components/Profile.vue"
import Login from '../components/Login.vue';
import axios from 'axios';
export default {
  name: 'redirect',
  components: {
    Profile,
    Login,
  },
  async created() {
    try {
      console.log(this.$root.$data.user);
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
