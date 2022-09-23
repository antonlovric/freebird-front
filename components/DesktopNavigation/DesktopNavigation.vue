<template>
    <ul
        class="inline-flex flex-row items-center justify-center w-full px-4 bg-primary fixed pt-3 z-50 opacity-100"
    >
        <li class="flex items-center justify-around w-1/3">
            <navigation-item class="inline-flex justify-start" text="Naslovnica" />
            <navigation-item class="inline-flex justify-start" path="/catalogue" text="Katalog" />
            <navigation-item class="inline-flex justify-start" path="/blogPosts" text="Novosti" />
        </li>
        <li>
            <img src="~/assets/logo_transparent2.png" alt="Freebird logo" />
        </li>
        <li class="flex items-center justify-end w-1/3">
            <navigation-item
                v-if="!userData.token"
                class="inline-flex justify-end"
                path="/registration"
                text="Registracija"
            />
            <navigation-item
                v-if="!userData.token"
                class="inline-flex justify-end"
                path="/login"
                text="Prijava"
            />
            <navigation-item
                class="inline-flex justify-end"
                path="/profile"
                v-if="userData.token"
                text="Profil"
            />
            <navigation-item
                class="inline-flex justify-end"
                v-if="userData.token"
                type="span"
                text="Odjava"
                @click="handleLogout"
            />
            <navigation-item
                class="inline-flex justify-end"
                path="/cart"
                icon
                icon-name="shopping_cart"
                type="cart"
            />
        </li>
    </ul>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
const cartData = useCartStore();
const { init, close } = useToast();
const config = useRuntimeConfig();

const handleLogout = async (event) => {
    init({
        title: 'Odjava',
        position: 'bottom-right',
        message: 'Pričekajte...',
        duration: 5000,
    });
    const response = await useFetch(`${config.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        initialCache: false,
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
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
