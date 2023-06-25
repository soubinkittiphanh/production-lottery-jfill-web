<template>
  <div class="container">
    <form>
      <div class="alert alert-success">ກຳນົດອັດຕາຈ່າຍລາງວັນ</div>

      <div class="form-group row card">

        <div class="col-md-12">
          <select class="form-select" aria-label="Default select example" :required="true" v-model="brc_code">
            <option v-for="d in branchList" v-bind:key="d.id" :value="d.id">
              {{ d.code }} | {{ d.name }}
            </option>
          </select>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເລກ 2 ໂຕ: <span style="color:green">[ {{ expres.two }} /
            1,000
            ]</span> </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="two" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເລກ 3 ໂຕ: <span style="color:green">[ {{ expres.three }} /
            1,000 ]</span> </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="three" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເລກ 4 ໂຕ: <span style="color:green">[ {{ expres.four }} /
            1,000
            ]</span> </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="four" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເລກ 5 ໂຕ: <span style="color:green">[ {{ expres.five }} /
            1,000
            ]</span></label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="five" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເລກ 6 ໂຕ: <span style="color:green">[ {{ expres.six }} /
            1,000
            ]</span> </label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="six" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"></label>
        <div class="col-md-12">
          <button class="btn btn-success" @click.prevent="updatedata()">ບັນທຶກ</button>
        </div>
        <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
        <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
        <PaginationPayrate :key="payratekey"></PaginationPayrate>
      </div>
    </form>
  </div>
</template>
<script>

import PaginationPayrate from '../components/PaginationPayrate.vue'
import axios from "../axiosConfig";
export default {
  components: {
    PaginationPayrate,
  },
  data() {
    return {
      isloading: false,
      error: null,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      expres: {
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
      },
      branchList: [],
      brc_code: 1,
      payratekey: 1,
    };
  },
  watch: {
    two(val) {
      this.expres.two = this.formatNum(val);
    },
    three(val) {
      this.expres.three = this.formatNum(val);
    },
    four(val) {
      this.expres.four = this.formatNum(val);
    },
    five(val) {
      this.expres.five = this.formatNum(val);
    },
    six(val) {
      this.expres.six = this.formatNum(val);
    }
  },
  methods: {
    async fetchbrc() {
      this.isloading = true;
      this.error = null;
      await axios
        .get("fetchbrc")
        .then((res) => {
          this.branchList = [];
          for (const id in res.data) {
            this.branchList.push({
              id: res.data[id].id,
              code: res.data[id].co_code,
              name: res.data[id].co_name,
              lname: res.data[id].co_gname,
              commrate: res.data[id].co_comm,
            });
          }
          // this.page.totalPage = this.branchList.length
          this.isloading = false;
          console.log(":::::::::::::::BRANCH ===> " + this.branchList.length);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ derrrr: " + er);
        });
    },
    fetchpayrate() {
      this.isloading = true;
      this.error = null;
      axios
        .get("getpayrate")
        .then((res) => {
          this.two = res.data[0].pay_two;
          this.three = res.data[0].pay_three;
          this.four = res.data[0].pay_four;
          this.five = res.data[0].pay_five;
          this.six = res.data[0].pay_six;
          this.isloading = false;
        })
        .catch((err) => {
          this.error = err;
          this.isloading = false;
        });
    },
    updatedata() {
      var r = confirm("ຕ້ອງການແກ້ໄຂຂໍ້ມູນ?");
      if (r === true) {
        this.isloading = true;
        this.error = null;
        axios
          .put(`updatepayrate/?id=${this.brc_code}`, {
            two: this.two,
            three: this.three,
            four: this.four,
            five: this.five,
            six: this.six,
          })
          .then((res) => {
            this.payratekey += 1;
            alert(res.data);
            this.isloading = false;
          })
          .catch((er) => {
            this.isloading = false;
            this.error = er;
            alert("ເກີດຂໍ້ຜິດພາດ: " + er);
          });
      }
    },
    formatNum(val) {
      return new Intl.NumberFormat().format(val);

    }
  },
  created() {
    this.fetchpayrate();
    this.fetchbrc();
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
</style>