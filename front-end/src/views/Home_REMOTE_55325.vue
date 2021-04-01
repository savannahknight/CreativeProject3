<template>
<div>
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fa fa-search"></i><input v-model="searchText" placeholder="Search by Title"/>
      </form>
    </div>
  </div>
  <SongList :songs="songs" />
</div>
</template>

<script>
import SongList from "../components/SongList.vue"
export default {
  name: 'Home',
  components: {
    SongList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    songs() {
      return this.$root.$data.songs.filter(song => song.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  color: #d73ff2;
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
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
  color: white;
}
.fa-search {
  font-color: #d73ff2;
}
@media only screen and (min-width : 150px) and (max-width: 780px) {
  .search {
    width: 95%;
    margin: 0 auto;
  }
}
</style>
