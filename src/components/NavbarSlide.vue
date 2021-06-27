<template>
  <div class="navbar navbar-dark justify-content-between flex-nowrap flex-row">
    <div class="col-md-12">
      <button class="btn" @click="togglenavbar">
        <span class="material-icons">horizontal_split</span>
      </button>
    </div>
  </div>
  <!-- Router -->
  <div class="container" @click="shownav = false">
    <router-view></router-view>
  </div>
  <!-- :class="navClassObject" -->
  <div class="navbar_" :class="navClassObject">
    <router-link to="/lotterymgr" class="navbar__link"  v-if="isAdmin">
      <span class="material-icons">home</span>ເປີດງວດ</router-link
    >
    <router-link to="/category" class="navbar__link"  v-if="isAdmin">
      <span class="material-icons">language</span>ຈັດການປະເພດເລກ</router-link
    >

    <router-link to="/salelimit" class="navbar__link" v-if="isAdmin">
      <span class="material-icons">lock_open</span>ກຳນົດເລກເຕັມຮູ</router-link
    >

    <router-link to="/prizemgr" class="navbar__link"  v-if="isAdmin">
      <span class="material-icons">emoji_events</span
      >ອັດຕາຈ່າຍລາງວັນ</router-link
    >

    <router-link to="/sale" class="navbar__link">
      <span class="material-icons">point_of_sale</span>ຂາຍ</router-link
    >

    <router-link to="/salereport" class="navbar__link">
      <span class="material-icons">receipt</span>ຍອດຂາຍ</router-link
    >
    <router-link to="/winreport" class="navbar__link" >
      <span class="material-icons">receipt</span>ລາຍງານຖືກລາງວັນ</router-link
    >

    <router-link to="/memberlist" class="navbar__link"  v-if="isAdmin">
      <span class="material-icons">group</span>ສະມາຊິກ</router-link
    >
    <router-link to="/member" class="navbar__link"  v-if="isAdmin">
      <span class="material-icons">person_add</span>ເພີ່ມຜູ້ໃຊ້</router-link
    >
    <router-link to="/logout" class="navbar__link">
      <span class="material-icons">exit_to_app</span>ອອກຈາກລະບົບ</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      shownav: false,
    };
  },
  computed: {
    navClassObject() {
      return {
        navbar__open: this.shownav,
      };
    },
    isAdmin() {
      console.log("Admin:" + this.$store.getters.isAdmin);
      return this.$store.getters.isAdmin==='true'?true:false;
    },
  },
  methods: {
    togglenavbar() {
      this.shownav = !this.shownav;
    },
  },
};
</script>

<style scoped>
.navbar_ {
  position: fixed;
  top: 0;
  left: -200px;
  width: 200px;
  height: 100%;
  background: #009879;
  border-right: 2px solid #008c71;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: left 0.25s ease-in-out, opacity 0.25s ease-in-out;
}
.navbar__open {
  left: 0;
  opacity: 1;
}
.navbar__link {
  display: flex;
  align-items: center;
  background: #008c71;
  color: #ffffffff;
  padding: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.85rem;
  border-bottom: 1px solid #009879;
}
.navbar__link .material-icons {
  margin-right: 12px;
}
.navbar__link:active {
  background: #007d65;
}
</style>