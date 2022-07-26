<template>
    <div>
        <the-header />
        <product-details v-if="product.productFetched" :product="product.productData" />
        <the-footer />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.productId;

const product = reactive({ productData: {}, productFetched: false });

const productResponse = useLazyFetch(`${config.API_BASE_URL}/products/${id}`, {
    method: 'GET',
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Dohvaćanje podataka o proizvodu',
            position: 'top-right',
            message: 'Greška prilikom dohvaćanja podataka o proizvodu!',
            color: 'danger',
            duration: 5000,
        });
    },
    async onResponse({ request, response, options }) {
        product.productData = response._data;
        product.productFetched = true;
    },
    initialCache: false,
});
</script>
