import { defineStore } from 'pinia';

export const useUserStore = defineStore('user-store', {
    state: () => {
        return {
            type: 1,
            token: '',
            session_id: '',
            cart_id: '',
            remember_token: '',
        };
    },
    actions: {},
    getters: {
        userData: (state) => state,
    },
    persist: true,
});
