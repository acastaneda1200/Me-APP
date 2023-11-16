<template>
  <q-page padding class="flex flex-center align-center">
    <div>
      <p class="text-h5 text-center">Login</p>
      <q-card class="my-card q-pa-md">
        <q-form @submit.prevent="handleLogin">
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="form.email"
                label="Email"
                :rules="[
                  (val) => (val && val.length > 0) || 'Email requerido',
                  (val) => validateEmail(val) || 'Email no valido',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.password"
                type="password"
                label="Password"
                :rules="[
                  (val) => (val && val.length > 0) || 'Password requerido',
                ]"
              />
            </div>

            <div class="col-12 q-pt-sm">
              <q-btn
                rounded
                outline
                :loading="loading"
                label="Login"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
            <div class="col-12 q-pt-sm">
              <q-btn
                flat
                rounded
                label="Register"
                color="primary"
                class="full-width"
                to="/register"
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "src/composables/useAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useValidator from "src/composables/useValidator";

const loading = ref(false);
const form = ref({
  email: null,
  password: null,
});
const router = useRouter();
const { validateEmail } = useValidator();
const { login } = useAuthUser();
const $q = useQuasar();

const handleLogin = async () => {
  try {
    loading.value = true;
    await login(form.value);
    router.push({ name: "index" });
  } catch (error) {
    $q.notify({
      message: error.message,
      type: "negative",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
}
</style>