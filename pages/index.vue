<template>
    <div>
        <the-header />
        <homepage-hero />
        <catalogue-section :products="products.data" />
        <news-section />
        <the-footer />
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: products, pendingProducts } = useLazyAsyncData('featured', () =>
    $fetch(`${config.API_BASE_URL}/products/featured`)
);
</script>
