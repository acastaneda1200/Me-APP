<template>
  <q-dialog
    v-model="addDialogPerfume"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="text-white">
      <q-bar style="height: 50px" class="bg-primary">
        <div class="text-h6">Agregar perfume</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section> </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row flex-center">
            <q-card class="card-form">
              <div class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <div class="col-12">
                    <q-input
                      outlined
                      v-model="form.name"
                      label="Nombre"
                      :rules="[(val) => !!val || 'Nombre es requerido']"
                    />
                  </div>
                  <div class="col-12">
                    <q-file
                      color="primary"
                      filled
                      accept="image/*"
                      v-model="image"
                      label="Imagen"
                      :rules="[(val) => !!val.size || 'Imagen es requerido']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                      </template>
                    </q-file>
                  </div>
                </div>
              </div>
              <q-toolbar class="bg-primary text-white shadow-2">
                <q-toolbar-title>Caracteristicas</q-toolbar-title>
              </q-toolbar>
              <div class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <div class="col-12 col-md-6">
                    <!-- Dia -->
                    <q-input
                      outlined
                      v-model="form.day"
                      mask="###"
                      label="Dia"
                      :rules="[
                        (val) => !!val || 'Dia es requerido',
                        (val) => val <= 100 || 'Maximo 100',
                      ]"
                    />
                    <q-slider
                      class="q-px-sm"
                      v-model="form.day"
                      :min="0"
                      :max="100"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Noche -->
                    <q-input
                      outlined
                      v-model="form.night"
                      type="number"
                      label="Noche"
                      :rules="[
                        (val) => !!val || 'Noche es requerido',
                        (val) => val <= 100 || 'Maximo 100',
                      ]"
                    />
                    <q-slider
                      class="q-px-sm"
                      v-model="form.night"
                      :min="0"
                      :max="100"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Invierno -->
                    <q-input
                      outlined
                      v-model="form.winter"
                      mask="###"
                      label="Invierno"
                      :rules="[
                        (val) => !!val || 'Invierno es requerido',
                        (val) => val <= 100 || 'Maximo 100',
                      ]"
                    />
                    <q-slider
                      class="q-px-sm"
                      v-model="form.winter"
                      :min="0"
                      :max="100"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Primevera -->
                    <q-input
                      outlined
                      v-model="form.spring"
                      mask="###"
                      label="Primavera"
                      :rules="[
                        (val) => !!val || 'Primavera es requerido',
                        (val) => val <= 100 || 'Maximo 100',
                      ]"
                    />
                    <q-slider
                      class="q-px-sm"
                      v-model="form.spring"
                      :min="0"
                      :max="100"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Verano -->
                    <q-input
                      outlined
                      v-model="form.summer"
                      mask="###"
                      label="Verano"
                      :rules="[
                        (val) => !!val || 'Verano es requerido',
                        (val) => val <= 100 || 'Maximo 100',
                      ]"
                    />
                    <q-slider
                      class="q-px-sm"
                      v-model="form.summer"
                      :min="0"
                      :max="100"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Otoño -->
                    <q-input
                      outlined
                      v-model="form.autumn"
                      mask="###"
                      label="Otoño"
                      :rules="[
                        (val) => !!val || 'Otoño es requerido',
                        (val) => val <= 100 || 'Maximo 100',
                      ]"
                    />
                    <q-slider
                      class="q-px-sm"
                      v-model="form.autumn"
                      :min="0"
                      :max="100"
                    />
                  </div>
                </div>
              </div>
              <q-card-actions>
                <q-btn
                  :loading="loading"
                  label="Registrar"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  label="Reiniciar"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </q-card-actions>
            </q-card>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import useUI from "composables/useUI";
import useApiSp from "src/composables/useApiSP";
import useNotify from "src/composables/useNotify";
import { ref } from "vue";
import { useRouter } from "vue-router";
const { addDialogPerfume, handleAddDialogPerfume } = useUI();
const loading = ref(false);
const router = useRouter();
const emit = defineEmits(["uploadListPerfume"]);

const initialFormValues = {
  name: null,
  day: 0,
  night: 0,
  winter: 0,
  spring: 0,
  summer: 0,
  autumn: 0,
  img_path: null,
  img_dupe_path: null,
  dupe: null,
};

const form = ref({ ...initialFormValues });
const image = ref([]);
const { uploadImage, insertRow } = useApiSp();
const { notify } = useNotify();

const onSubmit = async () => {
  try {
    loading.value = true;
    handleUploadImage();
    const [{ id }] = await insertRow(form.value, "perfume");
    console.log(id);
    notify({ message: "Registrado correctamente", type: "positive" });
    onReset();
    handleAddDialogPerfume();
    emit("uploadListPerfume");
  } catch (error) {
    notify({ message: error.message, type: "negative" });
  } finally {
    loading.value = false;
  }
};

const handleUploadImage = async () => {
  const imgFile = image.value;
  const { publicUrl } = await uploadImage(imgFile, "perfume_bucket");
  form.value.img_path = publicUrl;
  console.log(publicUrl);
  console.log(form.value);
};

const onReset = () => {
  loading.value = null;
  Object.assign(form.value, { ...initialFormValues });
  image.value = [];
};
</script>

<style lang="scss" scoped>
.card-form {
  width: 100%;
  max-width: 600px;
}
</style>