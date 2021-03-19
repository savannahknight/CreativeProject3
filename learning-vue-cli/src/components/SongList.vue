<template>
<div class="wrapper">
  <div class="songs">
    <div class="song" v-for="song in songs" :key="song.id">
      <div class="info">
        <h1 class="name">{{song.name}}</h1>
        <h2>{{song.artist}}</h2>
        <p>{{song.year}}</p>
      </div>
      <div class="image">
        <img :src= "require('/images/'+song.image)" width=200px>
      </div>
      <div class="genre">
        <h2>{{song.genre}}</h2>
        <button class="auto" @click="addItem(song.id, song.name, song.image, song.year, song.artist, song.genre)">Add to Playlist</button>
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
    addItem(id, name, image, year, artist, genre){
      let found = false;
      this.$root.$data.playlist.find((song) => {
        if (song.id === id) {
          found = true;
          return true;
        }
      });
      if (!found) {
        this.$root.$data.playlist.push({
          id: id,
          name: name,
          image: image,
          year: year,
          artist: artist,
          genre: genre
        });
      }
    },
  }
}
</script>

<style>
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
  color: white;
}
.song {
  margin: 10px;
  margin-top: 50px;
  width: 250px;
  background: #d73ff2;
}
.name {
  background: inherit;
  font-size: 25px;
  align-items: center;
  justify-content: center;
}
.genre {
  background: inherit;
}
.genre h2 {
  background: inherit;
  font-size: 18px;
  margin-left: 15px;
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
}
.info {
  background: #d73ff2;
  padding: 10px 30px;
  height: 100px;
  justify-content: center;
  align-items: center;
  align-text: center;

}
.info h1 {
  font-size: 20px;
}
.info h2 {
  font-size: 14px;
  background: inherit;
}
.info p {
  margin: 0px;
  font-size: 10px;
  background: inherit;
  justify-content: right;
}
.genre {
  display: flex;
}
button {
  height: 50px;
  background: #000;
  color: white;
  border-radius: 10px;
  border: none;
  margin: 5px;
  margin-right: 10px;
}
.auto {
  margin-left: auto;
}
</style>
