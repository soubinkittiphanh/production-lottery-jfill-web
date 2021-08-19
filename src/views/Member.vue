<template>
  <div class="containerv card">
    <form>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>

      <div class="form-group row">
        <label for="roll_id" class="col-md-2 col-form-label">ສາຂາ:</label>
        <div class="col-md-12">
          <select
            class="form-select"
            aria-label="Default select example"
            :required="true"
            v-model="brc_code"
            :disabled="mem_master!=1"
          >
            <option v-for="d in branch" v-bind:key="d.id" :value="d.code">
              {{ d.code }} | {{ d.name }}
            </option>
          </select>
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ກຸ່ມຜູ້ໃຊ້:</label>
        <div class="col-md-12">
          <select
            class="form-select"
            aria-label="Default select example"
            :required="true"
            v-model="sel_group"
          >
            <option v-for="d in group_data" v-bind:key="d.id" :value="d.code">
              {{ d.code }}
            </option>
          </select>
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ຊື່ຜູ້ໃຊ້:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="name" />
          <span class="error" v-if="!formvailid.name">ກະລຸນາໃສ່ຊື່</span>
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ນາມສະກຸນ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="lname" />
          <span class="error" v-if="!formvailid.lname">ກະລຸນາໃສ່ນາມສະກຸນ</span>
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ໄອດີ:</label>
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            v-model="logid"
            disabled
            placeholder="ລະບົບຈະໃສ່ໄອດີໃຫ້ອັດຕະໂນມັດ"
          />
          <span class="error" v-if="!formvailid.logid"
            >ກະລຸນາໃສ່ໄອດີເຂົ້າລະບົບ</span
          >
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ລະຫັດ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="logpass" />
          <span class="error" v-if="!formvailid.logpass"
            >ກະລຸນາໃສ່ລະຫັດເຂົ້າລະບົບ</span
          >
          <!-- <div v-if="id"> -->
          <button
            v-if="id"
            class="btn btn-danger"
            @click.prevent="resetpass(id)"
          >
            RESET
          </button>
          <!-- </div> -->
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ບ້ານ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="vill" />
          <span class="error" v-if="!formvailid.vill">ກະລຸນາໃສ່ທີ່ຢູ່ບ້ານ</span>
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ເມືອງ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="dist" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ແຂວງ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="pro" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ຜູ້ແນະນຳ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="recommendator" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">ເບີໂທ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="tel" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">%ຂາຍ:</label>
        <div class="col-md-12">
          <input type="number" class="form-control" v-model="comsale" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">%ຖືກລາງວັນ:</label>
        <div class="col-md-12" v-if="mem_master==1" >
          <input type="number" class="form-control" v-model="comwin" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label"></label>
        <div class="col-md-12">
          <button
            class="btn btn-success"
            @click.prevent="!id ? crateuser() : updateuser(id)"
          >
            {{ !id ? "ເພີ່ມ" : "ບັນທຶກ" }}
          </button>
        </div>
        <div class="col-md-12 custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch2"
            v-model="active"
          />
          <label
            class="custom-control-label"
            for="customSwitch2"
            style="float: right"
            >[ໃຊ້ງານຢູ່]</label
          >
        </div>
        <div class="col-md-12 custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitch3"
            v-model="admin"
          />
          <label
            class="custom-control-label"
            for="customSwitch3"
            style="float: right"
            >[ Admin]</label
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import apiDomain from "../config";
export default {
  data() {
    return {
      isloading: false,
      error: null,
      id: -1,
      name: "",
      lname: "",
      logid: "",
      sel_group: "",
      group_data: [],
      logpass: "",
      vill: "",
      dist: "",
      pro: "",
      recommendator: "",
      tel: "",
      selected: "",
      brc_code:"PXK",
      branch: [],
      comsale: 0,
      comwin: 0,
      active: true,
      admin: false,
      formvailid: {
        name: false,
        lname: false,
        logid: false,
        logpass: false,
        vill: false,
      },
    };
  },
 computed: {
    mem_master() {
      console.log("COMPUTER: "+this.$store.getters.co_code);
      return this.$store.getters.isMaster;
    },
    state_cocode(){
      return this.$store.getters.co_code;
    }
  },
  watch: {
    id(val) {
      if (val) {
        this.fetchuser(val);
      }
    },
    name(val) {
      this.formvailid.name = !val ? false : true;
    },
    lname(val) {
      this.formvailid.lname = !val ? false : true;
    },
    logid(val) {
      this.formvailid.logid = !val ? false : true;
    },
    logpass(val) {
      this.formvailid.logpass = !val ? false : true;
    },
    vill(val) {
      this.formvailid.vill = !val ? false : true;
    },
    comsale(val){
      if(val>parseInt(localStorage.getItem('cocom'))){
        this.comsale=parseInt(localStorage.getItem('cocom'));
        return alert('ເປິເຊັນຂາຍສູງສຸດ: '+localStorage.getItem('cocom'));
      }
    }
  },
  methods: {
    get_auto_id() {
      if (!this.id) {
        this.isloading = true;
        this.error = null;
        axios
          .get(apiDomain.url + "gen_uid")
          .then((res) => {
            this.logid = res.data[0].mem_id + 1;
            this.isloading = false;
          })
          .catch((err) => {
            this.isloading = false;
            this.error = err;
          });
      }
    },
    async fetchGroup() {
      const res = await axios.get(apiDomain.url + "fetchGroupCode");
      if (res.status == 200) {
        var results = [];
        for (const g in res.data) {
          results.push({
            code: res.data[g].group_code,
            id: res.data[g].id,
          });
        }
        this.group_data = results;
        //====================START remove MASTER group from user that not under Master group=================
        if(!this.id || this.mem_master!=1){
          this.group_data.splice(0,1);
          this.group_data.splice(5,1);
        }
        //====================END REMOVE MASTER GROUP FROM NOT MASTER USER-GROUP====================
        if (!this.sel_group) {
          this.sel_group = this.group_data[this.group_data.length-1]["code"];
        }
      } else {
        alert("ເກີດຂໍ້ຜິດພາດ ERROR: " + res.error);
      }
    },
    crateuser() {
      if(this.comsale>parseInt(localStorage.getItem('cocom'))){
        this.comsale=parseInt(localStorage.getItem('cocom'));
        return alert('ເປິເຊັນຂາຍສູງສຸດ: '+localStorage.getItem('cocom'));
      }else if (
        !this.formvailid.name ||
        !this.formvailid.lname ||
        !this.formvailid.logid ||
        !this.formvailid.logpass ||
        !this.formvailid.vill
      ) {
        alert("ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
      } else {
        // alert("valid");
        this.isloading = true;
        this.error = null;
        axios
          .post(apiDomain.url + "createuser", {
            name: this.name,
            lname: this.lname,
            group_code: this.sel_group,
            logid: this.logid,
            logpass: this.logpass,
            vill: this.vill,
            dist: this.dist,
            pro: this.pro,
            active: this.active,
            admin: this.admin,
            mem_rec: this.recommendator,
            mem_tel: this.tel,
            com_sale: this.comsale,
            com_win: this.comwin,
            brc_code: this.brc_code,
          })
          .then((res) => {
            alert(res.data);
            this.get_auto_id();
            this.isloading = false;
          })
          .catch((err) => {
            this.isloading = false;
            this.error = err;
            // alert("ເກີດຂໍ້ຜິດພາດ: " + err);
          });
      }
    },
    updateuser(id) {
      this.isloading = true;
      this.error = null;
      if(this.comsale>parseInt(localStorage.getItem('cocom'))){
        this.comsale=parseInt(localStorage.getItem('cocom'));
        return alert('ເປິເຊັນຂາຍສູງສຸດ: '+localStorage.getItem('cocom'));
      }
      axios
        .put(apiDomain.url + "updateuser", {
          id: id,
          name: this.name,
          lname: this.lname,
          group_code: this.sel_group,
          logid: this.logid,
          logpass: this.logpass,
          vill: this.vill,
          dist: this.dist,
          pro: this.pro,
          active: this.active,
          admin: this.admin,
          mem_rec: this.recommendator,
          mem_tel: this.tel,
          com_sale: this.comsale,
          com_win: this.comwin,
          brc_code: this.brc_code,
        })
        .then((res) => {
          this.isloading = false;
          alert(res.data);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
        });
    },
    resetpass(id) {
      this.isloading = true;
      this.error = null;
      axios
        .put(apiDomain.url + "resetpass", {
          id: id,
          logpass: this.logpass,
        })
        .then((res) => {
          this.isloading = false;
          alert(res.data);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
        });
    },
    fetchuser(id) {
      this.isloading = true;
      this.error = null;
      axios
        .get(apiDomain.url + "fetchuserid/?id=" + id)
        .then((res) => {
          this.id = res.data[0].id;
          console.log(res.data);
          this.name = res.data[0].mem_name;
          this.lname = res.data[0].mem_lname;
          this.sel_group = res.data[0].group_code;
          this.logid = res.data[0].mem_id;
          this.logpass = res.data[0].mem_pass;
          this.vill = res.data[0].mem_village;
          this.dist = res.data[0].mem_dist;
          this.pro = res.data[0].mem_pro;
          this.active = res.data[0].active === 1 ? true : false;
          this.admin = res.data[0].admin === 1 ? true : false;
          this.recommendator = res.data[0].mem_rec;
          this.tel = res.data[0].mem_tel;
          this.comsale = res.data[0].com_sale;
          this.comwin = res.data[0].com_win;
          this.brc_code = res.data[0].brc_code;
          console.log(":::::::::::::::BRC::::::::::::::" + this.brc_code);
          this.isloading = false;
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
        });
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
            });
          }
          this.branch = results;
        //   //====================START remove MASTER group from user that not under Master group=================
        // if(!this.id || this.mem_master!=1){
        //   this.group_data.splice(0,1);
        //   this.group_data.splice(5,1);
        // }
        // //====================END REMOVE MASTER GROUP FROM NOT MASTER USER-GROUP====================
          console.log(":::::::::::::::" + this.branch.length);
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
        });
    },
  },
  mounted() {
    console.log("Mounted");
    this.get_auto_id();
  },
  created() {
    this.brc_code=this.$store.getters.co_code;
    this.id = this.$route.params.userid;
    this.fetchbrc();
    this.fetchGroup();

    //======BLOCK COMWIN IF YOU ARE NOT MASTER GROUP============
    if(this.mem_master!=1){
      this.comwin=0;
    }
    console.log("Created");
  },
};
</script>
<style scoped>
.error {
  color: red;
}
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 40rem;
}
</style>
