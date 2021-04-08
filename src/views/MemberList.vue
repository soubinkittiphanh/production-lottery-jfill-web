<template>
  <div class="container">
    <div class="center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isloading"></i>
    <p v-else-if="!isloading && error" style="color: red">{{ error }}</p>
    </div>
    <user-list-card v-for="item in users" :key="item.id">
      <template v-slot:username>
        {{ item.name }} {{ item.lname }} [ ສະຖານະ:
        {{ item.active === 1 ? "ໃຊ້ງານຢູ່" : "Block" }} ]
        <span>
          <switch-toggle
            :is-open="item.active === 1 ? true : false"
            :name="'customSwitch' + item.id" :total="String(formatNum(users.total))"
          >
          </switch-toggle>
        </span>
      </template>
      <template #details>
        <p>ບ້ານ: {{ item.vill }} {{ item.dist }} {{ item.pro }}</p>
        <button class="btn btn-warning" @click="edituser(item.id)">
          ແກ້ໄຂ
        </button>
      </template>
    </user-list-card>
    
  </div>
</template>
<script>
import axios from "axios";
import apiDomain from "../config";
import UserListCard from "../components/ui/UserListCard";
import SwitchToggle from "../components/ui/SwitchToggle";
export default {
  components: {
    UserListCard,
    SwitchToggle,
  },
  data() {
    return {
      isloading: true,
      error: null,
      users: [],
    };
  },
  methods: {
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
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
              total: res.data[id].total==="null"?0:res.data[id].total,
            });
          }
          this.users = results;
          this.isloading = false;
        })
        .catch((er) => {
          this.isloading = false;
          this.error = er;
          // alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
        });
    },
    edituser(id) {
      this.$router.push("/member/" + id);
    },
  },
  created() {
    this.fetchuser();
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 60%;
  /* border: 3px solid #73AD21; */
  padding: 10px;
}
</style>