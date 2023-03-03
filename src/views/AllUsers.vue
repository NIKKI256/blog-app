<template>
  <div>
    <h1 class="font-weight-bold mt-4">Our users</h1>
    <Loader v-if="!users.length" />
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="user in users" :key="user._id">
          <v-list-item-content>
            <span class="font-weight-medium">{{ user.email }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import Loader from "../components/MyLoader";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      users: [],
    };
  },
  components: {
    Loader,
  },
  computed: {
    ...mapGetters(["GET_USERS"]),
  },
  methods: {
    ...mapActions(["getAllUsers"]),
  },
  async created() {
    await this.getAllUsers();
    this.users = this.GET_USERS;
  },
};
</script>
