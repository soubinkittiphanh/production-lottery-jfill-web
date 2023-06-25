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

        <tr v-for="d in winreportList" v-bind:key="d.id">

          <td style="text-align: right;" v-for="val in tableHeader" v-bind:key="val">{{ d[val].toLocaleString() }}</td>

        </tr>
        <tr>

          <td style="text-align: right;" v-for="val in tableFooter" v-bind:key="val">{{ val }}</td>

        </tr>
        <tr>

          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ val }}</td>
          <td style="text-align: right;" >{{ totalWin.toLocaleString() }}</td>
          <td style="text-align: right;" >{{ totalSale.toLocaleString() }}</td>
          <td style="text-align: right;" >{{ totalCommission.toLocaleString() }}</td>
          <td style="text-align: right;color: blue;" >{{ profitAndLose.toLocaleString() }}</td>

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
      val:'',
      tableHeader: [],
      tableFooter: ['', '', '', '', '', '', '', '', '', '', '', 'ລວມຍອດຖືກ', 'ລວມຍອດຂາຍ', 'ເປີເຊັນຂາຍ', 'ກຳໄລ/ຂາດທຶນ'],
      isloading: false,
      error: null,
      winreportList: [],
      page: {
        currentPage: 0,
        totalPage: 0,
        perPage: 5

      }
    };
  },
  computed: {
    totalSale() {
      const tatal = this.winreportList.reduce((accumulator, item) => accumulator + (+item.grandTotalSale), 0)
      return tatal
    },
    totalWin() {
      const tatal = this.winreportList.reduce((accumulator, item) => accumulator + (+item.prize), 0)
      return tatal
    },
    totalCommission() {
      const tatal = this.winreportList.reduce((accumulator, item) => accumulator + (+item.com_sale), 0)
      return tatal
    },
    profitAndLose() {
      const tatal = this.winreportList.reduce((accumulator, item) => accumulator + (+item.return), 0)
      return tatal
    }
  },
  methods: {
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
    viewUser(id) {
      const sel_brc = this.winreportList.find(data => data.id === id);
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
      this.winreportList = responseData;
    },

    async branchWinReport() {
      this.isloading = true;
      this.error = null;
      await axios
        .get("winreport_group")
        .then((res) => {
          this.winreportList = [];
          this.tableHeader = []
          for (const iterator of res.data.fieldList) {
            this.tableHeader.push(iterator)
          }
          this.tableHeader.push('com_sale')
          this.tableHeader.push('return')
          for (const iterator of res.data.bothRows) {
            this.winreportList.push(iterator);
            iterator.com_sale = (iterator.co_comm * iterator.grandTotalSale) / 100
            iterator.return = iterator.grandTotalSale - (iterator.com_sale + iterator.prize)
          }
          this.page.totalPage = this.winreportList.length
          this.isloading = false;
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
    this.branchWinReport();
  },
};
</script>