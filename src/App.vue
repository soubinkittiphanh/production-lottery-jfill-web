<template>
  <nav-slide></nav-slide>
</template>

<script>
import NavSlide from './components/NavbarSlide';
export default {
  components:{
    NavSlide,

  },
  created(){
    this.$store.dispatch('autoLogin');
  }
};
</script>
  
<style>
* {
  font-family: BoonHome;
}
</style>
