<template>
  <div>
    <base-card>
      <form @submit.prevent="logIn">
        <div class="form-group row">
          <label for="roll_id" class="col-md-4 col-form-label">ໄອດີ</label>
          <div class="col-md-12">
            <input type="text" class="form-control" v-model.trim="user.id" />
          </div>
          <label for="roll_id" class="col-md-4 col-form-label">ລະຫັດຜ່ານ</label>
          <div class="col-md-12">
            <input
              type="password"
              class="form-control"
              v-model.trim="user.pass"
            />
          </div>
          <p v-if="invalidForm">ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ</p>
        </div>
        <button class="btn btn-success">ເຂົ້າສູ່ລະບົບ</button>
        <div class="col-md-12">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw" v-if="isLoading"></i>
          <p v-else-if="!isLoading && error" style="color: red">{{ error }}</p>
        </div>
      </form>
    </base-card>
    <div class="center"></div>
  </div>
</template>
<script>
import BaseCard from "../components/ui/BaseCard";
export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      user: {
        id: "",
        pass: "",
      },
      invalidForm: false,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    addNumber() {
      this.$store.dispatch("increaseNum");
    },
    async logIn() {
      this.invalidForm = false;
      this.isLoading = true;
      this.error = null;
      try {
        if (!this.user.id || !this.user.pass) {
          this.invalidForm = true;
          // return;
        } else {
          await this.$store.dispatch("login", {
            id: this.user.id,
            pass: this.user.pass,
          });
          if (this.isAuthenticated) {
            this.$router.replace("/home");
            location.reload();
          }
        }
      } catch (err) {
        this.error = err.message || "ບໍ່ສາມາດເຂົ້າສູ່ລະບົບໄດ້ ກະລຸນາລອງໃຫມ່!!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>