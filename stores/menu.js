import {defineStore} from 'pinia';

export const useMenuStore = defineStore({
    id: 'menu-store',
    state: () => {
      return {
        menus: [],
      }
    },
    actions: {
      addMenu(menu) {
        this.menus = [...this.menus, ...menu]
      },
      addMenus(menus) {
        this.menus = [...menus]
      }
    },
    getters: {
      getMenus() {
        return this.menus
      }
    }
})