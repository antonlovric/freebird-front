<template>
    <div>
        <the-header />
        <div class="min-h-screen mb-14 pt-[10vh]">
            <h1 class="text-2xl sm:text-5xl sm:mt-4 text-center">Pregled Košarice</h1>
            <cart-section
                v-if="cartQuantity !== 0"
                :cartItems="responseCartItems?.data?.value?.data"
                :pending="responseCartItems?.data?.value?.pending"
                @remove-item="() => responseCartItems.refresh()"
            />
            <h2 v-else class="text-xl sm:text-3xl sm:mt-4 text-center">
                Nema proizvoda u košarici!
            </h2>
        </div>
        <the-footer />
    </div>
</template>

<script setup>
const config = useRuntimeConfig();

const cartId = useCookie('cart_id').value;

const responseCartItems = useLazyAsyncData('cart_items_overview', () =>
    useFetch(`${config.API_BASE_URL}/cartItems/${cartId}`, {
        keepalive: false,
    })
);

onMounted(async () => {
    console.log(1);
});

onUnmounted(() => console.log(2));
const cartQuantity = responseCartItems?.data?.value?.data?.length;
</script>
