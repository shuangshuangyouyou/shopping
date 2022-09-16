import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 监管token
export default new Vuex.Store({
  state: {
    token: "",
    userInfo: "" || localStorage.getItem("userInfo"),
    username: "",
  },
  getters: {
    userInfo: (state) => state.userInfo,
  },
  mutations: {

    // 存储token
    setToken(state, token) {
      state.token = token;
      window.localStorage.setItem("token", token);
    },

    // 存储用户信息
    User_Info(state, userInfo) {
      state.userInfo = userInfo;
      window.localStorage.setItem("userInfo", userInfo);
    },

    // 存储用户名
    setusername(state, username) {
      state.username = username;
      window.localStorage.setItem("username", username);
    },

    // 存储头像
    setuavatar(state, avatar) {
      state.avatar = avatar;
      window.localStorage.setItem("avatar", avatar);
    },

    // 清除token
    delToken(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
});
