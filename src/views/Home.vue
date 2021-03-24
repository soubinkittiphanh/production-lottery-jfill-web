<template>
  <div class="card">
    <form>
      <div class="form-group row">
        <label for="roll_id" class="col-md-4 col-form-label"
          >ໄອດີ:</label
        >
        <div class="col-md-12">
          <input type="number" class="form-control" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"
          >ລະຫັດຜ່ານ:</label
        >
        <div class="col-md-12">
          <input type="text" class="form-control" />
        </div>
        <label for="roll_id" class="col-md-4 col-form-label"></label>
        <div class="col-md-12">
            <button class="btn btn-success">ເຂົ້າສູ່ລະບົບ</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 40rem;
}
</style>