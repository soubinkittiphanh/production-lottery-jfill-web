<template>
  <div class="">
    <div class="center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
    </div>
    <div class="alert alert-success">
      ສະມາຊິກທັງຫມົດ:
      {{ total }}
      <button v-if="mem_master==1" class="btn btn-warning" @click="toggleDetail">ປີດ-ເປີດ ລາຍງານສາຂາ</button>
      <table v-if="showBrcRe" class="table table-striped table-sm" id="branchreport">
        <thead>
          <tr>
            <th scope="col">ສາຂາ</th>
            <th scope="col">ຍອດຂາຍ</th>
            <th scope="col">%ຂາຍ</th>
            <th scope="col">ລວມຖືກລາງວັນ</th>
            <th scope="col">ຍອດສົ່ງຄືນ</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="d in brcreport" v-bind:key="d.brc_code>
        
        </tr> -->
          <tr v-for="d in brcreport" v-bind:key="d.brc_code">
            <td>{{ d.brc_code }}</td>
            <td>{{ String(formatNum(d.total)) }}</td>
            <td>{{ String(formatNum(d.total_com1)) }}</td>
            <td>{{ String(formatNum(d.win_amount)) }}</td>
            <td>{{ String(formatNum(d.total-(d.total_com1+d.win_amount))) }}</td>
          </tr>
          <tr style="color: red">
          <th scope="col">ລວມ:</th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["total"])) }}]
          </th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["total_com1"])) }}]
          </th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["win_amount"])) }}]
          </th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["total"] -(branchExtract[0]["total_com1"]+branchExtract[0]["win_amount"]    )    )) }}]
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
        </tbody>
      </table>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ຊື່</th>
          <th scope="col">ສາຂາ</th>
          <th scope="col">ກຸ່ມ</th>
          <th scope="col">ID</th>
          <!-- <th scope="col">ບ້ານ</th>
          <th scope="col">ເມືອງ</th>
          <th scope="col">ແຂວງ</th> -->
          <th scope="col">ຍອດຂາຍ</th>
          <th scope="col">%ຂາຍ</th>
          <th scope="col">ຍອດຖືກ</th>
          <th scope="col">%ລາງວັນ</th>
          <th scope="col">ສົ່ງAdmin</th>
          <th scope="col">Status</th>
          <th scope="col">ແກ້ໄຂ</th>
        </tr>
        <tr style="color: red">
          <th scope="col">ຫົວຫນ້າສາຂາ%</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["total"])) }}]
          </th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["total_com1"])) }}]
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col">
            [{{ String(formatNum(branchExtract[0]["total"] -(branchExtract[0]["total_com1"]+branchExtract[0]["win_amount"]    )    )) }}]
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ລວມຍອດທັງໝົດ:</td>
          <td></td>
          <td></td>
          <td></td>
          <!-- <td></td>
          <td></td>
          <td></td> -->
          <td>[{{ String(formatNum(totalsale)) }}]</td>
          <td>[{{ String(formatNum(totalcom3)) }}]</td>
          <td>[{{ String(formatNum(totalwin)) }}]</td>
          <td>[{{ String(formatNum(totalcom5)) }}]</td>
          <td>[{{ String(formatNum(totalreturn)) }}]</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="d in data" v-bind:key="d.id">
          <td>{{ d.name }}</td>
          <td>{{ d.branch }}</td>
          <td>{{ d.group }}</td>
          <td>{{ d.logid }}</td>
          <!-- <td>{{ d.vill }}</td>
          <td>{{ d.dist }}</td>
          <td>{{ d.pro }}</td> -->
          <td>{{ String(formatNum(d.total)) }}</td>
          <td>{{ String(formatNum((d.total * d.comsale) / 100)) }}</td>
          <td>{{ String(formatNum(d.winamount)) }}</td>
          <td>{{ String(formatNum((d.winamount * d.comwin) / 100)) }}</td>
          <td>
            {{
              String(
                formatNum(
                  d.total -
                    (d.total * d.comsale) / 100 -
                    d.winamount -
                    (d.winamount * d.comwin) / 100
                )
              )
            }}
          </td>
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
      showBrcRe: false,
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
      brcreport: [],
      branchExtract: [
        {
          brc_code: "",
          com_sale: 0,
          com_win: 0,
          total_com1: 0,
          total_com2: 0,
          totalreturn: 0,
          win_amount: 0,
          total: 0,
        },
      ],
    };
  },
  methods: {
    toggleDetail(){
      if (this.mem_master==0) return;
      this.showBrcRe=!this.showBrcRe;
    },
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
    getData(pageNumber) {
      let responseData = [];
      const pl = this.perPage;
      for (let i = 0; i < pl; i++) {
        let id = pageNumber != 1 ? pageNumber * pl - pl + i : i;
        if (id === this.total - 1) i = pl + 1;
        responseData.push({
          id: this.originData[id].id,
          name: this.originData[id].name,
          branch: this.originData[id].branch,
          group: this.originData[id].group,
          lname: this.originData[id].lname,
          logid: this.originData[id].logid,
          logpass: this.originData[id].logpass,
          vill: this.originData[id].vill,
          dist: this.originData[id].dist,
          pro: this.originData[id].pro,
          active: this.originData[id].active,
          admin: this.originData[id].admin,
          total: this.originData[id].total,
          comsale: this.originData[id].comsale,
          comwin: this.originData[id].comwin,
          winamount: this.originData[id].winamount,
        });
      }
      this.data = responseData;
    },
    async fetchBrcReport() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "brcreport", { data: null })
        .then((res) => {
          console.log(res);
          var results = [];
          console.log("====> BEFORE FETCH BRC ORIGIN");
          for (const i in res.data) {
            results.push({
              brc_code: res.data[i].brc_code,
              com_sale: res.data[i].com_sale,
              com_win: res.data[i].total,
              total_com1: res.data[i].total_com1,
              total_com2: res.data[i].total_com2,
              totalreturn: res.data[i].totalreturn,
              win_amount: res.data[i].win_amount,
              total: res.data[i].total,
            });
          }

          this.brcreport = results;
          this.branchExtract = this.origin_brc_report;
          console.log("============>" + this.branchExtract[0]["brc_code"]);

          console.log(this.brcreport);
        })
        .catch((e) => {
          alert("ERROR: " + e);
        });
    },
    async fetchuser() {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "fetchuser", {
          params: {
            p_mem_id: this.mem_id,
            p_master: this.mem_master,
          },
        })
        .then((res) => {
          var results = [];
          for (const id in res.data) {
            results.push({
              id: res.data[id].id,
              name: res.data[id].mem_name,
              branch: res.data[id].brc_code,
              group: res.data[id].group_code,
              lname: res.data[id].mem_lname,
              logid: res.data[id].mem_id,
              logpass: res.data[id].mem_pass,
              vill: res.data[id].mem_village,
              dist: res.data[id].mem_dist,
              pro: res.data[id].mem_pro,
              active: res.data[id].active,
              admin: res.data[id].admin,
              total: res.data[id].total,
              comsale: res.data[id].com_sale,
              comwin: res.data[id].com_win,
              winamount: res.data[id].win_amount,
            });
            //Cal total amount of sale, com30, com5, return admin
            this.totalsale += res.data[id].total;
            this.totalcom3 +=
              (res.data[id].total * res.data[id].com_sale) / 100;
            this.totalwin += res.data[id].win_amount;
            this.totalcom5 +=
              (res.data[id].win_amount * res.data[id].com_win) / 100;
            this.totalreturn +=
              res.data[id].total -
              (res.data[id].total * res.data[id].com_sale) / 100 -
              res.data[id].win_amount -
              (res.data[id].win_amount * res.data[id].com_win) / 100;
          }
          this.users = results;
          this.data = results;
          this.originData = this.data;
          this.total = this.originData.length;
          this.perPage = 20;
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
  async created() {
    await this.fetchBrcReport();
    await this.fetchuser();
    console.log("created: ");
  },
  mounted() {
    console.log("mounted: ");
    this.currentPage = 1;
  },
  computed: {
    // brc_total(){
    //   var total_sale=0;
    //   var total_com=0;
    //   var total_win=0;

    // },
    mem_id() {
      return this.$store.getters.user_id;
    },
    mem_master() {
      return this.$store.getters.isMaster;
    },
    origin_brc_report() {
      let branch = [
        {
          brc_code: "",
          com_sale: 0,
          com_win: 0,
          total_com1: 0,
          total_com2: 0,
          totalreturn: 0,
          win_amount: 0,
          total: 0,
        },
      ];
      if (this.mem_master == 1) {
        this.brcreport.forEach((i) => {
          console.log("pppp" + i["brc_code"]);
          console.log(branch[0]["totalreturn"]);
          branch = [
            {
              brc_code: i["brc_code"],
              com_sale: branch[0]["com_sale"] + i.com_sale,
              com_win: branch[0]["com_win"] + i.com_win,
              total_com1: branch[0]["total_com1"] + i.total_com1,
              total_com2: branch[0]["total_com2"] + i.total_com2,
              totalreturn: branch[0]["totalreturn"] + i.totalreturn,
              win_amount: branch[0]["win_amount"] + i.win_amount,
              total: branch[0]["total"] + i.total,
            },
          ];
        });
        return branch;
      }
      const cocode = this.$store.getters.co_code;
      console.log("cocode" + cocode);
      let sel_brc = this.brcreport.find((el) => el["brc_code"] == cocode);
      branch = [sel_brc];
      return branch;
    },
  },
};
</script>