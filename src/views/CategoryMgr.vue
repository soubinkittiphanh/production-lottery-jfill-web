<template>
  <div class="container card">
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label"
          >ໂຕຫຍໍ້ ຂອງປະເທດ:
        </label>
        <div class="col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="LA / TH / VN ..."
          />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label">ຊື່ປະເທດ:</label>
        <div class="col-md-12">
          <input type="number" class="form-control" placeholder="ຊື່ປະເທດ" />
          <label for=""></label>
        </div>
        <div class="col-md-12">
          <button class="btn btn-success mr-2">ບັນທຶກ</button>
          <button class="btn btn-danger">ຍົກເລີກ</button>
        </div>
      </div>
    </form>
    <hr />
    <div>
      <ul></ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isloading: false,
      data: [],
    };
  },
};
</script>