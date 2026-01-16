import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useExpensesStore = defineStore('expenses', {
    state: () => ({
        expenses: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchExpenses() {
            this.loading = true;
            try {
                const response = await api.get('/expenses');
                this.expenses = response.data;
            } catch (error) {
                this.error = error;
                console.error('Error fetching expenses:', error);
            } finally {
                this.loading = false;
            }
        },

        async createExpense(expenseData) {
            try {
                const response = await api.post('/expenses', expenseData);
                this.expenses.push(response.data);
                return response.data;
            } catch (error) {
                console.error('Error creating expense:', error);
                throw error;
            }
        },
    },
});
