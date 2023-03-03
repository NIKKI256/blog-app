<template>
  <div>
    <v-btn
      color="#BBDEFB"
      class="mt-2"
      @click="$router.push({ name: 'PostsPage' })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-file-post"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8z"
        />
        <path
          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
        />
      </svg>
      <span class="ml-1">Posts page</span>
    </v-btn>
    <div>
      <div class="mt-2">
        <input
          name="file"
          type="file"
          ref="file"
          class="field field__file"
          @change="putAvatar(userInfoObj._id)"
        />
        <DragDrop @upload_avatar="upload_avatar" />
      </div>
    </div>
    <div class="content mt-2">
      <img v-if="noAvatar" class="user-avatar" :src="userInfoObj.avatar" />
      <img v-else class="user-avatar" :src="userInfoObj.avatar" />
      <h2>Login: {{ userInfoObj.name }}</h2>
      <h2>Email: {{ userInfoObj.email }}</h2>
      <h2>Date of created: {{ userInfoObj.dateCreated }}</h2>

      <v-btn color="error" class="mt-2" @click="deleteUser(userInfoObj._id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-backspace"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"
          />
          <path
            d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"
          />
        </svg>
        <span class="ml-1">Delete my account</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import DragDrop from "./DragDrop";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      avatar: null,
      noAvatar: true,
      mouseClass: false,
      userInfoObj: {},
    };
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    DragDrop,
  },
  methods: {
    ...mapActions(["DeleteUser", "uploadAvatar"]),
    async deleteUser(id) {
      await this.DeleteUser(id);
      this.$router.push("/");
    },
    async upload_avatar(avatar) {
      const id = this.userInfoObj._id;

      const fd = new FormData();
      fd.append("avatar", avatar);

      try {
        await this.uploadAvatar({ fd, id });
        this.$router.go(0);
      } catch (error) {
        alert("Что-то пошло не так");
        console.error(error);
      }
    },
  },
  created() {
    const base_url = process.env.VUE_APP_URL;
    const address = this.userInfoObj.avatar;
    const img_no_user =
      "https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-";
    try {
      if (!address) {
        this.userInfoObj.avatar = img_no_user;
        return;
      }
      var img = new Image();
      img.src = `${base_url}${address}`;
      img.onload = () => (this.userInfoObj.avatar = img.src);
      img.onerror = () => (this.userInfoObj.avatar = img_no_user);
    } catch (error) {
      alert("Something is wrong");
      this.userInfoObj.avatar = img_no_user;
      console.error(error);
    }
    this.userInfoObj = this.userInfo;
  },
};
</script>

<style scoped>
.content {
  background-color: #fff176;
  border: solid 1px #fbc02d;
  border-radius: 15px;
  padding: 5px;
}

.field__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.user-avatar {
  border-radius: 15px;
  min-width: 150px;
  min-height: 150px;
  max-width: 150px;
  max-height: 150px;
}
</style>
