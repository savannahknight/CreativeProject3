<template>
<div class="wrapper">
  <div class="songs">
    <div class="song" v-for="song in songs" :key="song.id">
      <div class="info">
        <h1>{{song.name}}</h1>
        <h2>{{song.artist}}</h2>
        <p>{{song.genre}}</p>
      </div>
      <div class="image">
        <img :src= "require('/images/'+song.image)" width=200px>
      </div>
      <div class="year">
        <h2>{{song.year}}</h2>
        <button class="auto" @click="addItem(song.id, song.name, song.image, song.year, song.artist)">Add to Playlist</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: Array
  },
  methods: {
    addItem(id, name, image, year, artist){
      let found = false;
      this.$root.$data.playlist.find((song) => {
        if (song.id === id) {
          song.quantity += 1;
          found = true;
          return true;
        }
      });
      if (!found) {
        this.$root.$data.playlist.push({
          id: id,
          quantity: 1,
          name: name,
          image: image,
          year: year,
          artist: artist
        });
      }
      this.$root.$data.calcQuantity += 1;
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.songs {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.song {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
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
}
.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}