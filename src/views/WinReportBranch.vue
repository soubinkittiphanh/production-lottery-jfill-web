<template>
  <div class="container">
    <form @submit.prevent="getData">
      <div class="form-group row">
        <label for="roll_id" class="col-md-12 col-form-label">ລາຍງາຍຜູ້ໂຊກດີ:
        </label>
        <div class="col-md-12">
          <input type="date" class="form-control" v-model="r_date" />
        </div>
        <label for="roll_id" class="col-md-12 col-form-label"> </label>
        <div class="col-md-12">
          <button class="btn btn-success">ດຶງຂໍ້ມູນ</button> |
          {{ formatdate(r_date) }}
        </div>

      </div>
    </form>
    <PaginationBranchWinOnPayrate></PaginationBranchWinOnPayrate>

    <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
    <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
  </div>
</template>
<script>
import PaginationBranchWinOnPayrate from '../components/PaginationBranchWinOnPayrate.vue'


import axios from "../axiosConfig";
export default {
  components: {
    PaginationBranchWinOnPayrate
  },
  created() {
    this.setCurDate();
    this.getPayRate();
  },
  data() {
    return {
      // qr_result: "",
      // qr_error: "",
      report_data: [],
      r_date: "",
      isloading: false,
      error: null,
      payR: [],
    };
  },
  computed: {
    getSumSale() {
      let totalsale = 0;
      for (var itm of this.report_data) {
        totalsale += (this.getPaid(itm.sale_num) * itm.sale_price) / 1000;
      }
      return this.formatNum(totalsale);
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    mem_id() {
      return this.$store.getters.user_id;
    },
    mem_master() {
      return this.$store.getters.isMaster;
    },
  },
  methods: {
    // onDecode(result) {
    //   this.qr_result = result;
    // },
    // async onInit(promise) {
    //   try {
    //     await promise;
    //   } catch (error) {
    //     if (error.name === "NotAllowedError") {
    //       this.qr_error = "ERROR: you need to grant camera access permisson";
    //     } else if (error.name === "NotFoundError") {
    //       this.qr_error = "ERROR: no camera on this device";
    //     } else if (error.name === "NotSupportedError") {
    //       this.qr_error = "ERROR: secure context required (HTTPS, localhost)";
    //     } else if (error.name === "NotReadableError") {
    //       this.qr_error = "ERROR: is the camera already in use?";
    //     } else if (error.name === "OverconstrainedError") {
    //       this.qr_error = "ERROR: installed cameras are not suitable";
    //     } else if (error.name === "StreamApiNotSupportedError") {
    //       this.qr_error = "ERROR: Stream API is not supported in this browser";
    //     }
    //   }
    // },
    getPaid(val) {
      let result = 0;
      if (val.length === 2) {
        result = this.payR[0].pay_two;
      } else if (val.length === 3) {
        result = this.payR[0].pay_three;
      } else if (val.length === 4) {
        result = this.payR[0].pay_four;
      } else if (val.length === 5) {
        result = this.payR[0].pay_five;
      } else if (val.length === 6) {
        result = this.payR[0].pay_six;
      }

      return result;
    },
    getPayRate() {
      this.error = null;
      this.isloading = true;
      axios
        .get("getpayrate")
        .then((res) => {
          this.payR = res.data;
          this.isloading = false;
        })
        .catch((er) => {
          this.error = er;
          this.isloading = false;
        });
    },
    getData() {
      //   const r_date = "10002";
      this.error = null;
      this.isloading = true;

      axios
        .get("winreport", {
          params: {
            p_date: this.r_date,
            p_admin: this.isAdmin,
            p_mem_id: this.mem_id,
            p_master: this.mem_master,
          },
        })
        .then((res) => {
          console.log('DATA===============' + res.data);
          this.report_data = res.data;
          this.isloading = false;
        })
        .catch((er) => {
          //   alert(er);
          this.error = er;
          this.isloading = false;
        });
    },
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
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
      return dateVisible; //"this.dateVisible";
    },
    setCurDate() {
      var fuldate = new Date();
      var m = "" + (fuldate.getMonth() + 1);
      var d = "" + fuldate.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      this.r_date = fuldate.getFullYear() + "-" + m + "-" + d;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>

