<template>
<!-- when i refresh the page the vue content shows the fisrt & last name as emptpy -->
<!-- CSS for profile page/choose photo wont show up -->
<!-- margin at bottom of profile page -->
<div class="wrapper">
  <div class="heading">
  <h1>{{this.$root.$data.user.name}}'s Playlist</h1>

  <div class="search">
    <form class="pure-form">
      <i class="fa fa-search"></i><input v-model="searchText" placeholder="Search by title"/>
    </form>
  </div>
  </div>
  <div>
  <p class="amount">{{calcQuantity}} Songs In Your Playlist</p>
  <!-- <p class="amount"> {{calcTotalPlays}} Total Number of Songs Played </p> -->
  <p class = "amount"> Favorite Genre:  {{calcFavoriteGenre}} </p>
  </div>
  <div class="empty">
  <h4 v-show="this.$root.$data.playlist.length === 0">There are no songs in your playlist. Select more to start listening!</h4>
  </div>

  <div class="songs">
    <div class="container" v-for="song in songs" :key="song.id">
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
        <button class="play" @click="editSong(song._id)"><i class="fa fa-play"></i></button>
        <p class="quantity">Listened to {{timesPlayed(song)}} times</p>
        <p class="date" v-if="song.created">Played {{formatDate(song.created)}}</p>
        <button class="auto" @click="deleteSong(song._id)">Remove Song</button>
      </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Playlist',
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    calcQuantity(){
      return this.$root.$data.playlist.length;
    },
    // calcTotalPlays() {
    //   let totalPlays = 0;
    //   for(let i = 0; i < this.$root.$data.playlist.length; i++) {
    //     totalPlays += this.$root.$data.playlist[i].amountPlayed;
    //   }
    //   return totalPlays;
    // },
    calcFavoriteGenre() {
      if(this.$root.$data.playlist.length === 0) {
        return "Not Available Until Songs Are Added to Playlist";
      }
      let favoriteGenre = "";
      let indieList = this.$root.$data.playlist.filter(song => song.genre.toLowerCase() === "indie");
      let countryList = this.$root.$data.playlist.filter(song => song.genre.toLowerCase() === "country");
      let popList = this.$root.$data.playlist.filter(song => song.genre.toLowerCase() === "pop");
      let rbList = this.$root.$data.playlist.filter(song => song.genre.toLowerCase() === "r&b");
      let maxValue = Math.max(indieList.length, countryList.length, popList.length, rbList.length);
      if (indieList.length === maxValue) {
        favoriteGenre = "Indie";
      }
      if (countryList.length === maxValue) {
        favoriteGenre = "Country";
      }
      if (popList.length === maxValue) {
        favoriteGenre = "Pop";
      }
      else {
        favoriteGenre = "R&B";
      }
      return favoriteGenre;
    },
    playlist() {
      return this.$root.$data.playlist;
    },
    songs() {
      return this.$root.$data.playlist.filter(song => song.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    },

  },
  created() {
    this.getUserPlaylist();
    // try {
    //   let response = await axios.get("/api/users/" + this.$route.params.id + "/songs");
    //   this.$root.$data.playlist = response.data;
    //   return true;
    // }
    //   catch (error) {
    //     console.log(error);
    //   }
  },
  methods: {
    // getMessage() {
    //
    // }
    async getUserPlaylist() {
      // if (this.$root.$data.user == null) {
      //   this.getMessage();
      // }
      // else {
      try {
        let response = await axios.get("/api/users/songs/");
        this.$root.$data.playlist = response.data;
        return true;
      }
        catch (error) {
          console.log(error);
        }
      // }
    },
  timesPlayed(song) {
    if (song.amountPlayed === undefined) {
      return 0;
    }
    else {
      return song.amountPlayed;
    }
  },
  async editSong(id) {
    try {
      await axios.put("/api/users/songs/" + id);
      this.getUserPlaylist();
      return true;
    } catch (error) {
      console.log(error);
    }
  },
    playSong(id) {
      /*eslint-disable no-unused-vars*/
        let amountPlayed = 0;
        this.$root.$data.playlist.find((song) => {
          if (song.id === id) {
            if(song.amountPlayed === undefined) {
              song.amountPlayed = 1;
            }
            else {
              song.amountPlayed += 1;
            }
            this.$forceUpdate();
            return song.amountPlayed;
        }

      });
      /* eslint-enable no-unused-vars */
    },
    removeItem(id) {
      let item = this.$root.$data.playlist.find(item => item.id === id);
      const index = this.$root.$data.playlist.indexOf(item);
      this.$root.$data.playlist.splice(index, 1);
    },
    async deleteSong(id) {
      try {
        await axios.delete("/api/users/songs/" + id);
        this.getUserPlaylist();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>


<style scoped>
.contaienr {
  width: 100%;
}
.wrapper {
  display:flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
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
.heading h1 {
  margin-bottom: 30px;
}
.empty {
  background: inherit;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #3fcef2;
  margin-top: 40px;
}
.songs {
  margin-top: 20px;
  color: white;
}
.song {
  margin: 10px;
  margin-top: 50px;
  width: 250px;
  background: #d73ff2;
}
.song img {
  border: 2px solid #333;
  height: 250px;
  width: 250px;
  object-fit: cover;
}
.song .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  justify-content: left;
}
.info {
  background: #d73ff2;
  padding: 10px 30px;
  height: 80px;
  width: 200px;
}
.info h1 {
  font-size: 16px;
  background: inherit;
}
.info h2 {
  font-size: 14px;
  background: inherit;
}
.info p {
  margin: 0px;
  font-size: 10px;
  background: inherit;
}
.quantity {
  display: flex;
  font-weight: bold;
  font-size: 18px;
  margin-left: 20px;
  flex-wrap: wrap;
  background: inherit;
}
.genre {
  display: inline;
}
button {
  height: 50px;
  background: #000;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  color: white;
  border: none;
}
.auto {
  margin-left: auto;
}
.play {
  margin: 0;
}
.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  justify-content: center;
  color: #3fcef2;
  display: flex;
}
.amount {
  margin-top: 15px;
  color: #3fcef2;
}
form {
  display: table;
  width: 100%;
}
i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}
input {
  width: 100%;
  color: white;
  margin-left: auto;
  margin-right: auto;
  border: none !important;
  box-shadow: none !important;

}
.fa-play{
  color: green;
  font-size: 25px;
  background: inherit;
}
.play {
  background: inherit;
}
input {
  width: 100%;
  color:#d73ff2;
  margin-left: auto;
  margin-right: auto;
}
.search {
  display: flex;
  text-align: center;
  justify-content: center;
}
.date {
  background-color: #d73ff2;
  color: white;
  margin-left: 20px;
}
</style>
