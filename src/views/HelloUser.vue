<template>
  <div>
    <div class="alert alert-success">ຍິນດີຕ້ອນຮັບ ທ່ານ {{get_uname}} ເຂົ້າສູ່່ລະບົບ</div>
    
  </div>
</template>
<script>
export default {
  
  computed:{
    get_uname(){
      return this.$store.getters.user_name;
    }
  },
  
};
</script>