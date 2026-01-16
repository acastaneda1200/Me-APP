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
                      :rules="[(val) => !!val || 'Imagen es requerido']"
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
                      v-model.number="form.day"
                      type="number"
                      label="Dia"
                      :rules="[
                        (val) => val >= 0 || 'Requerido',
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
                      v-model.number="form.night"
                      type="number"
                      label="Noche"
                      :rules="[
                        (val) => val >= 0 || 'Requerido',
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
                      v-model.number="form.winter"
                      type="number"
                      label="Invierno"
                      :rules="[
                        (val) => val >= 0 || 'Requerido',
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
                      v-model.number="form.spring"
                      type="number"
                      label="Primavera"
                      :rules="[
                        (val) => val >= 0 || 'Requerido',
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
                      v-model.number="form.summer"
                      type="number"
                      label="Verano"
                      :rules="[
                        (val) => val >= 0 || 'Requerido',
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
                      v-model.number="form.autumn"
                      type="number"
                      label="Otoño"
                      :rules="[
                        (val) => val >= 0 || 'Requerido',
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
                  @click="onReset"
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
import useUploads from "src/composables/useUploads";
import useNotify from "src/composables/useNotify";
import { useItemsStore } from "stores/items";
import { ref } from "vue";

const { addDialogPerfume, handleAddDialogPerfume } = useUI();
const loading = ref(false);
const emit = defineEmits(["uploadListPerfume"]);

const initialFormValues = {
  name: null,
  day: 0,
  night: 0,
  winter: 0,
  spring: 0,
  summer: 0,
  autumn: 0,
};

const form = ref({ ...initialFormValues });
const image = ref(null);
const { uploadFile } = useUploads();
const { notify } = useNotify();
const itemsStore = useItemsStore();

const onSubmit = async () => {
  try {
    loading.value = true;
    let imageUrl = null;
    
    if (image.value) {
        const uploadResult = await uploadFile(image.value);
        // Assuming backend returns { url: '...' } or just the url string, or object with key.
        // Adjust based on actual backend response.
        imageUrl = uploadResult.url || uploadResult.location || uploadResult; 
    }

    const perfumeStats = {
        day: form.value.day,
        night: form.value.night,
        winter: form.value.winter,
        spring: form.value.spring,
        summer: form.value.summer,
        autumn: form.value.autumn
    };

    const itemData = {
        name: form.value.name,
        category: 'PERFUME',
        priority: 'MEDIUM',
        status: 'WANTED', // Or OTHER?
        estimatedPrice: 0,
        imageUrl: imageUrl,
        notes: JSON.stringify(perfumeStats)
    };

    await itemsStore.createItem(itemData);
    
    notify({ message: "Registrado correctamente", type: "positive" });
    onReset();
    handleAddDialogPerfume();
    emit("uploadListPerfume");
  } catch (error) {
    notify({ message: error.message || 'Error creating item', type: "negative" });
  } finally {
    loading.value = false;
  }
};

const onReset = () => {
  Object.assign(form.value, initialFormValues);
  image.value = null;
};
</script>

<style lang="scss" scoped>
.card-form {
  width: 100%;
  max-width: 600px;
}
</style>