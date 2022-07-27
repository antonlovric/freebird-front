<template>
    <div class="min-h-screen w-7/12 mx-auto mb-10 pt-[10vh]">
        <h1 class="text-2xl sm:text-5xl sm:mt-4 text-center">Pregled Košarice</h1>
        <ul class="my-6" v-if="!products.isLoading">
            <cart-overview-item
                @removed-item="handleRemovedItem"
                v-for="(product, index) in products.productCollection"
                :hasUnderline="index !== products.productCollection.length - 1"
                :key="product.id"
                :product="product"
            />
        </ul>
        <div class="inline-flex w-full justify-end" color="">
            <va-button size="large" text-color="#fff" icon-right="shopping_bag">Naplata</va-button>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';

const config = useRuntimeConfig();
const cartData = useCartStore();
const products = reactive({ productCollection: [], isLoading: true });
const responseProduct = await useFetch(
    `${config.API_BASE_URL}/cartItems/${localStorage.getItem('cart_id')}`,
    {
        method: 'GET',
        initialCache: false,
        pick: ['products'],
        async onResponseError({ response }) {
            errorStatus.value = response.status;
        },
        async onResponse({ request, response, options }) {
            products.productCollection = response._data;
            products.isLoading = false;
        },
    }
);

const handleRemovedItem = async () => {
    await responseProduct.refresh();
};
</script>
