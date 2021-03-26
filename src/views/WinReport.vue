<template>
  <div class="container">
    <form @submit.prevent="getData">
      <div class="form-group row">
        <label for="roll_id" class="col-md-12 col-form-label"
          >ລາຍງາຍຜູ້ໂຊກດີ:
        </label>
        <div class="col-md-12">
          <input type="date" class="form-control" v-model="r_date" />
        </div>
        <label for="roll_id" class="col-md-12 col-form-label"> </label>
        <div class="col-md-12">
          <button class="btn btn-success">ດຶງຂໍ້ມູນ</button> |
          {{ formatdate(r_date) }}
        </div>
        <div class="col-md-12">
          <p class="error">{{ qr_error }}</p>

          <p class="decode-result">
            Last result: <b>{{ qr_result }}</b>
          </p>

          <!-- <qrcode-stream @decode="onDecode" @init="onInit"> </qrcode-stream> -->
        </div>
      </div>
    </form>

    <table class="table sm">
      <thead>
        <tr>
          <th scope="col">ເລກງວດ</th>
          <th scope="col">ເລກບິນ</th>
          <th scope="col">ຜູ້ຂາຍ</th>
          <th scope="col">ວັນທີ</th>
          <th scope="col" class="text-right">ເລກສ່ຽງ</th>
          <th scope="col" class="text-right">ຈຳນວນເງິນ</th>
          <th scope="col" class="text-right">ຈຳນວນເງິນລາງວັນ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(itm, idx) in report_data" :key="idx">
          <td>{{ itm.ism_id }}</td>
          <td>{{ itm.sale_bill_id }}</td>
          <td>{{ itm.mem_id }}</td>
          <td>{{ formatdate(itm.date) }}</td>
          <td class="text-right">{{ itm.sale_num }}</td>
          <td class="text-right">{{ formatNum(itm.sale_price) }}</td>
          <td class="text-right">
            {{ formatNum((getPaid(itm.sale_num) * itm.sale_price) / 1000) }}
          </td>
        </tr>
        <tr>
          <td>
            <span class="error" v-if="!isloading && report_data.length < 1"
              >ບໍ່ມີຂໍ້ມູນ</span
            >
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="text-right">ລວມຍອດລາງວັນ</td>
          <!-- <td>{{ this.report_data.sale_price.reduce((a, b) => a + b, 0) }}</td> -->
          <td class="text-right">{{ getSumSale }}</td>
        </tr>
      </tbody>
    </table>
    <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
    <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
// import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    // QrcodeStream,
    // QrcodeDropZone,
    // QrcodeCapture,
  },
  created() {
    this.setCurDate();
    this.getPayRate();
  },
  data() {
    return {
      qr_result: "",
      qr_error: "",
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
      console.log(this.$store.getters.isAdmin);
      return this.$store.getters.isAdmin;
    },
    mem_id() {
      return this.$store.getters.user_id;
    },
  },
  methods: {
    onDecode(result) {
      this.result = result;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    getPaid(val) {
      console.log("result val: " + val);
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
      console.log("result PayR: " + this.payR[0].pay_three);
      console.log("result PayR: " + this.payR[0].pay_two);
      console.log("result getpaid: " + result);
      return result;
    },
    getPayRate() {
      this.error = null;
      this.isloading = true;
      axios
        .get(apiDomain.url + "getpayrate")
        .then((res) => {
          this.payR = res.data;
          console.log(this.payR);
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
        .get(apiDomain.url + "winreport/?r_date=" + this.r_date, {
          params: {
            p_date: this.r_date,
            p_admin: this.isAdmin,
            p_mem_id: this.mem_id,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.report_data = res.data;
          console.log(this.report_data);
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
      console.log(dateVisible);
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

