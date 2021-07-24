<template>
  <div class="container">
    <member-pagination :datas="users" @update-user="edituser">
    </member-pagination>
  </div>
</template>
<script>
import MemberPagination from "../components/PaginationControl";
export default {
  components: {

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