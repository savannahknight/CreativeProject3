<template>

<div class="wrapper">
  <div class="heading">
  <h1>Your Playlist</h1>
  <div class="search">
    <form class="pure-form">
      <i class="fa fa-search"></i><input v-model="searchText" placeholder="Search Here"/>
    </form>
  </div>
  </div>

  <div class="empty">
  <h4 v-show="this.$root.$data.playlist.length === 0">There are no songs in your playlist. Select more to start listening!</h4>
  </div>
  <div class="songs">
    <div class="song" v-for="song in this.$root.$data.playlist" :key="song.id">
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
        <i class="fa fa-play"></i>
        <p class="quantity">Listened to {{song.quantity}} times</p>
        <button class="auto" @click="removeItem(song.id)">Remove Song</button>
      </div>
      <hr size="8" width="100%" color="black">
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
    playlist() {
      return this.$root.$data.playlist;
    },
    songs() {
      return this.$root.$data.songs.filter(song => song.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  },
  methods: {
    removeItem(id) {
      let item = this.$root.$data.playlist.find(item => item.id === id);
      const index = this.$root.$data.playlist.indexOf(item);
      if(index > -1) {
        this.$root.$data.playlist[index].quantity -= 1;
        if(this.$root.$data.playlist[index].quantity === 0) {
          this.$root.$data.playlist.splice(index, 1);
        }
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  display:flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
}
.heading {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #3fcef2;
  width: 100%;
  
}
.empty {
  background: inherit;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #3fcef2;
}
.songs {
  margin-top: 20px;
  color: white;
}
.song {
  margin: 10px;
  margin-top: 50px;
  width: 100%;
  background: #d73ff2;
}
.song img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
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
  padding: 6px;
  margin-left: 20px;
  flex-wrap: wrap;
}
.genre {
  display: flex;
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
.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
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
.fa-play{
  color: green;
  font-size: 25px;
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
