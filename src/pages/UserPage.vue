<template>
  <div>
    <h1>Your info</h1>
    <Loader v-if="isLoaderVisible" />
    <InfoUser v-else :userInfo="userInfo" />
  </div>
</template>

<script>
import InfoUser from "../components/InfoUser";
import Loader from "../components/MyLoader";

import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      userInfo: {},
      isLoaderVisible: true,
    };
  },
  components: {
    InfoUser,
    Loader,
  },
  computed: {
    ...mapGetters(["GET_USER"]),
  },
  methods: {
    ...mapActions(["getUserData"]),
  },
  async created() {
    try {
      await this.getUserData();
      this.userInfo = this.GET_USER;
      this.isLoaderVisible = false;
    } catch (error) {
      alert("Something is wrong");
      console.error(error);
    }
  },
};
</script>
