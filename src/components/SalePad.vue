<template>
  <section id="main">
    <!-- :class="{total:get_ism.ref=='null' || !get_ism.ref}"  -->
    <div class="salelist">
      <form class="form-group row">
        <label
          for=""
          class="col-sm-12 col-form-label"
          :class="{ total: get_ism_class }"
          >ເລກບິນ: {{ bill_num }} | ງວດທີ: {{ get_ism_ref }} | ອອກວັນທີ:
          {{ get_ism_date }}</label
        >
        <!-- <label for="" class="col-md-2 col-form-label"><span>ງວດທີ:111111 ອອກວັນທີ: 20-20-21  ຜູ້ຂາຍ: 11111</span></label> -->
        <div class="col-sm-6">
          <input
            placeholder="ເລກສ່ຽງ"
            type="text"
            class="form-control"
            :style="isLek ? mycssstype : ''"
            v-model.trim="enteredLek"
            @click="swtichLekandAmount('l')"
            onfocus="blur()"
          />
        </div>
        <!-- <label for="" class="col-sm-2 col-form-label">ຈຳນວນເງິນ</label> -->
        <div class="col-sm-6">
          <input
            placeholder="ຈຳນວນເງິນ"
            type="text"
            class="form-control"
            :style="isAmount ? mycssstype : ''"
            v-model.trim="enteredAmount"
            @click="swtichLekandAmount('a')"
            onfocus="blur()"
          />
        </div>
      </form>
    </div>
    <div id="printOnly" class="row">
      <h6>ກະຊວງການເງິນ</h6>
      <h6>ບໍລິສັດ ລັດວິສາຫະກິດ ຫວຍພັດທະນາ</h6>
      <h6>ຕົວແທນນະຄອນຫລວງເລກ 4</h6>
      <h6>ນະຄອນປາເຊ</h6>
      <p>
        ງວດທີ: {{ get_ism_ref }} | ເລກບິນ: {{ bill_num }} | ອອກວັນທີ:
        {{ get_ism_date }}
      </p>
      <div class="row">
        <div class="col-sm-6">
          <table class="table sm">
            <thead>
              <tr>
                <th scope="col">ເລກສ່ຽງ</th>
                <th scope="col">ຈຳນວນເງິນ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(itm, idx) in saleLek" :key="idx">
                <td v-if="idx % 2 == 0">{{ itm.lek }}</td>
                <td v-if="idx % 2 == 0">
                  {{ formatNum(itm.sale) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-6">
          <table class="table sm">
            <thead>
              <tr>
                <th scope="col">ເລກສ່ຽງ</th>
                <th scope="col">ຈຳນວນເງິນ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(itm, idx) in saleLek" :key="idx">
                <td v-if="idx % 2 != 0">{{ itm.lek }}</td>
                <td v-if="idx % 2 != 0">
                  {{ formatNum(itm.sale) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="keypad">
      <div class="row">
        <div class="col-sm-12">
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('1')"
          >
            1
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('2')"
          >
            2
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('3')"
          >
            3
          </button>
          <button class="btn btn-danger fixedbutton-r" @click="clearBill">
            ເລີ່ມໃຫມ່
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('4')"
          >
            4
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('5')"
          >
            5
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('6')"
          >
            6
          </button>
          <button class="btn btn-success fixedbutton-r" @click="addLek">
            ຂາຍ
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('7')"
          >
            7
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('8')"
          >
            8
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('9')"
          >
            9
          </button>
          <button
            class="btn btn-warning fixedbutton-r"
            onclick="window.print()"
          >
            <i class="fas fa-print"></i>ພິມບິນ
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('000')"
          >
            000
          </button>
          <button
            class="btn btn-primary fixedbutton-l"
            @click="enterNumber('0')"
          >
            0
          </button>
          <button class="btn btn-primary fixedbutton-l" @click="clearInp()">
            ລົບ
          </button>
          <button class="btn btn-danger fixedbutton-r" @click="submitLek">
            ປິດບິນ
          </button>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <span class="col-sm-12 total"
              >ຍອດລວມ: {{ caltotal }} ກີບ | ເວລາປະຈຸບັນ: {{ curtime }}</span
            >
            <!-- <span class=" material-icons col-sm-2">account_circle</span>  -->
            <!-- <label class="col-sm-2"> <span class="material-icons">account_circle</span>{{get_user}}</label> -->
          </div>
        </div>
      </div>
    </div>
    <div id="salelist">
      <ul>
        <sale-card
          v-for="(itm, idx) in saleLek"
          :key="idx"
          :id="idx"
          :luck-num="itm.lek"
          :price="itm.sale"
          @delete-lucknum="removeLek"
        ></sale-card>
      </ul>
    </div>
    <div id="printOnly">
      <hr />
      <p>ລວມເງິນທັງໝົດ: {{ caltotal }} ກີບ</p>
      <hr />
      <p>ຜູ້ຂາຍ: {{ get_user }}</p>
      <p>ເວລາພິມ: {{ formatdate(new Date()) }} | {{ curtime }}</p>
      <p>ເບີໂທຕິດຕໍ່: 020 9558 8945</p>
      <p>ໝົດກຳນົດຮັບລາງວັນ: {{ expireDate }}</p>
      <qrcode-vue :value="qr_code">
      </qrcode-vue>
      <p>{{qr_code}}</p>
      <p>ຂໍໃຫ້ທ່ານໂຊກດີ</p>
    </div>
    <div>
      
      <!-- Employee fetch from server -->
      <!-- <p v-if="isloading">Loading...</p> -->
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <!-- <span class="sr-only" v-if="isloading">Loading...</span> -->
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
      <p v-else-if="!isloading && (!emp || emp.length === 0)">No data...!</p>
      <ul v-else>
        <!-- <li v-for="itm in emp" :key="itm.id">{{ itm.name }}</li> -->
      </ul>
    </div>
  </section>
  <base-dialog :show="exp.length > 0" title="ຂໍ້ມູນ" @close="exp = []">
    <li v-for="itm in exp" :key="itm">
      {{ itm }}
    </li>
  </base-dialog>
  <!-- <button class="btn btn-primary" @click="null">Cam</button> -->
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
import SaleCard from "./SaleCard.vue";
// import SimModal from "./ui/SimpleModal";
import BaseDialog from "./ui/BaseDialog";
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    SaleCard,
    // SimModal,
    BaseDialog,
    QrcodeVue,
  },
  mounted() {
    this.fetchdata();
    this.interval = setInterval(() => {
      this.displayTime();
    }, 1000);

    this.displayTime();
  },
  data() {
    return {
      qr_code:'',
      showModal: true,
      mycssstype: "border:1px solid red",
      enteredLek: "",
      enteredAmount: "",
      isAmount: false,
      isLek: false,
      saleLek: [],
      emp: [],
      isloading: false,
      error: null,
      exp: [],
      bill_num: "1####",
      curtime: "",
    };
  },

  computed: {
    // qr_generator(){
    //   return this.qr_provider();//Math.floor((Math.random() * 100000000000000000) + 1).toString();
    // },
    selectedinput() {
      return {
        "border:1px solid red": this.isLek,
      };
    },
    caltotal() {
      var total = 0;
      for (var itm of this.saleLek) {
        console.log("List: " + itm.sale);
        total += parseInt(itm.sale);
      }
      return this.formatNum(total);
    },
    get_ism_class() {
      const c = this.$store.getters.ism_info;
      return c.ref == "null" || !c.ref ? true : false;
    },
    get_ism_ref() {
      //  return  this.$store.getters.ism_info;
      const ism = this.$store.getters.ism_info;
      return ism.ref == "null" || !ism.ref ? "[X]" : ism.ref;
    },
    get_ism_date() {
      //  return  this.$store.getters.ism_info;
      const ism = this.$store.getters.ism_info;
      return ism.ref == "null" || !ism.ref ? "[X]" : this.formatdate(ism.date);
    },
    get_user() {
      return this.$store.getters.user_id;
    },
    expireDate() {
      var date = new Date();

      // add a day
      date.setDate(date.getDate() + 7);
      return this.formatdate(date);
    },
  },
  created() {
    this.checkISM();
    this.qr_provider();
  },
  methods: {
    qr_provider(){
      this.qr_code= Math.floor((Math.random() * 10000000000000) + 1).toString();
      
    },
    displayTime() {
      let dt = new Date();
      this.curtime = dt.toLocaleTimeString();
    },
    clearInp() {
      if (this.isAmount) {
        this.enteredAmount = "";
      } else if (this.isLek) {
        this.enteredLek = "";
      }
    },
    async checkISM() {
      await this.$store.dispatch("loadISM");
    },
    formatdate(date) {
      var dateVisible = new Date(date);
      var m = "" + (dateVisible.getMonth() + 1);
      var d = "" + dateVisible.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      dateVisible = d + "-" + m + "-" + dateVisible.getFullYear();
      console.log(dateVisible);
      return dateVisible; //"this.dateVisible";
    },
    clearBill() {
      var con = confirm("ທ່ານຕ້ອງການເລີ່ມບິນໃຫມ່ ?");
      if (con) {
        this.saleLek = [];
        this.bill_num = "1####";
        this.qr_provider();
      }
    },
    showarray() {
      console.log(this.saleLek);
    },
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
    enterNumber(val) {
      if (this.isAmount) {
        this.enteredAmount += val;
      } else if (this.isLek && this.enteredLek.length < 4) {
        console.log(this.enteredLek.length);
        this.enteredLek += val;
      }
    },
    swtichLekandAmount(val) {
      if (val === "l") {
        this.isLek = true;
        this.isAmount = false;
      } else {
        this.isAmount = true;
        this.isLek = false;
      }
    },
    backspace() {
      this.isAmount ? this.isAmount.slice(0, -1) : this.isLek.slice(0, -1);
    },
    addLek() {
      if (!this.enterNumber || !this.enteredAmount) {
        console.log("emty");
      } else {
        console.log("Sale");
        const enteredSale = {
          lek: this.enteredLek,
          // lek: parseInt(this.enteredLek),
          sale: parseInt(this.enteredAmount),
        };

        this.saleLek.push(enteredSale);
        this.enteredLek = "";
        this.enteredAmount = "";
        this.swtichLekandAmount("l");
      }
    },
    removeLek(val) {
      alert(val);
      this.saleLek.splice(val, 1);
    },
    async submitLek() {
      console.log("get in....");
      await this.checkISM();
      // console.log(checking);
      if (this.get_ism_class) {
        alert("ບໍ່ມີງວດທີ່ເປີດຢູ່");
        return;
      } else if (this.saleLek.length < 1) {
        alert("ບໍ່ມີເລກທີ່ຕ້ອງການຂາຍ");
        return;
      } else if (this.bill_num !== "1####") {
        alert("ບິນນີ້ຂາຍໄປແລ້ວ!");
        return;
      }
      this.isloading = true;
      this.error = null;
      axios
        .post(apiDomain.url + "sale", {
          item: this.saleLek,
          ism: this.get_ism_ref,
          user: this.get_user,
          qr_code:this.qr_code,
        })
        .then((res) => {
          this.isloading = false;
          if (res.data[0].bill_num) {
            console.log(res.data[0].bill_num);
            this.bill_num = res.data[0].bill_num;
          }
          this.exp = res.data;
        })
        .catch((er) => {
          alert(er);
          this.isloading = false;
          this.error = "ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່";
        });
    },
    submitLekTest() {
      console.log("get in....");
      axios.post(apiDomain.url + "create", {
        name: "Soubin Kittiphanh",
        age: 28,
        country: "Laos",
        position: "Programmer FullStack",
        wage: 10000000,
      });
    },
    fetchdata() {
      this.isloading = true;
      this.error = null;
      fetch(apiDomain.url + "employees")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.isloading = false;
          const results = [];
          for (const id in data) {
            results.push({
              id: id,
              name: data[id].name,
              age: data[id].age,
              country: data[id].country,
              position: data[id].position,
              wage: data[id].wage,
            });
          }
          this.emp = results;
        })
        .catch((error) => {
          console.log(error);
          this.isloading = false;
          this.error = "ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່";
        });
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.fixedbutton-l {
  min-width: 65px;
  /* max-width: 80px; */
}
.fixedbutton-r {
  width: 85px;
  max-width: 90px;
  
}
html {
  font-family: BoonHome;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem;
  border-radius: 10px;
  padding: 1rem;
  background-color: #1b995e;
  color: white;
  text-align: center;
}

#main {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  /* margin: 3rem; */
  margin: 0;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

#main h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #1b995e;
  margin: 0 0 1rem 0;
}

#main ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

#main li {
  /* margin: 1rem 0; */
  margin: 2px;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: #8ddba4;
  padding: 0.5rem;
  color: #1f1f1f;
  border-radius: 25px;
}

#main input {
  font: inherit;
  border: 1px solid #ccc;
}

#main input:focus {
  outline: none;
  border-color: #1b995e;
  background-color: #d7fdeb;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.btn {
  margin: 3px 3px;
}
.error {
  border: 1px solid red;
  color: red;
}

.total {
  font-weight: bold;
  color: red;
}
#printOnly {
  display: none;
  color: #000;
  width: 60mm;
}
/* #main button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#main button:hover,
#main button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
} */

/* // fetch("http://localhost:3001/employees",{
      //   // http://localhost:3001/employees              ( /surveys.json ) this need for firebase to create table with named survey
      //   method:'POST',
      //   headers:{
      //     'Content-Type':'application/json'
      //   },
      //   body:JSON.stringify({
      //     lucknum:this.enteredLek,
      //     amount:this.enteredAmount,
      //   })
      // })
      // axios.get("http://localhost:3001/employees",{
      //   action:"fetch"
      // }).then(function(response){
      //   console.log(response.data);
      //   this.emp=response.data;
      // }); */

@media print {
  .keypad {
    display: none;
  }
  #salelist {
    display: none;
    font-size: 10px;
    font-weight: normal;
  }
  .salelist {
    display: none;
    color: red;
  }
  #printOnly {
    display: block;
  }
}
</style>

