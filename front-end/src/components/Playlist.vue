<template>

<div class="wrapper">
  <div class="heading">
  <h1>Your Playlist</h1>

  <div class="search">
    <form class="pure-form">
      <i class="fa fa-search"></i><input v-model="searchText" placeholder="Search by title"/>
    </form>
  </div>
  </div>
  <div>
  <p class="amount">{{calcQuantity}} Songs In Your Playlist</p>
  </div>
  <div class="empty">
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
  </div>
</div>
</template>

<script>
export default {
  name: 'Playlist',
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    calcQuantity(){
      return this.$root.$data.playlist.length;
    },
    playlist() {
      return this.$root.$data.playlist;
    },
    songs() {
      return this.$root.$data.songs.filter(song => song.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    },

  },
  methods: {
  timesPlayed(song) {
    if (song.amountPlayed === undefined) {
      return 0;
    }
    else {
      return song.amountPlayed;
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
    }
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
</style>
