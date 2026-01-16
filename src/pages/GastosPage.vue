<template>
  <q-page padding>
    <h3>Gastos</h3>
    <div class="row q-gutter-md">
       <q-list bordered separator class="full-width">
        <q-item v-for="expense in expenses" :key="expense.id">
          <q-item-section>
            <q-item-label>{{ expense.description }}</q-item-label>
            <q-item-label caption>{{ new Date(expense.date).toLocaleDateString() }} - {{ expense.category }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-weight-bold">{{ expense.amount }}</q-item-label>
          </q-item-section>
        </q-item>
       </q-list>
       
       <div v-if="expenses.length === 0 && !loading">No hay gastos registrados.</div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useExpensesStore } from 'stores/expenses';

const expensesStore = useExpensesStore();
const expenses = computed(() => expensesStore.expenses);
const loading = computed(() => expensesStore.loading);

onMounted(() => {
  expensesStore.fetchExpenses();
});
</script>

<style>
</style>