<template>
  <q-page padding>
    <h3>Wish List</h3>
    <div class="row q-gutter-md">
       <q-list bordered separator class="full-width">
        <q-item v-for="item in items" :key="item.id">
          <q-item-section avatar>
            <q-avatar rounded>
              <img :src="item.imageUrl || 'https://via.placeholder.com/150'">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ item.description }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ item.estimatedPrice }}</q-item-label>
            <q-chip :color="getMethodColor(item.priority)" text-color="white" size="sm">
                {{ item.priority }}
            </q-chip>
          </q-item-section>
        </q-item>
       </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useItemsStore } from 'stores/items';

const itemsStore = useItemsStore();
const items = computed(() => itemsStore.items); // Show all items for now, or filter by status WANTED

onMounted(() => {
  itemsStore.fetchItems();
});

const getMethodColor = (priority) => {
    switch(priority) {
        case 'HIGH': return 'red';
        case 'MEDIUM': return 'orange';
        case 'LOW': return 'green';
        default: return 'grey';
    }
}
</script>

<style>
</style>