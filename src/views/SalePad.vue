<template>
  <div id="printOnly">
    <p>ກະຊວງການເງິນ</p>
    <p>ບໍລິສັດ ລັດວິສາຫະກິດ ຫວຍພັດທະນາ</p>
    <p>ຕົວແທນນະຄອນຫລວງເລກ 4</p>
    <p>ນະຄອນປາກເຊ</p>
    <p>
      ງວດທີ: {{ get_ism_ref }} | ອອກວັນທີ:
      {{ get_ism_date }}
    </p>
    <p>ເລກບິນ: {{ bill_num }}</p>
    <div class="row">
      <div class="col-sm-6">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ເລກ</th>
              <th scope="col">ຈຳນວນ</th>
            </tr>
          </thead>
          <tbody class="table-borderless">
            <tr v-for="(itm, idx) in saleLek" :key="idx">
              <td class="lek" v-if="idx % 2 == 0">{{ itm.lek }}</td>
              <td class="lek" v-if="idx % 2 == 0">
                {{ formatNum(itm.sale) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-6">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ເລກ</th>
              <th scope="col">ຈຳນວນ</th>
            </tr>
          </thead>
          <tbody class="table-borderless">
            <tr v-for="(itm, idx) in saleLek" :key="idx">
              <td class="lek" v-if="idx % 2 != 0">{{ itm.lek }}</td>
              <td class="lek" v-if="idx % 2 != 0">
                {{ formatNum(itm.sale) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="lek">ລວມເງິນທັງໝົດ: {{ caltotal }} ກີບ</p>
    <!-- <hr /> -->
    <hr />
    <p>ຜູ້ຂາຍ: {{ get_user }}</p>
    <p>ເວລາພິມ: {{ formatdate(new Date()) }} | {{ curtime }}</p>
    <p>ເບີໂທຕິດຕໍ່: 020 9558 8945</p>
    <p>ໝົດກຳນົດຮັບລາງວັນ: {{ expireDate }}</p>
    <qrcode-vue :value="qr_code"> </qrcode-vue>
    <p>{{ qr_code }}</p>
    <p>ຂໍໃຫ້ທ່ານໂຊກດີ</p>
  </div>
  <section id="main">
    <div class="salelist">
      <form class="form-group row">
        <label
          for=""
          class="col-sm-12 col-form-label"
          :class="{ total: get_ism_class }"
          >ເລກບິນ: {{ bill_num }} | ງວດທີ: {{ get_ism_ref }} | ອອກວັນທີ:
          {{ get_ism_date }}</label
        >
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
          <button class="btn btn-warning fixedbutton-r" @click="submitLek">
            <i class="fas fa-print"></i>{{ getBillLabel }}
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
          <button
            class="btn btn-danger fixedbutton-r"
            @click="gen_full_lek(enteredLek)"
          >
            ເຕັມນາມ
          </button>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <span class="col-sm-12 total"
              >ຍອດລວມ: {{ caltotal }} ກີບ | ເວລາປະຈຸບັນ: {{ curtime }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
      <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
      <p v-else-if="!isloading && (!emp || emp.length === 0)">No data...!</p>
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
  </section>
  <base-dialog :show="exp.length > 0" title="ຂໍ້ມູນ" @close="exp = []">
    <li v-for="itm in exp" :key="itm">
      {{ itm }}
    </li>
  </base-dialog>
</template>
<script>
import axios from "../axiosConfig";
import SaleCard from "../components/SaleCard.vue";
// import SimModal from "./ui/SimpleModal";
import BaseDialog from "../components/ui/BaseDialog";
import QrcodeVue from "qrcode.vue";

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
      qr_code: "",
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
    getBillLabel() {
      return this.bill_num === "1####" ? "ສົ່ງບິນ" : "ພິມບິນ";
    },
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
    gen_full_lek(val) {
      if (this.bill_num !== "1####")
        return alert("ກະລຸນາເລີ່ມບິນໃຫມ່ (ບິນນີ້ຂາຍໄປແລ້ວ)");
      if (!this.enteredLek || !this.enteredAmount) {
        alert("ເລກສ່ຽງ ແລະ ຈຳນວນເງິນຕ້ອງ ລະບຸໃຫ້ຄົບຖ້ວນ");
      } else {
        const over = parseInt(val.substring(val.length, val.length - 2)) > 19; //check if number is less than 20
        console.log("Val:" + val + " " + over);
        const ipair = over ? 2 : 3;
        console.log("len:" + val.length);
        if (val.length > 2) {
          // THREE DIGITS
          console.log("True");
          console.log(val.substring(val.length, val.length - 2));
          if (parseInt(val.substring(val.length, val.length - 2)) > 39)
            return alert("ເລກສ່ຽງຄວນເລີ່ມຈາກ X00 -> X39");
          else {
            for (let i = 0; i < ipair; i++) {
              console.log("Valoop:" + val);
              i === 0
                ? val
                : (val =
                    val.substring(0, val.length - 2) +
                    String(
                      parseInt(val.substring(val.length, val.length - 2)) + 40
                    ));
              const enteredSale = {
                lek: val,
                // lek: parseInt(this.enteredLek),
                sale: parseInt(this.enteredAmount),
                date: this.formatdateToSql(Date.now()),
              };
              this.saleLek.push(enteredSale);
            }
          }
          return;
        }
        if (parseInt(val) > 39) return alert("ເລກສ່ຽງຄວນເລີ່ມຈາກ 00 -> 39");
        for (let i = 0; i < ipair; i++) {
          console.log("Valoop:" + val);
          i === 0 ? val : (val = String(parseInt(val) + 40));
          const enteredSale = {
            lek: val,
            // lek: parseInt(this.enteredLek),
            sale: parseInt(this.enteredAmount),
            date: this.formatdateToSql(Date.now()),
          };
          this.saleLek.push(enteredSale);
        }
      }
    },
    qr_provider() {
      this.qr_code = Math.floor(Math.random() * 10000000000000 + 1).toString();
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
    formatdateToSql(date) {
      var dt = new Date(date);
      var m = "" + (dt.getMonth() + 1);
      var d = "" + dt.getDate();
      if (m.length < 2) {
        m = "0" + m;
      }
      if (d.length < 2) {
        d = "0" + d;
      }
      // dateVisible = d + "-" + m + "-" + dateVisible.getFullYear();
      var dateVisible =
        dt.getFullYear() +
        "-" +
        m +
        "-" +
        d +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds();
      console.log("This date: " + dateVisible);
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
      } else if (this.bill_num !== "1####") {
        alert("ກະລຸນາເລີ່ມບິນໃຫມ່ (ບິນນີ້ຂາຍໄປແລ້ວ)");
      } else {
        console.log("Sale");
        const enteredSale = {
          lek: this.enteredLek,
          // lek: parseInt(this.enteredLek),
          sale: parseInt(this.enteredAmount),
          date: this.formatdateToSql(Date.now()),
        };

        this.saleLek.push(enteredSale);
        this.enteredLek = "";
        this.enteredAmount = "";
        this.swtichLekandAmount("l");
      }
    },
    removeLek(val) {
      const conf = confirm("ຕ້ອງການລົບ ?");
      if (conf) this.saleLek.splice(val, 1);
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
        // alert("ບິນນີ້ຂາຍໄປແລ້ວ!");
        window.print();
        return;
      }
      this.isloading = true;
      this.error = null;
      axios
        .post( "sale", {
          item: this.saleLek,
          ism: this.get_ism_ref,
          user: this.get_user,
          qr_code: this.qr_code,
        })
        .then((res) => {
          this.isloading = false;
          if (res.data[0].bill_num) {
            console.log(res.data[0].bill_num);
            this.bill_num = res.data[0].bill_num;
            // window.print();
          }
          this.exp = res.data;
        })
        .catch((er) => {
          alert(er);
          this.isloading = false;
          this.error = "ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່";
          return;
        });
    },
    submitLekTest() {
      console.log("get in....");
      axios.post("create", {
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
      fetch("employees")
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
  /* position: fixed; */
  width: 90px;
  max-width: 60px;
}
.fixedbutton-r {
  /* position: fixed; */
  width: 85px;
  max-width: 85px;
  /* text-align:right ; */
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
  padding: 0.2rem;
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
  margin: 2px 2px;
}
.error {
  border: 1px solid red;
  color: red;
}

.total {
  font-weight: bold;
  color: red;
}
.lek {
  font-size: larger;
}
#printOnly {
  display: none;
  /* font-family: Saysettha OT; */
  width: 70mm;
  text-align: center;
  font-weight: 10;
}
/* font-family: Saysettha OT; */
/* width: 70mm; */
#printOnly thead tr th {
  font-weight: 10;
  /* font-size: small; */
  /* font-size: 10px; */
}
#printOnlyP {
  font-weight: 50;
}
#printOnly p {
  font-weight: 50;
}

@page {
  size: A7;
}
/* @page {
  size: A7;
} */

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

