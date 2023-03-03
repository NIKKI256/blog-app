<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app>
        <AllUsers />
      </v-navigation-drawer>

      <v-app-bar app>
        <SearchPost />
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AllUsers from "./views/AllUsers";
import SearchPost from "./views/SearchPost";
export default {
  name: "App",
  components: {
    AllUsers,
    SearchPost,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@media print {
  .v-navigation-drawer__content {
    position: inherit;
    z-index: 0;
    visibility: hidden;
  }

  header {
    visibility: hidden;
  }
}
</style>
