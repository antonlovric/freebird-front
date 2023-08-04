<template>
    <div>
        <the-header />
        <div class="min-h-screen mb-14 pt-[10vh]">
            <h1 class="text-5xl mb-9 sm:text-6xl sm:mt-4 text-center">Pregled Košarice</h1>
            <va-inner-loading :loading="items.pending">
                <cart-section
                    v-if="items.cartItems.length !== 0"
                    :cartItems="items.cartItems"
                    :pending="items.pending"
                    @remove-item="handleRemove"
                />
                <h2 v-else class="text-xl sm:text-3xl sm:mt-4 text-center">
                    Nema proizvoda u košarici!
                </h2>
            </va-inner-loading>
        </div>
        <the-footer />
    </div>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const config = useRuntimeConfig();

const cartCookie = useCookie('cart_id');
const cartData = useCartStore();
const userData = useUserStore();
const items = reactive({ cartItems: [], pending: true });

const refreshItems = () => {
    if (userData.token) {
        const responseCartItems = useLazyFetch(
            `${config.public.API_BASE_URL}/cartItems/${cartCookie.value}`,
            {
                initialCache: false,
                onResponse({ response }) {
                    if (response.status === 200) {
                        items.pending = false;
                        items.cartItems = response._data;
                    }
                },
                server: false,
            }
        );
    } else {
        items.cartItems = cartData.cartItems.map((item) => {
            return {
                ...item,
                initial_price: item.price,
            };
        });
        if (items.cartItems.length > 0) items.pending = false;
    }
};

refreshItems();

const handleRemove = async (productId) => {
    cartData.removeItem(productId);
    refreshItems();
};

useHead({
    title: 'Košarica',
});
</script>
