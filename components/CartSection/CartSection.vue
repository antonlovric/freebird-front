<template>
    <div class="min-h-screen w-7/12 mx-auto mb-10 pt-[10vh]">
        <ul class="my-6" v-if="!products.isLoading">
            <cart-overview-item
                @removed-item="handleRemovedItem"
                v-for="(product, index) in props.cartItems"
                :hasUnderline="index !== props.cartItems.length - 1"
                :key="product.id"
                :product="product"
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
    productCollection: userData.session_id ? props.cartItems : cartData.cartItems,
    isLoading: props.pending,
});
const emits = defineEmits(['remove-item']);

const handleRemovedItem = async () => {
    emits('remove-item');
};
</script>
