<template>
  <div class="col-md-12 custom-control custom-switch">
    <label for="name" class="alert-success">[ ຍອດຂາຍງວດລ່າສຸດ: {{total}} ]</label>
    <input
      type="checkbox"
      class="custom-control-input"
      id="name"
      v-model="open"
      disabled
      
    />
    <label class="custom-control-label" for="name" style="float: right"
      >ປິດ-ເປິດ</label
    >
  </div>
</template>

<script>
export default {
    // props:['idSw','forSw','isOpen'],
    props:{
        idSw:{
            type:String,
        },
        forSw:{
            type:String,
        },
        isOpen:{
            type:Boolean,
        },
        name:{
          type:String,
          required:true,
        },total:{
          type:String,
          required:false,
          default:'0',
        }
    },
    data(){
        return{
            // name:'abc'+this.idSw,
            open:this.isOpen,
        }
    },created(){
      console.log(this.isOpen);
      console.log(this.name);
    }
};
</script>