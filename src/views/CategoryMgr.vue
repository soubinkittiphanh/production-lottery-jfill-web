<template>
  <div class="container card">
    <!-- <button class="btn btn-primary" @click="gen_ism_ref">ໃສ່ເລກງວດ</button> -->
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label">ໂຕຫຍໍ້ ຂອງປະເທດ: </label>
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="LA / TH / VN ..."
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ຊື່ປະເທດ:</label>
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            placeholder="ຊື່ປະເທດ"
          />
        <label for=""></label>
        </div>
        <div class="col-md-12">
          <button class="btn btn-success mr-2">
            ບັນທຶກ
          </button>
          <button class="btn btn-danger">
            ຍົກເລີກ
          </button>
        </div>
      </div>
    </form>
    <hr />
    <!-- <button @click="fetchdata" class="btn btn-warning">ດຶງຂໍ້ມູນ</button>
    <hr>
    <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isLoading"></i>
    <p v-else-if="!isLoading && error" style="color: red">{{ error }}</p>
    <p v-else-if="data.length<1" >ຍັງບໍ່ມີງວດ</p> -->
    <!-- <base-card v-for="(itm, idx) in ismdata" :key="idx">
      <span style="color: green"> [ ຜົນອອກ:{{ itm.ism_res }} ]</span>
      [ ເລກທີ: {{ itm.ism_ref }} ] [ ອອກວັນທີ: {{ formatdate(itm.ism_date) }} ]
      <switch-toggle
        :is-open="itm.ism_active === 1 ? true : false"
        :name="'customSwitch' + itm.ism_id"
      >
      </switch-toggle>
      <button class="btn btn-warning">
        ແກ້ໄຂ
      </button>
    </base-card> -->
    <div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isloading:false,
      data:[],
    }
  },
    
}
</script>