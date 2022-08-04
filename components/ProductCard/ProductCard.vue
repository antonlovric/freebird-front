<template>
    <va-card>
        <va-image v-on:mouseenter="handleHover" class="product-image" :src="props.imgSrc" />
        <va-card-content class="px-2 py-1">
            <div class="inline-flex items-center justify-between w-full mt-1">
                <nuxt-link :to="`/products/${props.productId}`">{{ props.productTitle }}</nuxt-link>
                <span class="cursor-pointer"
                    ><va-icon @click="handleAddToCart" name="shopping_cart"
                /></span>
            </div>
        </va-card-content>
        <va-card-content class="px-2 py-1 pb-3">
            <div class="inline-flex items-center justify-between mt-2">
                <span>{{ props.initialPrice }}kn</span>
            </div>
        </va-card-content>
    </va-card>
</template>

<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const config = useRuntimeConfig();
const { init } = useToast();
const userData = useUserStore();
const cartData = useCartStore();
const cartId = useCookie('cart_id').value;

const props = defineProps({
    imgSrc: {
        type: String,
        default: '',
    },
    imgAlt: {
        type: String,
        default: '',
    },
    productTitle: {
        type: String,
        default: '',
    },
    initialPrice: {
        type: String,
        default: '',
    },
    productId: {
        type: Number,
        default: 0,
    },
});

const addCartItem = async () => {
    const responseCartItem = await useFetch(`${config.API_BASE_URL}/cartItems`, {
        method: 'POST',
        body: {
            cart_id: cartId,
            quantity: 1,
            product_id: props.productId,
            price: props.initialPrice,
        },
        initialCache: false,
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Kreiranje Proizvoda',
                position: 'top-right',
                message: 'Greška prilikom dodavanja proizvoda u košaricu!',
                color: 'warning',
            });
        },
        async onResponse({ request, options, response }) {
            init({
                title: 'Kreiranje Proizvoda',
                position: 'top-right',
                message: 'Proizvod uspješno dodan u košaricu!',
                color: 'success',
            });
            cartData.addItem({
                id: props.productId,
                title: props.productTitle,
                quantity: 1,
                url: props.imgSrc,
                price: props.initialPrice,
            });
        },
    });
};

const handleAddToCart = async () => {
    const responseCart = await useFetch(`${config.API_BASE_URL}/carts`, {
        method: 'POST',
        body: {
            session_id: userData.session_id,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Dodavanje Proizvoda',
                position: 'top-right',
                message: 'Greška prilikom dodavanja proizvoda u košaricu!',
                color: 'warning',
            });
        },
        async onResponse({ request, options, response }) {
            useCookie('cart_id').value = response._data.id;
            addCartItem();
        },
    });
};
</script>

<style scoped>
img,
.product-image {
    height: 250px;
    width: 250px;
    object-fit: cover;
}
</style>
