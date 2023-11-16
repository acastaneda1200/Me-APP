<template>
  <q-page padding>
    <div class="row flex-center q-gutter-sm">
      <dialog-add
        @uploadListPerfume="emitFromDialogUpdateListPerfume"
      ></dialog-add>
      <card-perfume v-for="item in data" :key="item" :data="item">
      </card-perfume>
    </div>
  </q-page>
</template>

<script setup>
import CardPerfume from "components/perfumes/CardPerfume.vue";
import DialogAdd from "components/perfumes/DialogAdd.vue";
import { ref, onMounted } from "vue";
import useApiSp from "src/composables/useApiSP";
import useNotify from "src/composables/useNotify";

const data = ref([]);
const { notify } = useNotify();

const handleListPerfume = async () => {
  try {
    const { getPerfume } = useApiSp();
    const listPerfume = await getPerfume();
    data.value = [...listPerfume];
  } catch (error) {
    notify({ message: error.mssage, type: "negative" });
  } finally {
  }
};

const emitFromDialogUpdateListPerfume = () => {
  handleListPerfume();
};
onMounted(() => {
  handleListPerfume();
});
</script>

<style>
</style>