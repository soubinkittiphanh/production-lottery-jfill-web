<template>
  <div class="">
    <div class="center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
    </div>
    <div class="alert alert-success">ສາຂາທັງໝົດ: {{ originData == null ? 0 : originData.length }}</div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" v-for="item in tableHeader" :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="d in payrateList" v-bind:key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.branch_id }}</td>
          <td>{{ d.pay_two }}</td>
          <td>{{ d.pay_three }}</td>
          <td>{{ d.pay_four }}</td>
          <td>{{ d.pay_five }}</td>
          <td>{{ d.pay_six }}</td>
          <td>
            <button class="btn btn-warning" @click="viewUser(d.id)">
              <span class="material-icons">edit</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <VueTailwindPagination :current="currentPage" :total="totalPage" :per-page="perPage"
      @page-changed="onPageClick($event)" />
  </div>
</template>
<script>
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

import axios from "../axiosConfig";
export default {

  components: {
    VueTailwindPagination,
  },
  data() {
    return {
      tableHeader: ['Id','ສາຂາ', '2 ໂຕ', '3 ໂຕ', '4 ໂຕ', '5 ໂຕ', '6 ໂຕ'],
      isloading: false,
      error: null,
      payrateList: [],
      page: {

        currentPage: 0,
        totalPage: 0,
        perPage: 5

      }
    };
  },
  methods: {
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
    viewUser(id) {
      const sel_brc = this.payrateList.find(data => data.id === id);
      console.log(":::::::::::::" + sel_brc.lname);
      this.$emit("update-branch", id, sel_brc.code, sel_brc.name, sel_brc.lname, sel_brc.commrate);
    },
    onPageClick(event) {
      this.currentPage = event;
      this.getData(this.currentPage);
    },
    async getData(pageNumber) {
      let responseData = [];
      const pl = this.perPage;
      for (let i = 0; i < pl; i++) {
        let id = pageNumber != 1 ? pageNumber * pl - pl + i : i;
        if (id === this.total - 1) i = pl + 1;
        responseData.push({
          id: this.originData[id].id,
          code: this.originData[id].code,
          name: this.originData[id].name,
          commrate: this.originData[id].commrate,
          lname: this.originData[id].lname,
        });
      }
      this.payrateList = responseData;
    },

    async allPayrate() {
      this.isloading = true;
      this.error = null;
      await axios
        .get("getpayrate")
        .then((res) => {
          this.payrateList = [];
          for (const iterator of res.data) {
            this.payrateList.push(iterator);
          }
          this.page.totalPage = this.payrateList.length
          this.isloading = false;
          console.log(":::::::::::::::BRANCH ===> " + this.payrateList.length);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ derrrr: " + er);
        });

    }
  },
  mounted() {
    this.page.currentPage = 1;
    this.allPayrate();
  },
};
</script>