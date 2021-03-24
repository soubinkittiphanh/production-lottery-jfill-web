<template>
  <li>
    ເລກສ່ຽງ: [{{ luckNum }}] = {{ formatNum(price) }} ກີບ
    <button class="btn btn-danger btn-sm" @click="deletelucknum">
      <i class="fas fa-trash-alt"></i>
    </button>
  </li>
</template>
<script>
export default {

  props: {
    id: {
      type: Number,
      required: true,
    },
    luckNum: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validator: function (val) {
        return val > 0;
      },
    },
  },
  methods: {
    deletelucknum() {
      this.$emit("delete-lucknum", this.id);
    },
    formatNum(val) {
      return new Intl.NumberFormat().format(val);
    },
  },
};
</script>