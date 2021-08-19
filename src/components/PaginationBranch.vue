<template>
  <div class="">
    <div class="center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
    </div>
    <div class="alert alert-success">ສາຂາທັງໝົດ: {{originData==null?0:originData.length}}</div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">ໂຕຫຍໍ້</th>
          <th scope="col">ຊື່</th>
          <th scope="col">%com</th>
          <th scope="col">ຂໍ້ມູນອື່ນໆ</th>
          <th scope="col">ແກ້ໄຂ</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="d in data" v-bind:key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.code }}</td>
          <td>{{ d.name }}</td>
          <td>{{ d.commrate }}</td>
          <td>{{ d.lname }}</td>
          <td>
            <button class="btn btn-warning" @click="viewUser(d.id)">
              <span class="material-icons">edit</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <VueTailwindPagination
      :current="currentPage"
      :total="total"
      :per-page="perPage"
      @page-changed="onPageClick($event)"
    />
  </div>
</template>
<script>
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import apiDomain from "../config";
import axios from "axios";
export default {
  props: ["datas"],
  components: {
    VueTailwindPagination,
  },
  data() {
    return {
      totalsale:0,
      totalcom3:0,
      totalwin:0,
      totalcom5:0,
      totalreturn:0,
      currentPage: 1,
      perPage: 2,
      total: 0,
      data: this.datas,
      originData: [],
      isloading:false,
      error:null,
    };
  },
  methods: {
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
    viewUser(id) {
        const sel_brc= this.data.find(data=>data.id===id);
        console.log(":::::::::::::"+sel_brc.lname);
      this.$emit("update-branch", id,sel_brc.code,sel_brc.name,sel_brc.lname,sel_brc.commrate);
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
      this.data = responseData;
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
          this.users = results;
          this.data = results;
          this.originData = this.data;
          this.total = this.originData.length;
          this.perPage = 10;
          this.getData(this.currentPage);
          this.isloading = false;
          console.log(":::::::::::::::"+this.data.length);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
        });
    },
  },
  mounted() {
    console.log("mounted: " + this.data);
    this.currentPage = 1;
    this.fetchbrc();
  },
};
</script>