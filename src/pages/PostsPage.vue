<template>
  <div>
    <h1>
      {{ token ? "Posts for users" : "Posts for guests" }}
    </h1>
    <div class="btns mt-2">
      <v-btn color="warning" block @click="exit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-door-closed"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"
          />
          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
        </svg>
        <span class="ml-1">
          {{ token == "user" ? "Logout" : "Authorization window" }}
        </span>
      </v-btn>

      <v-btn
        color="#90CAF9"
        class="mt-2"
        v-if="token"
        @click="$router.push({ name: 'UserPage' })"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-info-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          />
        </svg>
        <span class="ml-1">My information</span>
      </v-btn>

      <v-btn
        color="primary"
        class="mt-2"
        v-if="token"
        @click="isModalVis = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
        <span class="ml-1">Add post</span>
      </v-btn>
    </div>
    <div class="switch mt-2" v-if="token">
      <v-switch v-model="toggle" inset @change="switchToggle"></v-switch>
      <h3 class="switch-text">Only my posts</h3>
    </div>
    <AllPosts
      class="mt-2"
      :posts="posts"
      :user_id="user_id"
      @deletePost="deletePost"
    />
    <ModalAdd v-if="isModalVis" @close="close" @addPost="addPost" />
  </div>
</template>

<script>
import ModalAdd from "../components/ModalAdd";
import AllPosts from "../components/AllPosts";

import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      posts: [],
      user_id: null,
      token: false,
      isModalVis: false,
      toggle: false,
    };
  },
  components: {
    AllPosts,
    ModalAdd,
  },
  computed: {
    ...mapGetters(["GET_USER", "GET_POSTS"]),
  },
  methods: {
    ...mapActions([
      "GetAllPosts",
      "DeletePost",
      "AddPost",
      "FilterPosts",
      "GetUser",
    ]),
    exit() {
      this.$router.push({ name: "MainPage" });
      localStorage.clear();
    },
    close() {
      this.isModalVis = false;
    },
    async deletePost(id) {
      try {
        await this.DeletePost(id);
        this.$router.go(0);
      } catch (error) {
        console.error(error);
      }
    },
    async addPost(post) {
      try {
        await this.AddPost(post);
        this.$router.go(0);
        this.close();
      } catch (error) {
        alert("Something is wrong");
        console.error(error);
      }
    },
    async switchToggle() {
      try {
        if (this.toggle) {
          await this.FilterPosts(this.user_id);
        } else {
          await this.GetAllPosts();
        }
      } catch (error) {
        alert("Something is wrong");
        console.log(error);
      }
      this.posts = this.GET_POSTS;
    },
  },
  async created() {
    if (localStorage.token) {
      try {
        await this.GetAllPosts();
        this.posts = this.GET_POSTS;

        await this.GetUser();
        const userData = this.GET_USER;

        this.user_id = userData._id;
        this.token = true;
      } catch (error) {
        alert("Something is wrong");
        console.log(error);
      }
    } else {
      try {
        await this.GetAllPosts();
        this.posts = this.GET_POSTS;
      } catch (error) {
        alert("Something is wrong");
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.switch {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns {
  display: flex;
  flex-direction: column;
}
</style>
