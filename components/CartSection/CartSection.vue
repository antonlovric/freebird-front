<template>
    <div class="min-h-screen w-10/12 sm:w-7/12 mx-auto mb-10 sm:pt-[10vh]">
        <ul class="my-6 w-full" v-if="!products.isLoading">
            <cart-overview-item
                v-for="(product, index) in props.cartItems"
                @removed-item="() => handleRemovedItem(product.product_id)"
                :hasUnderline="index !== props.cartItems.length - 1"
                :key="product.product_id || product.id"
                :quantity="product?.quantity"
                :productData="userData.token ? product.products : product"
            />
        </ul>
        <div class="inline-flex w-full justify-end" color="">
            <nuxt-link to="/checkout">
                <va-button size="large" text-color="#fff" icon-right="shopping_bag"
                    >Naplata</va-button
                ></nuxt-link
            >
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';
const props = defineProps({
    cartItems: Array,
    pending: Boolean,
});

const config = useRuntimeConfig();
const cartData = useCartStore();
const userData = useUserStore();
const products = reactive({
    isLoading: props.pending,
});
const emits = defineEmits(['remove-item']);

const handleRemovedItem = (productId) => {
    emits('remove-item', productId);
};
</script>
