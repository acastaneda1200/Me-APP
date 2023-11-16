import { defineStore } from 'pinia';

export const useUIStore = defineStore('UI', {
  state: () => ({
    leftDrawerOpen: false,
    addDialogPerfume: false,
  }),
  actions: {
    toggleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen
    },
    handleAddDialogPerfume() {
        this.addDialogPerfume = !this.addDialogPerfume
    },
  },
});
