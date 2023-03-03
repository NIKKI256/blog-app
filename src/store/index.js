import Vue from "vue";
import Vuex from "vuex";
import PostsApi from "../api/posts/index";
import UsersApi from "../api/users/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_token: null,
    user: {},
    current_post: {},
    posts: [],
    users: [],
  },
  getters: {
    GET_USER_TOKEN(state) {
      return state.user_token;
    },
    GET_USER(state) {
      return state.user;
    },
    GET_CURRENT_POST(state) {
      return state.current_post;
    },
    GET_POSTS(state) {
      return state.posts;
    },
    GET_USERS(state) {
      return state.users;
    },
  },
  mutations: {
    SET_USER_TOKEN(state, payload) {
      state.user_token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_CURRENT_POST(state, payload) {
      state.current_post = payload;
    },
    SET_POSTS(state, payload) {
      state.posts = payload;
    },
    SET_USERS(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    async getAllUsers({ commit }) {
      const { data } = await UsersApi.users.getAllUsers();
      commit("SET_USERS", data);
    },
    //USER REQUESTS
    async registerUser(_, newUser) {
      await UsersApi.users.register({ ...newUser });
    },
    async loginUser({ commit }, form) {
      const { data } = await UsersApi.users.login({ ...form });
      localStorage.setItem("token", data.token);
      commit("SET_USER_TOKEN", data.token);
    },
    async GetUser({ commit }) {
      const { data } = await UsersApi.users.getUserData();
      commit("SET_USER", data);
    },
    async getUserData({ commit }) {
      const { data } = await UsersApi.users.getUserData();
      commit("SET_USER", data);
    },
    async DeleteUser(_, id) {
      await UsersApi.users.deleteUser(id);
    },
    async uploadAvatar(_, { fd, id }) {
      const data = { payload: fd, id };
      await UsersApi.users.uploadAvatar(data);
    },
    //POSTS REQUESTS
    async GetAllPosts({ commit }) {
      const { data } = (await PostsApi.posts.getAllPosts()).data;
      commit("SET_POSTS", data);
    },
    async DeletePost(_, id) {
      await PostsApi.posts.deletePost(id);
    },
    async AddPost(_, post) {
      await PostsApi.posts.addPost(post);
    },
    async FilterPosts({ commit }, id) {
      const { data } = await PostsApi.posts.filterPosts(id);
      commit("SET_POSTS", data);
    },
    async updatePost(_, { update, id }) {
      const data = { payload: update, id };
      await PostsApi.posts.updatePostById(data);
    },
    async getPostById({ commit }, id) {
      const { data } = await PostsApi.posts.getPostById(id);
      commit("SET_CURRENT_POST", data);
    },
  },
});
