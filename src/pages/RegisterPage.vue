<template>
  <q-page padding class="flex flex-center align-center">
    <div>
      <p class="text-h5 text-center">Registrar</p>
      <q-card class="my-card q-pa-md">
        <q-form @submit.prevent="handleRegister">
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="form.name"
                label="Nombre"
                :rules="[
                  (val) => (val && val.length > 0) || 'Nombre requerido',
                ]"
              />
            </div>
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
                label="Registrar"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
            <div class="col-12 q-pt-sm">
              <q-btn
                flat
                rounded
                label="Login"
                color="primary"
                class="full-width"
                to="/login"
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
import useValidator from "src/composables/useValidator";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const { validateEmail } = useValidator();
const { register } = useAuthUser();
const $q = useQuasar();

const loading = ref(false);
const form = ref({
  name: null,
  email: null,
  password: null,
});

const handleRegister = async () => {
  try {
    loading.value = true;
    await register(form.value);
    router.push({
      name: "email-confirmation",
      query: { email: form.value.email },
    });
    $q.notify({
      message: "Usuario registrado correctamente",
      type: "positive",
    });
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