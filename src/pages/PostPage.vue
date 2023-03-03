<template>
  <div>
    <h1>POST PAGE</h1>
    <Loader v-if="loaderVis" />
    <div v-else class="container">
      <v-carousel>
        <v-carousel-item>
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <h1 class="h1-slider">{{ post.title }}</h1>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <h1 class="h1-slider">{{ post.description }}</h1>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import Loader from "../components/MyLoader";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      loaderVis: true,
      post: {},
    };
  },
  components: {
    Loader,
  },
  methods: {
    ...mapActions(["getPostById"]),
  },
  computed: {
    ...mapGetters(["GET_CURRENT_POST"]),
  },
  async created() {
    const id = this.$route.params.id;
    await this.getPostById(id);
    this.post = this.GET_CURRENT_POST;
    this.loaderVis = false;
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: #bbdefb;
}
.theme--dark.v-sheet {
  background-color: #bbdefb;
}
.h1-slider {
  max-width: 70%;
}
</style>
