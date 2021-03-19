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
}
.pure-menu-item {
  padding: 20px;
}

</style>
