<template>
  <div class="container card">
    <!-- <button class="btn btn-primary" @click="gen_ism_ref">ໃສ່ເລກງວດ</button> -->
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label">ງວດທີ:</label>
        <div class="col-md-12">
          <input
            disabled
            type="text"
            class="form-control"
            v-model="ism_ref"
            :style="!formvalidate.ref ? errorclass : ''"
          />
          <span v-if="!formvalidate.ref" class="error"
            >ກະລຸນາໃສ່ເລກທີງວດ !!</span
          >
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ອອກວັນທີ:
          <span class="succeed">
            {{ dateVisible }}
          </span>
        </label>
        <div class="col-md-12">
          <input
            type="date"
            class="form-control"
            v-model="date"
            format="dd-mm-yyyy"
            :style="!formvalidate.date ? errorclass : ''"
          />
          <span v-if="!formvalidate.date" class="error"
            >ວັນທີບໍ່ຖືກຕ້ອງ !!</span
          >
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຜົນອອກລາງວັນ:</label
        >
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            placeholder="ເລກຜົນອອກຕ້ອງໃສ່ 6 ຕົວ"
            v-model="ism_res"
          />
        </div>
        <div class="col-md-12 custom-control custom-switch">
          <input
            v-model="isopen"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            @click="triggleSwitch"
          />
          <label
            class="custom-control-label"
            for="customSwitch1"
            style="float: right"
            >ປິດ-ເປິດ</label
          >
        </div>
        <div class="col-md-12">
          <button class="btn btn-success mr-2" @click.prevent="saveism(issave)">
            {{ issave ? "ບັນທຶກ" : "ເພີ່ມງວດ" }}
          </button>
          <button class="btn btn-danger" v-if="issave" @click="toggleSave">
            ຍົກເລີກ
          </button>
        </div>
      </div>
    </form>
    <hr />
    <button @click="fetchdata" class="btn btn-warning">ດຶງຂໍ້ມູນ</button>
    <hr>
    <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isLoading"></i>
    <p v-else-if="!isLoading && error" style="color: red">{{ error }}</p>
    <p v-else-if="ismdata.length<1" >ຍັງບໍ່ມີງວດ</p>
    <base-card v-for="(itm, idx) in ismdata" :key="idx">
      <span style="color: green"> [ ຜົນອອກ:{{ itm.ism_res }} ]</span>
      [ ເລກທີ: {{ itm.ism_ref }} ] [ ອອກວັນທີ: {{ formatdate(itm.ism_date) }} ]
      <switch-toggle
        :is-open="itm.ism_active === 1 ? true : false"
        :name="'customSwitch' + itm.ism_id"
      >
      </switch-toggle>
      <button
        class="btn btn-warning"
        @click="
          editism(
            itm.ism_id,
            itm.ism_ref,
            itm.ism_date,
            itm.ism_res,
            itm.ism_active
          )
        "
      >
        ແກ້ໄຂ
      </button>
    </base-card>
    <div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
import BaseCard from "../components/ui/BaseCard";
import SwitchToggle from "../components/ui/SwitchToggle";
var moment = require("moment");
export default {
  components: {
    BaseCard,
    SwitchToggle,
  },
  data() {
    return {
      moment: moment,
      errorclass: "border:1px solid red;",
      ism_ref: "",
      date: "",
      dateVisible: "",
      ism_res: "",
      isopen: false,
      issave: false,
      ismdata: [],
      ismId: "",
      isLoading: false,
      error: null,
      formvalidate: {
        ref: false,
        date: false,
      },
    };
  },
  watch: {
    ism_ref(val) {
      console.log("changing....");
      console.log("Val: " + val);
      console.log("Leng: " + val.toString().length);
      if (val.toString().length > 0) {
        this.formvalidate.ref = true;
      } else {
        this.formvalidate.ref = false;
      }
    },
    date(val) {
      this.setismdate(val);
      if (val.length > 0) {
        this.formvalidate.date = true;
      } else {
        this.formvalidate.date = false;
      }
    },
  },
  methods: {
    gen_ism_ref() {
      console.log("Sending");
      this.isLoading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "ismref")
        .then((res) => {
          // console.log("Receiving")
          // console.log(res.data);
          this.ism_ref = res.data;
          this.isLoading = false;
        })
        .catch((er) => {
          // alert(er);
          this.error = er;
        });
    },
    formatdate(date) {
      var dateVisible = new Date(date);
      var m = "" + (dateVisible.getMonth() + 1);
      var d = "" + dateVisible.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      dateVisible = d + "-" + m + "-" + dateVisible.getFullYear();
      console.log(dateVisible);
      return dateVisible; //"this.dateVisible";
    },
    editism(ism_id, ism_ref, ism_date, ism_res, ism_active) {
      var r = confirm("ຕ້ອງການແກ້ໄຂຂໍ້ມູນ?");
      if (r == true) {
        console.log(
          ism_ref + "_" + ism_date + "_" + ism_res + "_" + ism_active
        );
        this.ismId = ism_id;
        this.ism_ref = ism_ref;
        this.ism_res = ism_res;
        this.setismdate(ism_date);
        this.isopen = ism_active === 1 ? true : false;
        this.issave = true;
      } else {
        this.issave = false;
      }
    },
    setismdate(dateinput) {
      var date = new Date(dateinput);
      var m = "" + (date.getMonth() + 1);
      var d = "" + date.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      this.date = date.getFullYear() + "-" + m + "-" + d;
    },
    callFunction() {
      var fuldate = new Date();
      var m = "" + (fuldate.getMonth() + 1);
      var d = "" + fuldate.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      this.date = fuldate.getFullYear() + "-" + m + "-" + d;
    },
    triggleSwitch() {
      this.isopen = !this.isopen;
    },
    saveism(val) {
      if (val === true) {
        console.log("update");
        !this.formvalidate.ref || !this.formvalidate.date
          ? alert("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ ກວດສອບຂໍ້ມູນໃຫ້ຄົບຖ້ວນ")
          : this.getdataSurvey("update");
      } else {
        !this.formvalidate.ref || !this.formvalidate.date
          ? alert("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ ກວດສອບຂໍ້ມູນໃຫ້ຄົບຖ້ວນ")
          : this.getdataSurvey("create");
      }
    },
    createIsm() {
      this.isLoading = true;
      this.error = null;
      axios
        .post(apiDomain.url + "createism", {
          ism_ref: this.ism_ref,
          ism_date: this.date,
          ism_res: this.ism_res,
          ism_active: this.isopen,
        })
        .then((res) => {
          console.log(res);
          alert(res.data);
          this.fetchdata();
          this.isLoading = false;
        })
        .catch((err) => {
          // console.log(err);
          this.error = err;
        });
    },
    resetInput() {
      this.issave = false;
      this.isopen = false;
      this.ism_ref = "";
      this.ism_res = "";
      this.ismId = "";
    },
    updateIsm() {
      // console.log(this.ismId);
      this.isLoading = true;
      this.error = null;
      axios
        .put(apiDomain.url + "updateism", {
          ism_ref: this.ism_ref,
          ism_date: this.date,
          ism_result: this.ism_res,
          ism_active: this.isopen,
          ism_id: this.ismId, //this.ismId,
        })
        .then((response) => {
          // console.log(ism_id);
          alert(response.data);
          this.resetInput();
          this.fetchdata();
          this.isLoading = false;
        })
        .catch((err) => {
          this.error = err;
          console.log(err.data);
        });
    },
    getdataSurvey(action) {
      console.log(this.date);
      this.isLoading = true;
      this.error = null;
      const url = apiDomain.url + "fetchism/?date=" + this.date;
      axios
        .get(url)
        .then((res) => {
          if (action === "create") {
            if (res.data.length > 0) {
              alert("ວັນທີ ທີ່ເລືອກ ມີງວດທີ່ໃຊ້ງານຢູ່");
              this.fetchdata();
            } else {
              // alert("Ready to insert");
              this.createIsm();
            }
          } else {
            if (res.data.length > 1) {
              alert("ວັນທີ ເປີດງວດທີ່ເລືອກ ມີງວດທີ່ໃຊ້ງານຢູ່");
              this.fetchdata();
            } else {
              // alert("Ready to update");
              this.updateIsm();
            }
          }
          this.isLoading = false;
          console.log(res.data);
        })
        .catch((err) => {
          // alert(err);
          this.error = err;
        });
    },
    toggleSave() {
      this.issave = false;
      this.ism_ref = "";
      this.ism_res = "";
      this.isopen = false;
    },
    fetchdata() {
      this.isLoading = true;
      this.error = null;
      this.ismdata = "";
      console.log(this.date);
      const url = apiDomain.url + "fetchism/?date=" + this.date;
      axios
        .get(url)
        .then((res) => {
          const result = [];
          for (const id in res.data) {
            result.push({
              ism_id: res.data[id].id,
              ism_ref: res.data[id].ism_ref,
              ism_date: res.data[id].ism_date,
              ism_res: res.data[id].ism_result,
              ism_active: res.data[id].ism_active,
            });
          }
          this.ismdata = result;
          console.log(res.data);
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err);
          this.error = err;
      this.isLoading = false;
        });
    },
    // moment: function (date) {
    //   return moment(date);
    // },
    // date: function (date) {
    //   return moment(date).format('MMMM Do YYYY');
    // }
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  mounted() {
    this.callFunction();
    this.fetchdata();
    this.gen_ism_ref();
  },
};
</script>
<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 40rem;
}
.error {
  /* border: 1px solid red; */
  color: red;
}
.succeed {
  /* border: 1px solid green; */
  color: green;
}
</style>
