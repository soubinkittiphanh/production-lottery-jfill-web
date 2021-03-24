<template>
    <div>
        
    </div>
</template>

<script>
export default {
    created(){
      var con =  confirm("ຕ້ອງການອອກຈາກລະບົບ ?")
      if(con){
          this.$store.dispatch("logout");
          this.$router.replace('/');
      }else{
          this.$router.go(-1);
      }
    }
}
</script>