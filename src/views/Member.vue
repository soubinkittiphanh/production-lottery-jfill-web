<template>
  <div class="containerv card">
    <form>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
      <div class="form-group row">
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
          <input type="text" class="form-control" v-model="comsale" />
        </div>
        <label for="roll_id" class="col-md-2 col-form-label">%ຖືກລາງວັນ:</label>
        <div class="col-md-12">
          <input type="text" class="form-control" v-model="comwin" />
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
      logpass: "",
      vill: "",
      dist: "",
      pro: "",
      recommendator: "",
      tel: "",
      comsale:30,
      comwin:5,
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
    crateuser() {
      if (
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
            logid: this.logid,
            logpass: this.logpass,
            vill: this.vill,
            dist: this.dist,
            pro: this.pro,
            active: this.active,
            admin: this.admin,
            mem_rec: this.recommendator,
            mem_tel: this.tel,
            com_sale:this.comsale,
            com_win:this.comwin,
          })
          .then((res) => {
            alert(res.data);
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
      axios
        .put(apiDomain.url + "updateuser", {
          id: id,
          name: this.name,
          lname: this.lname,
          logid: this.logid,
          logpass: this.logpass,
          vill: this.vill,
          dist: this.dist,
          pro: this.pro,
          active: this.active,
          admin: this.admin,
          mem_rec: this.recommendator,
          mem_tel: this.tel,
          com_sale:this.comsale,
            com_win:this.comwin,
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
          this.logid = res.data[0].mem_id;
          this.logpass = res.data[0].mem_pass;
          this.vill = res.data[0].mem_village;
          this.dist = res.data[0].mem_dist;
          this.pro = res.data[0].mem_pro;
          this.active = res.data[0].active === 1 ? true : false;
          this.admin = res.data[0].admin === 1 ? true : false;
          this.recommendator=res.data[0].mem_rec;
          this.tel=res.data[0].mem_tel;
          this.comsale=res.data[0].com_sale;
          this.comwin=res.data[0].com_win;

          this.isloading = false;
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
        });
    },
  },
  mounted() {
    console.log("Mounted");
    this.get_auto_id();
  },
  created() {
    this.id = this.$route.params.userid;
    console.log("Created");
    // this.id=this.$route.params.userid;
    // const userselected=this.users.find(user => user.id===userid);
    // this.name=userselected.name;
    // this.lname=userselected.lname;
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
