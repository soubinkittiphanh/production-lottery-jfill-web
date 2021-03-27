import axios from "axios";
import apiDomain from "../config";
export default {
  authUser(context) {
    context.commit("authUser");
  },
  autoLogin(context) {
    const isAuth = localStorage.getItem("isAuth");
    const credent = {
      userId: localStorage.getItem("id"),
      userName: localStorage.getItem("name"),
      userAct: localStorage.getItem("active"),
      userAdmin: localStorage.getItem("admin"),
    };
    const ism = {
      ref: localStorage.getItem("ism_ref"),
      date: localStorage.getItem("ism_date"),
    };
    if (isAuth) {
      context.commit("setISM", { ...ism });
      context.commit("authUser");
      context.commit("setUser", {
        ...credent,
      });
    }
  },
  async loadISM(context) {
    localStorage.removeItem("ism_ref");
    localStorage.removeItem("ism_date");
    const _response = await axios
      .get(apiDomain.url+"getism_ref")
      .then((res) => {
        console.log("ISM: " + res.data[0].ism_ref + " " + res.data[0].ism_date);
        localStorage.setItem("ism_ref", res.data[0].ism_ref);
        localStorage.setItem("ism_date", res.data[0].ism_date);
        context.commit("setISM", {
          ref: res.data[0].ism_ref,
          date: res.data[0].ism_date,
        });
      })
      .catch((er) => {
        alert(er);
      });
    console.log(_response);
  },
  async login(context, payload) {
    console.log(apiDomain.url)
    const _response = await axios.post(apiDomain.url+"auth", {
        id: payload.id,
        pass: payload.pass,
      })
      .then((response) => {
        if (response.data[0].isAuth===false || response.data[0].mem_id === null || response.data[0].mem_name===null) {
          alert("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ");
          return;
        }
        console.log(response.data);
        localStorage.setItem("id", response.data[0].mem_id);
        localStorage.setItem("name", response.data[0].mem_name);
        localStorage.setItem(
          "active",
          response.data[0].active === 1 ? true : false
        );
        localStorage.setItem(
          "admin",
          response.data[0].admin === 1 ? true : false
        );
        localStorage.setItem("isAuth", true);
        localStorage.setItem("ism_ref", response.data[0].ism_ref);
        localStorage.setItem("ism_date", response.data[0].ism_date);

        context.commit("setUser", {
          id: response.data[0].mem_id,
          name: response.data[0].mem_name,
          active: response.data[0].active,
          admin: response.data[0].admin,
        });
        context.commit("authUser");
        context.commit("setISM", {
          ref: response.data[0].ism_ref,
          date: response.data[0].ism_date,
        });
      })
      .catch((error) => {
        alert(error);
      });
    console.log(_response);
  },
  logout(context) {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("active");
    localStorage.removeItem("admin");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("ism_ref");
    localStorage.removeItem("ism_date");
    context.commit("unauthUser");
    context.commit("setUser", {
      id: null,
      name: null,
      active: null,
      admin: null,
    });
    context.commit("clearISM");
  },
};
