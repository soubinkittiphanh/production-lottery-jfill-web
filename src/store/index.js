import { createStore } from "vuex";
import actions from "./actions";
import CryptoJS from "crypto-js";

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
      menu: {},
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
    setISM(state, payload) {
      state.ism = {
        ref: payload.ref,
        date: payload.date,
      };
    },
    clearISM(state) {
      state.ism = null;
    },
    encryptData(_,payload)  {
        const menu =  {
        "m_home": CryptoJS.AES.encrypt(payload.m_home.toString(),"secret@2o2I").toString(),
        "m_category":  CryptoJS.AES.encrypt(payload.m_category.toString(),"secret@2o2I").toString(),
        "m_branch": CryptoJS.AES.encrypt(payload.m_branch.toString(),"secret@2o2I").toString(),
        "m_limited_price": CryptoJS.AES.encrypt(payload.m_limited_price.toString(),"secret@2o2I").toString(),
        "m_pay_rate": CryptoJS.AES.encrypt(payload.m_pay_rate.toString(),"secret@2o2I").toString(),
        "m_sale": CryptoJS.AES.encrypt(payload.m_sale.toString(),"secret@2o2I").toString(),
        "m_re_sale": CryptoJS.AES.encrypt(payload.m_re_sale.toString(),"secret@2o2I").toString(),
        "m_re_win": CryptoJS.AES.encrypt(payload.m_re_win.toString(),"secret@2o2I").toString(),
        "m_list_member": CryptoJS.AES.encrypt(payload.m_list_member.toString(),"secret@2o2I").toString(),
        "m_add_member": CryptoJS.AES.encrypt(payload.m_add_member.toString(),"secret@2o2I").toString(),
        "m_group": CryptoJS.AES.encrypt(payload.m_group.toString(),"secret@2o2I").toString(),
        "m_master": CryptoJS.AES.encrypt(payload.m_master.toString(),"secret@2o2I").toString(),
        "m_co_code": CryptoJS.AES.encrypt(payload.m_co_code.toString(),"secret@2o2I").toString()
      };
      localStorage.setItem("right", JSON.stringify(menu));
    },
  },
  actions,
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
    isAdmin() {
      return localStorage.getItem("admin");
    },
    rights() {
      const mencrypt = JSON.parse(localStorage.getItem("right"));
      if (!mencrypt) {
        console.log("RETURN");
        return;
      }
      const m = {
        m_home: CryptoJS.AES.decrypt(mencrypt.m_home, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_category: CryptoJS.AES.decrypt(mencrypt.m_category, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_branch: CryptoJS.AES.decrypt(mencrypt.m_branch, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_limited_price: CryptoJS.AES.decrypt(mencrypt.m_limited_price, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_pay_rate: CryptoJS.AES.decrypt(mencrypt.m_pay_rate, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_sale: CryptoJS.AES.decrypt(mencrypt.m_sale, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_re_sale: CryptoJS.AES.decrypt(mencrypt.m_re_sale, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_re_win: CryptoJS.AES.decrypt(mencrypt.m_re_win,  "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_list_member: CryptoJS.AES.decrypt(mencrypt.m_list_member,"secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_add_member: CryptoJS.AES.decrypt(mencrypt.m_add_member,"secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_group: CryptoJS.AES.decrypt(mencrypt.m_group, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_master: CryptoJS.AES.decrypt(mencrypt.m_master, "secret@2o2I").toString(CryptoJS.enc.Utf8),
        m_co_code: CryptoJS.AES.decrypt(mencrypt.m_co_code,"secret@2o2I").toString(CryptoJS.enc.Utf8)
      };
      return m;
    },
    isMaster() {
      const m = JSON.parse(localStorage.getItem("right"));
      if (!m){
        return;
      } 
      const master = m["m_master"];
      const decryptData = CryptoJS.AES.decrypt(
        master,
        "secret@2o2I"
      ).toString(CryptoJS.enc.Utf8);
      return decryptData;
    },
    user_id() {
      return localStorage.getItem("id");
    },
    user_name() {
      return localStorage.getItem("name");
    },
    ism_info(state) {
      console.log("ISM: ism_ifo: " + state.ism.ref);
      return state.ism;
    },
    co_code(){
      const mencrypt = JSON.parse(localStorage.getItem("right"));
      const m = CryptoJS.AES.decrypt(mencrypt.m_co_code,"secret@2o2I").toString(CryptoJS.enc.Utf8);
      return m;
    }
  },
});
export default store;
