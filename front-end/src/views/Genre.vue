<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('Country')" href="#" class="pure-menu-link">Country</a></li>
      <li class="pure-menu-item"><a @click="select('Indie')" href="#" class="pure-menu-link">Indie</a></li>
      <li class="pure-menu-item"><a @click="select('Pop')" href="#" class="pure-menu-link">Pop</a></li>
      <li class="pure-menu-item"><a @click="select('R&B')" href="#" class="pure-menu-link">R&B</a></li>
    </ul>
  </div>
  <SongList :songs="songs" />
</div>
</template>

<script>
import SongList from "../components/SongList.vue"
export default {
  name: 'Genre',
  components: {
    SongList
  },
  data() {
    return {
      genre: '',
    }
  },
  computed: {
    songs() {
      return this.$root.$data.songs.filter(song => song.genre === this.genre);
    }
  },
  methods: {
    select(genre) {
      this.genre = genre;
    }
  }
}
</script>

<style scoped>
.pure-menu-list li{
  display: inline;
  margin-left: 65px;
}
.pure-menu-item {
  padding-right: 0;
  padding-left: 50px;
}
@media only screen and (min-width : 150px) and (max-width: 499px) {
  .pure-menu-list li{
    display: inline;
    margin-left: 0;
  }
  .pure-menu-item {
    padding: 20px;
    padding-left: 0;
  }
}
@media only screen and (min-width : 500px) and (max-width: 900px) {
  .pure-menu-list li{
    display: inline;
    margin-left: 0;
  }
  .pure-menu-item {
    padding: 50px;
    padding-left: 40px;
  }
}
</style>
