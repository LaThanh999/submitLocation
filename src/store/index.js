import Vue from "vue";
import Vuex from "vuex";
import location from "./location/module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    location,
  },
});
