<template>
    <div class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="col-md-8"></div>
      <div class="col-md-4">
        <!-- <h1 v-if="isNav">Hello</h1> -->
        <button class="btn btn-success btn-lg btn-block" style="float: right">
          ເປີດ-ປິດ ເມນູ
        </button>
        <!-- <button class="btn btn-warning btn-lg" @click="togglenavbar">Show hide</button> -->
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isNav:true,
    }
  },
  methods: {
    togglenavbar(){
      this.isNav=!this.isNav;
    }
  },
}
</script>