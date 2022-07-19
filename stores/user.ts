import { defineStore } from '@pinia/nuxt/dist/runtime/composables';

export const useUserStore = defineStore('user-store', {
    state: () => {
        return {
            type: 1,
            token: '',
        };
    },
    actions: {},
    getters: {
        userData: (state) => state,
    },
});
