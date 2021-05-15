<template>
  <div class="">
    <div class="center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
    </div>
    <div class="alert alert-success">ສະມາຊິກທັງຫມົດ</div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ຊື່</th>
          <th scope="col">ນາມສະກຸນ</th>
          <th scope="col">ບ້ານ</th>
          <th scope="col">ເມືອງ</th>
          <th scope="col">ແຂວງ</th>
          <th scope="col">ຍອດຂາຍ</th>
          <th scope="col">ສະຖານະ</th>
          <th scope="col">ແກ້ໄຂ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data" v-bind:key="d.id">
          <td>{{ d.name }}</td>
          <td>{{ d.lname }}</td>
          <td>{{ d.vill }}</td>
          <td>{{ d.dist }}</td>
          <td>{{ d.pro }}</td>
          <td>{{ String(formatNum(d.total)) }}</td>
          <td>{{ d.active === 1 ? "ໃຊ້ງານຢູ່" : "Block" }}</td>
          <td>
            <button class="btn btn-warning" @click="viewUser(d.id)">
              ແກ້ໄຂ
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
  components: {
    VueTailwindPagination,
  },
  props: ["datas"],
  data() {
    return {
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
      this.$emit("update-user", id);
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
          name: this.originData[id].name,
          lname: this.originData[id].lname,
          logid: this.originData[id].logid,
          logpass: this.originData[id].logpass,
          vill: this.originData[id].vill,
          dist: this.originData[id].dist,
          pro: this.originData[id].pro,
          active: this.originData[id].active,
          admin: this.originData[id].admin,
          total: this.originData[id].total,
        });
      }
      this.data = responseData;
    },
    fetchuser() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "fetchuser")
        .then((res) => {
          var results = [];
          for (const id in res.data) {
            results.push({
              id: res.data[id].id,
              name: res.data[id].mem_name,
              lname: res.data[id].mem_lname,
              logid: res.data[id].mem_id,
              logpass: res.data[id].mem_pass,
              vill: res.data[id].mem_village,
              dist: res.data[id].mem_dist,
              pro: res.data[id].mem_pro,
              active: res.data[id].active,
              admin: res.data[id].admin,
              total: res.data[id].total,
            });
          }
          this.users = results;
          this.data = results;
          this.originData = this.data;
          this.total = this.originData.length;
          // console.log("page:" + results.length);
          this.perPage = 5;
          this.getData(this.currentPage);
          this.isloading = false;
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
    this.fetchuser();
  },
};
</script>