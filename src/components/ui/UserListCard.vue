<template>
  <div class="card">
      <!-- <header> -->
        <slot name="username"></slot>
        <div class="row">
          <div class="col-md-6">
            <slot name="total"></slot>
          </div>
          <div class="col-md-6">
            <slot name="status"></slot>
          </div>
        </div>
      <!-- </header> -->
      <hr>
        <slot name="details"></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 0.5rem auto;
  max-width: 40rem;
}
</style>