<template>
    <div>
        <the-header />
        <va-inner-loading :loading="productResponse.pending.value">
            <product-details :product="productResponse.data.value?.data" />
        </va-inner-loading>
        <the-footer />
    </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.productId;

const productResponse = useLazyAsyncData(
    'product-details',
    () => useFetch(`${config.API_BASE_URL}/products/${id}`),
    { initialCache: false }
);
</script>
