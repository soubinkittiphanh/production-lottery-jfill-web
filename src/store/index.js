import { createStore } from "vuex";
import actions from './actions';

const store = createStore({
  state() {
    return {
      isAuth: false,
      credent: {
        userId: null,
        userName: null,
        userAct: null,
        userAdmin: null,
      },
      ism: null,
    };
  },
  mutations: {
    authUser(state) {
      state.isAuth = true;
    },
    unauthUser(state) {
      state.isAuth = false;
    },
    setUser(state, payload) {
      state.credent.userId = payload.id;
      state.credent.userName = payload.name;
      state.credent.userAct = payload.active;
      state.credent.userAdmin = payload.admin;
    },
    setISM(state,payload){
      state.ism={
        ref:payload.ref,
        date:payload.date,
      }
    },
    clearISM(state){
      state.ism=null;
    }
  },
  actions ,
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
    isAdmin(){
        // return state.credent.userAdmin;
        return localStorage.getItem('admin');
    },
    user_id(){
      return localStorage.getItem('id');
    },
    ism_info(state){
      console.log("ISM: ism_ifo: "+state.ism.ref)
      return state.ism;
    }
  },
});
export default store;
