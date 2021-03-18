<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('United States')" href="#" class="pure-menu-link">United States</a></li>
      <li class="pure-menu-item"><a @click="select('Canada')" href="#" class="pure-menu-link">Canada</a></li>
      <li class="pure-menu-item"><a @click="select('Mexico')" href="#" class="pure-menu-link">Mexico</a></li>
      <li class="pure-menu-item"><a @click="select('Brazil')" href="#" class="pure-menu-link">Brazil</a></li>
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
      country: '',
    }
  },
  computed: {
    products() {
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
