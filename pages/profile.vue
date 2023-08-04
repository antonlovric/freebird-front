<template>
    <div>
        <the-header />
        <div
            v-if="!profileData.personalDetails || !profileData.orderedProducts"
            class="h-1/2 m-auto w-full"
        >
            Greška prilikom učitavanja!
        </div>
        <user-profile
            v-else
            :personalDetails="profileData.personalDetails"
            :orderedProducts="profileData?.orderedProducts"
        />
        <the-footer />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';
definePageMeta({
    middleware: 'auth',
});
const userData = useUserStore();
const config = useRuntimeConfig();
const profileData = reactive({
    orderedProducts: [],
    personalDetails: [],
});

const getDetails = async () => {
    const responseDetails = await useFetch(`${config.public.API_BASE_URL}/users/session`, {
        params: {
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
        },
        pick: [
            'username',
            'orders',
            'city',
            'country',
            'zipcode',
            'first_name',
            'last_name',
            'phone',
            'carts',
        ],
    });
    profileData.personalDetails = responseDetails.data.value;
};

await getDetails();

const getProducts = async () => {
    const productDetails = await useFetch(`${config.public.API_BASE_URL}/orders/products`, {
        params: {
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
            Accept: 'application/json',
        },
    });

    profileData.orderedProducts = productDetails.data.value;
};

await getProducts();

useHead({
    title: 'Profil',
});
</script>
