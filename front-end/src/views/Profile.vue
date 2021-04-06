<template>
    <div class="container">
        <h1 id="Header">The Profile Page!</h1>
    <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="../../images/astronaut.png" alt="Admin" class="rounded-circle" width="150">
                    <div class="mt-3">
                      <h4>{{profile.name}}</h4>
                      <p class="text-secondary mb-1">{{profile.work}}</p>
                      <p class="text-muted font-size-sm">{{address}}</p>
                      <button @click="uploadPhoto" class="btn btn-primary">Upload Photo</button>
                      <button @click="deleteUser" class="btn btn-outline-primary">Delete Profile</button>
                      <button @click="editProfile" class="btn btn-outline-primary">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input v-model="profile.name" placeholder="Enter Text Here">
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input v-model="profile.email" placeholder="Enter Text Here">
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input v-model="profile.phone" placeholder="Enter Text Here">
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Occupation</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input v-model="profile.work" placeholder="Enter Text Here">
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">City</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input v-model="profile.city" placeholder="Enter Text Here">
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">State</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input v-model="profile.state" placeholder="Enter Text Here">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="empty">
        <h4 v-show="this.$root.$data.playlist.length === 0">There are no songs in your playlist. Select more to start listening!</h4>
        </div>

        <div class="songs">
          <div class="container" v-for="song in this.$root.$data.playlist" :key="song.id">
            <div class="song">
            <div class="info">
              <h1>{{song.name}}</h1>
              <h2>{{song.artist}}</h2>
              <p>{{song.year}}</p>
            </div>
            <div class="image">
              <img :src="require('/images/'+song.image)">
            </div>
            <div class="genre">
              <h2>{{song.genre}}</h2>
              <button class="play" @click="playSong(song.id)"><i class="fa fa-play"></i></button>
              <p class="quantity">Listened to {{timesPlayed(song)}} times</p>
              <button class="auto" @click="removeItem(song.id)">Remove Song</button>
            </div>
            </div>
          </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: "",
        email: "",
        phone: "",
        work: "",
        city: "",
        state: "",
        image: "",
      },
      addInfo: null,
      file: null,
      findProfile: null,
      findUser: "",
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
          let response = await axios.get("/api/users/" + this.$route.params.id);
          this.profile = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },

    async deleteUser() {
      try {
        await axios.delete("/api/users/" + this.$route.params.id);
        this.findUser = null;
        this.$router.push('/');
        // this.getProfile();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadPhoto() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
      }
      this.addInfo = r1.data;
      catch(error) {
        console.log(error);
      }
    }
    async editProfile() {
      try {
        await axios.put("/api/users/" + this.$route.params.id, {
          name: this.profile.name,
          email: this.profile.email,
          phone: this.profile.phone,
          work: this.profile.work,
          city: this.profile.city,
          state: this.profile.state,
          image: this.profile.image,
        });
        this.findUser = null;
        this.getProfile();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    address() {
         return this.profile.city + ', ' + this.profile.state;
    },
  },
}
</script>

<style scoped>
body{
    margin-top:20px;
    color: #1a202c;
    text-align: left;
    background-color: #e2e8f0;
}
.main-body {
    padding: 15px;
}
#header {
    justify-self: center;
}
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}
.container {
    color: pink;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}
.main-body {
    background-color: white;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}
input {
    color:aqua;
}
</style>
