<template>
  <q-page padding>
    <div class="row q-gutter-md flex-center">
      <h4 v-if="loading">Cargando...</h4>
      <div v-else-if="items.length === 0">No hay zapatillas registradas</div>
      
      <q-card v-for="item in items" :key="item.id" class="my-card">
        <q-img :src="item.imageUrl || 'https://via.placeholder.com/300'" style="height: 200px" />
        <q-card-section>
          <div class="text-h6">{{ item.name }}</div>
          <div class="text-subtitle2">{{ item.estimatedPrice }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ item.description }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useItemsStore } from 'stores/items';

const itemsStore = useItemsStore();
const items = computed(() => itemsStore.shoes);
const loading = computed(() => itemsStore.loading);

onMounted(() => {
  itemsStore.fetchItems({ category: 'SHOES' });
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>