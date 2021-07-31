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
            placeholder="::: MASTER | ADMIN | USER | :::"
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
            placeholder="::: ແອັດມິນມາສເຕີ | ຜູ້ຈັດການສາຂາ | ພງ ຂາຍ  :::"
            v-model="sel_g_p.name"
          />
          <label for=""></label>
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຂໍ້ມູນອື່ນໆ:</label
        >
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="::: ຜູ້ໃຊ້ທົ່ວໄປ ສາຂາ XXX :::"
            v-model="sel_g_p.desc"
          />
          <label for=""></label>
        </div>
        <div class="col-md-12">
          <select
            class="form-select"
            aria-label="Default select example"
            :required="true"
            v-model="m_select.menu"
            @change="onChangeSelect($event)"
          >
            <option v-for="(v, k) in sel_g_p.menu" v-bind:key="k" :value="k" :class="v==0?'error':null">
             {{ keyDesc(k) }} | {{ v }}  {{v==1?'ອະນຸຍາດ':'ບໍ່ອະນຸຍາດ'}}
            </option>
          </select>
        </div>
        <div class="col-md-12 custom-control custom-switch">
          <input
            v-model="m_select.isopen"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            @click="toggleSwitch"
          />
          <label
            class="custom-control-label"
            for="customSwitch1"
            style="float: right"
            >ປິດ(ບ)-ເປິດ(ອ)</label
          >
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <button
                class="btn btn-success"
                @click.prevent="!id ? createGroup() : updateGroup(id)"
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
  data() {
    return {
      isloading: false,
      id: null,
      error: null,
      abbr: "",
      name: "",
      desc: "",
      m_select: { menu: "m_category", isopen: true },
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
  computed: {
    classRender(v){
      let re_v=v==0?'error':'success';
      return re_v;
    }
  },
  methods: {
    toggleSwitch() {
      this.m_select.isopen = !this.m_select.isopen;
      this.sel_g_p.menu[this.m_select.menu]=this.m_select.isopen==true?1:0;
      console.log('*****TOGGLE*****'+this.sel_g_p.menu[this.m_select.menu]);
    },
    onChangeSelect(event) {
      this.m_select.menu = event.target.value;
      this.m_select.isopen = this.sel_g_p.menu[event.target.value]==1?true:false;
      this.sel_g_p.menu[this.m_select.menu]=this.m_select.isopen==true?1:0;
      console.log("===================================="+this.sel_g_p.menu[event.target.value]);
      console.log("EVANT CHANGE M: " + this.m_select.menu);
    },
    keyDesc(objMem) {
      console.log("**********Key Desc Converter");
      console.log("**********" + objMem);
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
        case "m_group":
          desc = "ການເຂົ້າເຖິງ ການຈັດການກຸ່ມ";
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
    createGroup() {
      if (!this.sel_g_p.code || !this.sel_g_p.name) {
        // IF NO INFO PROVIDED
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ");
      } else {
        axios
          .post(apiDomain.url + "creategroup", {
            'g_data':this.sel_g_p,
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
      this.sel_g_p.name = "";
      this.sel_g_p.code = "";
      this.sel_g_p.desc = "";
      this.sel_g_p.id = "";
    },
    resdata(id, sel_group) {
      this.id = id;
      this.sel_g_p = sel_group;
      this.m_select.isopen=this.sel_g_p.menu['m_category']==1?true:false
      this.m_select.menu='m_category'
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
    updateGroup(id) {
      console.log(id);
      if (!this.sel_g_p.code || !this.sel_g_p.name) {
        // IF NO INFO PROVIDED
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ");
      } else {
        axios
          .put(apiDomain.url + "updategroup", {
            'g_data':this.sel_g_p,
          })
          .then((res) => {
            this.isloading = false;
            alert(res.data);
            // res.status == 200 ? (this.id = this.resetText()) : null; // RESET TEXTFIELD IF UPDATE SUCCEED
            res.status == 200 ? this.$refs.brcp.fetchGroup() : null;
            this.resetText();
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
                m_group: res.data[id].m_group,
                m_master: res.data[id].m_master,
              },
            });
          }
          this.data_user = results;
          this.data = results;
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
<style scoped>
.error{
  color: red;
}
</style>
