<template>
    <div>
        <va-sidebar v-if="userData.token == ''" :minimized="isShown.minimized" minimizedWidth="0">
            <va-sidebar-item v-for="(item, index) in notLoggedUser" :key="index">
                <nuxt-link :to="item.route">
                    <va-sidebar-item-content>
                        <va-icon :name="item.icon" />
                        <va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
                    </va-sidebar-item-content>
                </nuxt-link>
            </va-sidebar-item>
        </va-sidebar>
        <va-sidebar
            v-if="userData.token != ''"
            :minimized="isShown.minimized"
            minimizedWidth="0"
            class="!absolute"
        >
            <va-sidebar-item v-for="(item, index) in loggedInUser" :key="index">
                <nuxt-link v-if="!item.span" :to="item.route">
                    <va-sidebar-item-content>
                        <va-icon :name="item.icon" />
                        <va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
                    </va-sidebar-item-content>
                </nuxt-link>
                <span @click="handleLogout" :id="item.id" v-else :to="item.route">
                    <va-sidebar-item-content>
                        <va-icon :name="item.icon" />
                        <va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
                    </va-sidebar-item-content>
                </span>
            </va-sidebar-item>
        </va-sidebar>
        <va-button
            id="menu-button"
            size="large"
            color="#f97316"
            icon="menu"
            class="!fixed !right-6 top-5 z-40"
            v-model="isShown.minimized"
            @click="handleMenuClick"
        ></va-button>
    </div>
</template>

<script setup>
import { VaSidebar } from 'vuestic-ui';
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const isShown = reactive({ minimized: true });
const userData = useUserStore();
const cartData = useCartStore();
const { init } = useToast();
const config = useRuntimeConfig();

const handleMenuClick = () => {
    isShown.minimized = !isShown.minimized;
};

const notLoggedUser = ref([
    { name: 'Naslovnica', icon: 'home', route: '/' },
    { name: 'Katalog', icon: 'library_music', route: '/catalogue' },
    { name: 'Novosti', icon: 'feed', route: '/blogPosts' },
    { name: 'Košarica', icon: 'shopping_cart', route: '/cart' },
    { name: 'Registracija', icon: 'how_to_reg', route: '/registration' },
    { name: 'Prijava', icon: 'login', route: '/login' },
]);

const loggedInUser = ref([
    { name: 'Naslovnica', icon: 'home', route: '/' },
    { name: 'Katalog', icon: 'library_music', route: '/catalogue' },
    { name: 'Novosti', icon: 'feed', route: '/blogPosts' },
    { name: 'Profil', icon: 'account_circle', route: '/profile' },
    { name: 'Košarica', icon: 'shopping_cart', route: '/cart' },
    { name: 'Odjava', icon: 'logout', span: 'true', id: 'logout' },
]);

const handleLogout = async (event) => {
    init({
        title: 'Odjava',
        position: 'bottom-right',
        message: 'Pričekajte...',
        duration: 5000,
    });
    const response = await useFetch(`${config.public.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Odjava',
                position: 'bottom-right',
                message: 'Greška prilikom odjave!',
                color: 'danger',
                duration: 5000,
            });
        },
    });
    if (!response.error?.value) {
        userData.resetStore();
        cartData.clearCart();
        const rememberCookie = useCookie('remember_token');
        rememberCookie.value = null;
        init({
            title: 'Odjava',
            position: 'bottom-right',
            message: 'Uspješna odjava!',
            color: 'success',
            duration: 5000,
        });
    }
};
</script>

<style scoped>
.va-sidebar {
    position: fixed !important;
}
</style>
