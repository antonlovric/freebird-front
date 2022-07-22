<template>
    <ul
        class="inline-flex flex-row items-center justify-center w-full px-4 bg-primary bg-opacity-40 fixed pt-3 z-50"
    >
        <div class="flex items-center justify-around w-1/3">
            <navigation-item class="inline-flex justify-start" text="Naslovnica" />
            <navigation-item class="inline-flex justify-start" path="/about" text="Katalog" />
            <navigation-item class="inline-flex justify-start" path="/posts" text="Novosti" />
        </div>
        <img src="../../assets/logo_transparent 2.png" alt="Freebird logo" />
        <div class="flex items-center justify-end w-1/3">
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
                path="/checkout"
                icon
                icon-name="shopping_cart"
            />
        </div>
    </ul>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
const errorStatus = ref(null);
const { init, close } = useToast();
const config = useRuntimeConfig();

const handleLogout = async (event) => {
    init({
        title: 'Odjava',
        position: 'top-right',
        message: 'Pričekajte...',
        duration: 5000,
    });
    const response = await useFetch(`${config.API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Odjava',
                position: 'top-right',
                message: 'Greška prilikom odjave!',
                color: 'danger',
                duration: 5000,
            });
        },
    });

    if (response.data.value?.status === 204) {
        userData.$reset();
        init({
            title: 'Odjava',
            position: 'top-right',
            message: 'Uspješna odjava!',
            color: 'success',
            duration: 5000,
        });
    }
};
</script>
