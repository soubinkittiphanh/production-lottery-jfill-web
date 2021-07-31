<template>
  <div class="">
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label"
          >ໂຕຫຍໍ້ກຸ່ມຜູ້ໃຊ້:</label
        >
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="::: PXK :::"
            v-model="sel_g_p.code"
            :disabled="id"
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຊື່ກຸ່ມຜູ້ໃຊ້:</label
        >
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="::: ສາຂາປາເຊ :::"
            v-model="sel_g_p.name"
          />
          <label for=""></label>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ເມນູໃຊ້ງານ:</label>
        <div class="col-md-12">
          <select
            class="form-select"
            aria-label="Default select example"
            :required="true"
            v-model="m_select"
            @change="onChangeSelect($event)"
          >
            <option v-for="(v, k) in sel_g_p.menu" v-bind:key="k" :value="k">
              {{ keyDesc(k) }} | {{ v }}
            </option>
          </select>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ອະນຸຍາດ?: {{ m_select }}</label
        >
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <button
                class="btn btn-success"
                @click.prevent="!id ? createBrch() : updateBrch(id)"
              >
                {{ !id ? "ເພີ່ມ" : "ບັນທຶກ" }}
              </button>
            </div>
            <div class="col-md-6">
              <button
                v-if="id"
                class="btn btn-danger"
                @click.prevent="resetText"
              >
                ຍົກເລີກ
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <hr />

    <div>
      <ul></ul>
    </div>
    <group-page @update-group="resdata" :datas="data" ref="brcp"></group-page>
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
import GroupPage from "../components/PaginationGroup.vue";
export default {
  components: {
    GroupPage,
  },
  watch: {
    m_select: function (val) {
      console.log("WATCHER: " + val);
    },
  },
  data() {
    return {
      isloading: false,
      id: null,
      error: null,
      abbr: "",
      name: "",
      desc: "",
      m_select: "",
      sel_g_p: {
        id: "",
        code: "",
        name: "",
        desc: "",
        menu: {
          m_home: 0,
          m_category: 0,
          m_branch: 0,
          m_limited_price: 0,
          m_pay_rate: 0,
          m_sale: 0,
          m_re_sale: 0,
          m_re_win: 0,
          m_s_member: 0,
          m_i_member: 0,
          m_master: 0,
        },
      },
      data_user: [],
      data: [],
    };
  },
  computed: {},
  methods: {
    onChangeSelect(event) {
      this.m_select = event.target.value;
      console.log("====================================");
      console.log("EVANT CHANGE M: " + this.m_select);
      console.log("EVANT CHANGE E: " + event.target.value);
      console.log("====================================");
    },
    keyDesc(objMem) {
      this.m_select = objMem;
      let desc = "";
      switch (objMem) {
        case "m_home":
          desc = "ການເຂົ້າເຖິງ ການເປີດງວດ";
          break;
        case "m_category":
          desc = "ການເຂົ້າເຖິງ ການຈັດການປະເພດເລກ";
          break;
        case "m_branch":
          desc = "ການເຂົ້າເຖິງ ການຈັດການສາຂາ";
          break;
        case "m_limited_price":
          desc = "ການເຂົ້າເຖິງ ການກຳນົດເລກເຕັມຮູ";
          break;
        case "m_pay_rate":
          desc = "ການເຂົ້າເຖິງ ການກຳນົດອັດຕາຈ່າຍລາງວັນ";
          break;
        case "m_sale":
          desc = "ການເຂົ້າເຖິງ ການຂາຍ";
          break;
        case "m_re_sale":
          desc = "ການເຂົ້າເຖິງ ການລາຍງານຍອດຂາຍ";
          break;
        case "m_re_win":
          desc = "ການເຂົ້າເຖິງ ການລາຍງານຍອດຖືກລາງວັນ";
          break;
        case "m_s_member":
          desc = "ການເຂົ້າເຖິງ ການກຳນົດສິດທິຜູ້ໃຊ້";
          break;
        case "m_i_member":
          desc = "ການເຂົ້າເຖິງ ການເບິ່ງສະມາຊິກທັງຫມົດ";
          break;
        case "m_master":
          desc = "ເປັນ Master";
          break;
        default:
          this.keyDesc = "";
          break;
      }
      return desc;
    },
    createBrch() {
      if (!this.abbr || !this.name) {
        // IF NO INFO PROVIDED
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ");
      } else {
        axios
          .post(apiDomain.url + "createbrc", {
            id: this.id,
            abbr: this.abbr,
            name: this.name,
            desc: this.desc,
          })
          .then((res) => {
            this.isloading = false;
            alert(res.data);
            // res.status==200?this.fetchGroup:null
            res.status == 200 ? this.$refs.brcp.fetchGroup() : null;
          })
          .catch((er) => {
            alert("ເກີດປັນຫາຂັດຂ້ອງ: " + er);
          });
      }
    },
    resetText() {
      this.id = null;
      this.name = "";
      this.abbr = "";
      this.desc = "";
    },
    resdata(id, sel_group) {
      this.id = id;
      this.sel_g_p = sel_group;
      console.log("DATA FROM WALL:" + id);
      console.log("====================================");
      console.log(this.sel_g_p.name);
      console.log(this.sel_g_p.menu["m_home"]);
      console.log("====================================");
      for (const [key, value] of Object.entries(this.sel_g_p.menu)) {
        console.log(`${key}: ${value}`);
        console.log("<====================================>");
      }
    },
    updateBrch(id) {
      console.log(id);
      if (!this.abbr || !this.name) {
        // IF NO INFO PROVIDED
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ");
      } else {
        axios
          .put(apiDomain.url + "updatebrc", {
            id: this.id,
            abbr: this.abbr,
            name: this.name,
            desc: this.desc,
          })
          .then((res) => {
            this.isloading = false;
            alert(res.data);
            // res.status == 200 ? (this.id = this.resetText()) : null; // RESET TEXTFIELD IF UPDATE SUCCEED
            res.status == 200 ? this.$refs.brcp.fetchGroup() : null;

            console.log("::::::::::" + res.status);
          })
          .catch((er) => {
            alert("ເກີດປັນຫາຂັດຂ້ອງ: " + er);
          });
      }
    },
    async fetchGroup() {
      this.isloading = true;
      this.error = null;
      await axios
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
          this.data_user = results;
          this.data = results;
          console.log(this.data[0].name + "==================DATA_USER");
          console.log(":::::::::::::::" + this.data.length);
          console.log(":::::::::::::::" + this.data);
          console.log(":::::::::::::::" + res.data[0]);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
        });
    },
  },
  async created() {
    console.log("=================FETCH GROUP===================");
    // await this.fetchGroup();

    console.log("====================================");
    // console.log(this.data_user[0].id);
    console.log("====================================");
  },
  mounted() {
    this.data = this.data_user;
    console.log("=================Mount Parent===================");
  },
};
</script>
