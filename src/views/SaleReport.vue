<template>
  <div class="container">
    <form @submit.prevent="getData">
      <div class="form-group row">
        <label for="roll_id" class="col-md-12 col-form-label"
          >ລາຍງານຍອດຂາຍວັນທີ:
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

    <table class="table sm">
      <thead>
        <tr>
          <th scope="col">ເລກງວດ</th>
          <th scope="col">ເລກບິນ</th>
          <th scope="col">ຜູ້ຂາຍ</th>
          <th scope="col">ວັນທີ</th>
          <th scope="col" class="text-right">ເລກສ່ຽງ</th>
          <th scope="col" class="text-right">ຈຳນວນເງິນ</th>
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
          <td class="text-right">ລວມຍອດຂາຍ</td>
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
import axios from "../axiosConfig";
export default {
  created() {
    this.setCurDate();
  },
  data() {
    return {
      report_data: [],
      r_date: "",
      isloading: false,
      error: null,
    };
  },
  computed: {
    getSumSale() {
      let totalsale = 0;
      for (var itm of this.report_data) {
        totalsale += itm.sale_price;
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
    mem_master() {
      return this.$store.getters.isMaster;
    },
  },
  methods: {
    getData() {
      //   const r_date = "10002";
      this.error = null;
      this.isloading = true;

      axios
        .get( "salereport", {
          params: {
            p_date: this.r_date,
            p_admin: this.isAdmin,
            p_mem_id: this.mem_id,
            p_master: this.mem_master,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.report_data = res.data.filter((a) => {
            return a.is_cancel == 0;
          });
          console.log(this.report_data);
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
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 40rem;
}
.error {
  color: red;
}
</style>

