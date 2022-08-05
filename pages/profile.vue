<template>
    <div>
        <the-header />
        <user-profile
            v-if="!responseDetails.error.value"
            :personalDetails="responseDetails.data.value"
            :orderedProducts="productData.orderedProducts"
        />
        <the-footer />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();
const config = useRuntimeConfig();
const productData = reactive({ orderedProducts: [] });

const responseDetails = await useAsyncData('personal_details', () =>
    useFetch(`${config.API_BASE_URL}/users/session`, {
        params: {
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
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
    })
);

const responseProducts = await useAsyncData('ordered_products', () =>
    useFetch(`${config.API_BASE_URL}/orders/products`, {
        params: {
            session_id: userData.session_id,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
    })
);

productData.orderedProducts = responseProducts.data.value.data[0];
</script>
