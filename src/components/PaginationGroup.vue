<template>
  <div class="">
    <div class="center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
    </div>
    <div class="alert alert-success"><span>ກຸ່ມຜູ້ໃຊ້ງານທັງຫມົດ: {{ originData == null ? 0 : originData.length }} ກຸ່ມ</span></div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">ລະຫັດກຸ່ມ</th>
          <th scope="col">ຊື່ກຸ່ມ</th>
          <th scope="col">ຂໍ້ມູນອື່ນໆ</th>
          <th scope="col">ຕັ້ງງວດ</th>
          <th scope="col">ປະເພດເລກ</th>
          <th scope="col">ສາຂາ</th>
          <th scope="col">ເຕັມຮູ</th>
          <th scope="col">ລາງວັນ</th>
          <th scope="col">ຂາຍ</th>
          <th scope="col">ລງ ຂາຍ</th>
          <th scope="col">ລງ ຖືກລາງວັນ</th>
          <th scope="col">ສະມາຊິກ</th>
          <th scope="col">ເພີ່ມສມຊ</th>
          <th scope="col">ເປັນ Master</th>
          <th scope="col">ແກ້ໄຂ</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="d in data" v-bind:key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.code }}</td>
          <td>{{ d.name }}</td>
          <td>{{ d.desc }}</td>
          <td :class="d.menu.m_home == 1 ? 'succ' : 'error'">
            {{ d.menu.m_home == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_category == 1 ? 'succ' : 'error'">
            {{ d.menu.m_category == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_branch == 1 ? 'succ' : 'error'">
            {{ d.menu.m_branch == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_limited_price == 1 ? 'succ' : 'error'">
            {{ d.menu.m_limited_price == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_pay_rate == 1 ? 'succ' : 'error'">
            {{ d.menu.m_pay_rate == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_sale == 1 ? 'succ' : 'error'">
            {{ d.menu.m_sale == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_re_sale == 1 ? 'succ' : 'error'">
            {{ d.menu.m_re_sale == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_re_win == 1 ? 'succ' : 'error'">
            {{ d.menu.m_re_win == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_s_member == 1 ? 'succ' : 'error'">
            {{ d.menu.m_s_member == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_i_member == 1 ? 'succ' : 'error'">
            {{ d.menu.m_i_member == 1 ? "ອ" : "ບ" }}
          </td>
          <td :class="d.menu.m_master == 1 ? 'succ' : 'error'">
            {{ d.menu.m_master == 1 ? "ອ" : "ບ" }}
          </td>
          <td>
            <button class="btn btn-warning" @click="viewGroup(d.id)">
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
      totalsale: 0,
      totalcom3: 0,
      totalwin: 0,
      totalcom5: 0,
      totalreturn: 0,
      currentPage: 1,
      perPage: 2,
      total: 0,
      data: this.datas,
      originData: [],
      isloading: false,
      error: null,
    };
  },
  methods: {
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
    viewGroup(id) {
      const sel_group = this.data.find((data) => data.id === id);
      this.$emit(
        "update-group",
        id,
        // sel_brc.code,
        // sel_brc.name,
        // sel_brc.lname
        sel_group
      );
    },
    onPageClick(event) {
      this.currentPage = event;
      this.getData(this.currentPage);
    },
    getData(pageNumber) {
      let responseData = [];
      const pl = this.perPage;
      for (let i = 0; i < pl; i++) {
        let id = pageNumber != 1 ? pageNumber * pl - pl + i : i;
        if (id === this.total - 1) i = pl + 1;
        responseData.push({
          id: this.originData[id].id,
          code: this.originData[id].code,
          name: this.originData[id].name,
          desc: this.originData[id].desc,
          menu: {
            m_home: this.originData[id]["menu"].m_home,
            m_category: this.originData[id]["menu"].m_category,
            m_branch: this.originData[id]["menu"].m_branch,
            m_limited_price: this.originData[id]["menu"].m_limited_price,
            m_pay_rate: this.originData[id]["menu"].m_pay_rate,
            m_sale: this.originData[id]["menu"].m_sale,
            m_re_sale: this.originData[id]["menu"].m_re_sale,
            m_re_win: this.originData[id]["menu"].m_re_win,
            m_s_member: this.originData[id]["menu"].m_s_member,
            m_i_member: this.originData[id]["menu"].m_i_member,
            m_master: this.originData[id]["menu"].m_master,
          },
        });
      }
      this.data = responseData;
    },
    fetchGroup() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "fetchGroup")
        .then((res) => {
          var results = [];
          for (const id in res.data) {
            results.push({
              id: res.data[id].id,
              code: res.data[id].group_code,
              name: res.data[id].group_name,
              desc: res.data[id].group_desc,
              menu: {
                m_home: res.data[id].m_home,
                m_category: res.data[id].m_category,
                m_branch: res.data[id].m_branch,
                m_limited_price: res.data[id].m_limited_price,
                m_pay_rate: res.data[id].m_pay_rate,
                m_sale: res.data[id].m_sale,
                m_re_sale: res.data[id].m_re_sale,
                m_re_win: res.data[id].m_re_win,
                m_s_member: res.data[id].m_list_member,
                m_i_member: res.data[id].m_add_member,
                m_master: res.data[id].m_master,
              },
            });
          }
          this.data = results;
          this.originData = this.data;
          this.total = this.originData.length;
          this.perPage = 10;
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
  async mounted() {
    console.log("mounted: " + this.data);
    this.currentPage = 1;
    this.fetchGroup();
  },
};
</script>
<style scoped>
.error {
  color: red;
}
.succ {
  color: green;
}
</style>