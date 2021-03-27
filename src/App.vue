<template>
  <div class="alert alert-danger" v-if="warninZone && get_auth">
    <span
      >ທ່ານຍັງໃຊ້ລະບົບຢູ່ບໍ່ ? ລະບົບກຳລັງ Logout ອັດຕະໂນມັດ ພາຍໃນ 5 ນາທີ</span
    >
  </div>
  <nav-slide></nav-slide>
</template>

<script>
import NavSlide from "./components/NavbarSlide";
export default {
  components: {
    NavSlide,
  },
  computed:{
    get_auth(){
      return this.$store.getters.isAuth;
    }
  },
  data() {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      warningTimer: null,
      logoutTimer: null,
      warninZone: false,
    };
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
  },
  unmounted() {
    this.events.forEach(function (event) {
      window.removeEventListener(event, this.resetTimer);
    }, this);
    this.resetTimer();
  },
  methods: {
    setTimers() {
      this.warningTimer = setTimeout(this.warningMessage, 10 * 60 * 1000); // 14 minutes - 14 * 60 * 1000
      this.logoutTimer = setTimeout(this.logoutUser, 15 * 60 * 1000); // 14 minutes - 14 * 60 * 1000
      this.warninZone = false;
    },
    warningMessage() {
      // alert('warning');
      this.warninZone = true;
    },
    logoutUser() {
      // alert('warning');
      // this.warninZone=true;
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
    resetTimer() {
      clearTimeout(this.warningTimer);
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
};
</script>
  
<style>
* {
  font-family: BoonHome;
}
</style>
