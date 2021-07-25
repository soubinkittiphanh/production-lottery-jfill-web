<template>
  <div class="container">

    
    <!-- <user-list-card v-for="item in users" :key="item.id">
      <template #total>
        <label for="name" class="alert-success"
          >[ $ງວດລ່າສຸດ: {{ String(formatNum(item.total)) }} ]</label
        >
      </template>
      <template #status>
        <switch-toggle
          :is-open="item.active === 1 ? true : false"
          :name="'customSwitch' + item.id"
        >
        </switch-toggle>
      </template>
      <template v-slot:username>
        {{ item.name }} {{ item.lname }} [ ສະຖານະ:
        {{ item.active === 1 ? "ໃຊ້ງານຢູ່" : "Block" }} ]
      </template>
      <template #details>
        <p>ບ້ານ: {{ item.vill }} {{ item.dist }} {{ item.pro }}</p>
        <button class="btn btn-warning" @click="edituser(item.id)">
          ແກ້ໄຂ
        </button>
      </template>
    </user-list-card> -->
    <!-- <member-table> </member-table> -->
    <member-pagination :datas="users" @update-user="edituser">
    </member-pagination>
  </div>
</template>
<script>
// import axios from "axios";
// import apiDomain from "../config";
// import UserListCard from "../components/ui/UserListCard";
// import SwitchToggle from "../components/ui/SwitchToggle";
import MemberPagination from "../components/PaginationControl";
export default {
  components: {
    // UserListCard,
    // SwitchToggle,
    MemberPagination,
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
    async fetchuser() {
      // this.isloading = true;
      // this.error = null;
      // var res = await axios.get(apiDomain.url + "fetchuser");
      // var results = [];
      // for (const id in res.data) {
      //   results.push({
      //     id: res.data[id].id,
      //     name: res.data[id].mem_name,
      //     lname: res.data[id].mem_lname,
      //     logid: res.data[id].mem_id,
      //     logpass: res.data[id].mem_pass,
      //     vill: res.data[id].mem_village,
      //     dist: res.data[id].mem_dist,
      //     pro: res.data[id].mem_pro,
      //     active: res.data[id].active,
      //     admin: res.data[id].admin,
      //     total: res.data[id].total,
      //   });
      // }
      // this.users = results;
      // this.isloading = false;

      // .then((res) => {
      //   var results = [];
      //   for (const id in res.data) {
      //     results.push({
      //       id: res.data[id].id,
      //       name: res.data[id].mem_name,
      //       lname: res.data[id].mem_lname,
      //       logid: res.data[id].mem_id,
      //       logpass: res.data[id].mem_pass,
      //       vill: res.data[id].mem_village,
      //       dist: res.data[id].mem_dist,
      //       pro: res.data[id].mem_pro,
      //       active: res.data[id].active,
      //       admin: res.data[id].admin,
      //       total: res.data[id].total,
      //     });
      //   }
      //   this.users = results;
      //   this.isloading = false;
      // })
      // .catch((er) => {
      //   this.isloading = false;
      //   this.error = er;
      //   // alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
      // });
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