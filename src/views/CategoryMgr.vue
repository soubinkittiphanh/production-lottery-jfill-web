<template>
  <div class="container card">
    <!-- <button class="btn btn-primary" @click="gen_ism_ref">ໃສ່ເລກງວດ</button> -->
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label">ງວດທີ:</label>
        <div class="col-md-12">
          <input
            disabled
            type="text"
            class="form-control"
            v-model="ism_ref"
            :style="!formvalidate.ref ? errorclass : ''"
          />
          <span v-if="!formvalidate.ref" class="error"
            >ກະລຸນາໃສ່ເລກທີງວດ !!</span
          >
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ອອກວັນທີ:
          <span class="succeed">
            {{ dateVisible }}
          </span>
        </label>
        <div class="col-md-12">
          <input
            type="date"
            class="form-control"
            v-model="date"
            format="dd-mm-yyyy"
            :style="!formvalidate.date ? errorclass : ''"
          />
          <span v-if="!formvalidate.date" class="error"
            >ວັນທີບໍ່ຖືກຕ້ອງ !!</span
          >
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ຜົນອອກລາງວັນ:</label
        >
        <div class="col-md-12">
          <input
            type="number"
            class="form-control"
            placeholder="ເລກຜົນອອກຕ້ອງໃສ່ 6 ຕົວ"
            v-model="ism_res"
          />
        </div>
        <div class="col-md-12 custom-control custom-switch">
          <input
            v-model="isopen"
            type="checkbox"
            class="custom-control-input"
            id="customSwitch1"
            @click="triggleSwitch"
          />
          <label
            class="custom-control-label"
            for="customSwitch1"
            style="float: right"
            >ປິດ-ເປິດ</label
          >
        </div>
        <div class="col-md-12">
          <button class="btn btn-success mr-2" @click.prevent="saveism(issave)">
            {{ issave ? "ບັນທຶກ" : "ເພີ່ມງວດ" }}
          </button>
          <button class="btn btn-danger" v-if="issave" @click="toggleSave">
            ຍົກເລີກ
          </button>
        </div>
      </div>
    </form>
    <hr />
    <button @click="fetchdata" class="btn btn-warning">ດຶງຂໍ້ມູນ</button>
    <hr>
    <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isLoading"></i>
    <p v-else-if="!isLoading && error" style="color: red">{{ error }}</p>
    <p v-else-if="ismdata.length<1" >ຍັງບໍ່ມີງວດ</p>
    <base-card v-for="(itm, idx) in ismdata" :key="idx">
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
    </base-card>
    <div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>