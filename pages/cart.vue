<template>
    <div>
        <the-header />
        <div class="min-h-screen mb-14 pt-[10vh]">
            <h1 class="text-2xl sm:text-5xl sm:mt-4 text-center">Pregled Košarice</h1>
            <cart-section
                v-if="cartQuantity !== 0"
                :cartItems="items.cartItems"
                :pending="items.pending"
                @remove-item="handleRemove"
            />
            <h2 v-else class="text-xl sm:text-3xl sm:mt-4 text-center">
                Nema proizvoda u košarici!
            </h2>
        </div>
        <the-footer />
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const config = useRuntimeConfig();

const cartId = useCookie('cart_id').value;
const cartData = useCartStore();
const userData = useUserStore();
const items = reactive({ cartItems: [], pending: true });

if (userData.token) {
    const responseCartItems = useLazyAsyncData('cart_items_overview', () =>
        useFetch(`${config.API_BASE_URL}/cartItems/${cartId}`)
    );

    if (responseCartItems?.data?.value?.data) {
        items.cartItems = responseCartItems?.data?.value?.data;
        items.pending = false;
    }
} else {
    items.cartItems = cartData.cartItems;
    if (items.cartItems.length > 0) items.pending = false;
}

const handleRemove = async (productId) => {
    cartData.removeItem(productId);

    const data = await useFetch(`${config.API_BASE_URL}/cartItems/${cartId}`);
    items.cartItems = data.data.value;
};

const cartQuantity = items.cartItems.length;
</script>
