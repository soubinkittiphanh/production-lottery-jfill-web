<template>
  <div>
    <user-list-card v-for="item in users" :key="item.id">
      <template v-slot:username>
        {{ item.name }} {{ item.lname }} [ ສະຖານະ:
        {{ item.active === 1 ? "ໃຊ້ງານຢູ່" : "Block" }} ]
        <span>
        <switch-toggle
          :is-open="item.active === 1 ? true :false "
          :name="'customSwitch' + item.id"
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
import UserListCard from "../components/ui/UserListCard";
import SwitchToggle from '../components/ui/SwitchToggle'
export default {
  components: {
    UserListCard,
    SwitchToggle,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    fetchuser() {
      axios
        .get("http://192.168.42.49:3001/fetchuser")
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
            });
          }
          this.users = results;
        })
        .catch((er) => {
          alert("ເກີດຂໍ້ຜິດພາດການເຊື່ອມຕໍ່ເຊີເວີ: " + er);
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