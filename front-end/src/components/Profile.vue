<template>
    <div class="container">
        <h1 id="Header">Your Profile</h1>
    <div class="main-body">
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <div class="upload" v-if="addPhoto != null && addPhoto !=''">
                      <img :src="addPhoto" class="rounded-circle" width="150">
                    </div>
                    <div class="upload-default" v-else>
                      <img src="../../images/profile.png" class="rounded-circle" width="150" alt="This is the default photo">
                    </div>
                    <div class="mt-3">
                      <h4>{{profile.name}}</h4>
                      <p class="text-secondary mb-1">{{profile.work}}</p>
                      <p class="text-muted font-size-sm">{{address}}</p>
                      <input class="upload-photo" type="file" name="photo" @change="photoChanged">

                      <button @click="deleteUser" class="btn btn-outline-primary">Delete Profile</button>
                      <button @click="editProfile" class="btn btn-primary">Save Changes</button>
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
      addPhoto: null,
      file: null,
      findProfile: null,
      findUser: "",
    }
  },
  created() {
    this.getProfile();
    console.log("loadingProfile");
  },
  methods: {
    async getProfile() {
      try {
          let response = await axios.get("/api/users");
          this.profile = response.data.user;
          this.$root.$data.user = response.data.user;
          this.addPhoto = this.profile.image;
          return true;
        } catch (error) {
          this.$root.$data.user = null;
          console.log(error);
        }
      },

    async deleteUser() {
      try {
        await axios.delete("/api/users");
        this.findUser = null;
        this.$root.$data.user = null;
        this.$router.push('/');
        // this.getProfile();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users/logout");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async uploadPhoto() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.put('/api/photos', {
          image: r1.data.image,
        });
        this.addPhoto = r2.data.image;
      } catch(error) {
        console.log(error);
      }
    },
    photoChanged(event) {
      this.file = event.target.files[0]
      this.uploadPhoto();
    },
    async editProfile() {
      try {
        await axios.put("/api/users", {
          name: this.profile.name,
          email: this.profile.email,
          phone: this.profile.phone,
          work: this.profile.work,
          city: this.profile.city,
          state: this.profile.state,
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
    user() {
      return this.$root.$data.user;
    }
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
    margin-bottom: 25px;
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
    margin-bottom: 30px;
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
.upload-photo{
  color: black;
  margin-bottom: 20px;
}
@media only screen and (max-width: 400px) {
    .mt-3 {
      display:flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
