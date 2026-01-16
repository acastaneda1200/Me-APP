<template>
  <q-page padding>
    <div class="row flex-center q-gutter-sm">
      <dialog-add
        @uploadListPerfume="emitFromDialogUpdateListPerfume"
      ></dialog-add>
      <card-perfume v-for="item in data" :key="item.id" :data="item">
      </card-perfume>
    </div>
  </q-page>
</template>

<script setup>
import CardPerfume from "components/perfumes/CardPerfume.vue";
import DialogAdd from "components/perfumes/DialogAdd.vue";
import { ref, onMounted, computed } from "vue";
import { useItemsStore } from "stores/items";
import useNotify from "src/composables/useNotify";

// const data = ref([]); // We can use computed from store or local state synced
const itemsStore = useItemsStore();
const { notify } = useNotify();

const data = computed(() => {
    return itemsStore.perfumes.map(item => {
        let stats = {};
        try {
            stats = item.notes ? JSON.parse(item.notes) : {};
        } catch (e) {
            // If notes is not JSON, ignore properties
        }
        return {
            ...item,
            ...stats,
            img_path: item.imageUrl, // Map entity field to component prop
            // backend doesn't support 'dupe' yet unless in notes.
            // keeping it simple for now.
        };
    });
});

const handleListPerfume = async () => {
  try {
    await itemsStore.fetchItems({ category: 'PERFUME' });
  } catch (error) {
    notify({ message: error.message, type: "negative" });
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