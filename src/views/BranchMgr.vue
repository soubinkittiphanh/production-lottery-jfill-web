<template>
  <div class="container card">
    <!-- <button class="btn btn-primary" @click="gen_ism_ref">ໃສ່ເລກງວດ</button> -->
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label">ໂຕຫຍໍ້ສາຂາ:</label>
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="::: PXK :::"
            v-model="abbr"
            :disabled="id"
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ຊື່ສາຂາ:</label>
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="::: ສາຂາປາເຊ :::"
            v-model="name"
          />
          <label for=""></label>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເປີເຊັນສູງສຸດ:</label>
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            placeholder="::: 30 :::"
            v-model="commrate"
          />
          <label for=""></label>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຂໍ້ມູນອື່ນໆ:</label
        >
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="::: ຂື້ນກັບທ່ານ :::"
            v-model="desc"
          />
          <label for=""></label>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <button
                class="btn btn-success"
                @click.prevent="!id ? createBrch() : updateBrch(id)"
              >
                {{ !id ? "ເພີ່ມ" : "ບັນທຶກ" }}
              </button>
            </div>
            <div class="col-md-6">
              <button
                v-if="id"
                class="btn btn-danger"
                @click.prevent="resetText"
              >
                ຍົກເລີກ
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <hr />

    <div>
      <ul></ul>
    </div>
    <branch-page
      @update-branch="resdata"
      :datas="data"
      ref="brcp"
    ></branch-page>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
import BranchPage from "../components/PaginationBranch.vue";
export default {
  components: {
    BranchPage,
  },
  data() {
    return {
      isloading: false,
      id: null,
      error: null,
      abbr: "",
      name: "",
      desc: "",
      commrate:30,
      data: [],
    };
  },
  methods: {
    createBrch() {
      if (!this.abbr || !this.name) {
        // IF NO INFO PROVIDED
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ");
      } else {
        axios
          .post(apiDomain.url + "createbrc", {
            id: this.id,
            abbr: this.abbr,
            name: this.name,
            desc: this.desc,
            commrate: this.commrate,
          })
          .then((res) => {
            this.isloading = false;
            alert(res.data);
            // res.status==200?this.fetchbrc:null
            res.status == 200 ? this.$refs.brcp.fetchbrc() : null;
          })
          .catch((er) => {
            alert("ເກີດປັນຫາຂັດຂ້ອງ: " + er);
          });
      }
    },
    resetText() {
      this.id = null;
      this.name = "";
      this.abbr = "";
      this.desc = "";
      this.commrate = 30;
    },
    resdata(id, abbr, name, desc,commrate) {
      console.log("DATA FROM WALL:" + id + " " + abbr + name + desc);
      this.abbr = abbr;
      this.name = name;
      this.desc = desc;
      this.id = id;
      this.commrate = commrate;
    },
    updateBrch(id) {
      console.log(id);
      if (!this.abbr || !this.name) {
        // IF NO INFO PROVIDED
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ");
      } else {
        axios
          .put(apiDomain.url + "updatebrc", {
            id: this.id,
            abbr: this.abbr,
            name: this.name,
            desc: this.desc,
            commrate: this.commrate,
          })
          .then((res) => {
            this.isloading = false;
            alert(res.data);
            // res.status == 200 ? (this.id = this.resetText()) : null; // RESET TEXTFIELD IF UPDATE SUCCEED
            res.status == 200 ? this.$refs.brcp.fetchbrc() : null;
            this.resetText();
            console.log("::::::::::" + res.status);
          })
          .catch((er) => {
            alert("ເກີດປັນຫາຂັດຂ້ອງ: " + er);
          });
      }
    },
    fetchbrc() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "fetchbrc")
        .then((res) => {
          var results = [];
          for (const id in res.data) {
            results.push({
              id: res.data[id].id,
              code: res.data[id].co_code,
              name: res.data[id].co_name,
              lname: res.data[id].co_gname,
              commrate: res.data[id].co_comm,
            });
          }
          this.data = results;
          console.log(":::::::::::::::" + this.data.length);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
        });
    },
  },
};
</script>
