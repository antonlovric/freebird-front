import { defineStore } from 'pinia';

export const useUserStore = defineStore('user-store', {
    state: () => {
        return {
            type: 1,
            token: '',
            session_id: '',
            cart_id: '',
            remember_token: null,
        };
    },
    actions: {
        resetStore() {
            this.type = 1;
            this.token = '';
            this.session_id = '';
            this.cart_id = '';
            this.remember_token = null;
        },
    },
    getters: {
        userData: (state) => state,
    },
    persist: true,
});
