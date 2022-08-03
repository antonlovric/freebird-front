<template>
    <div class="ml-4 font-sans inline-flex justify-center relative w-11/12 text-center">
        <div class="sm:pt-[20vh] inline-flex justify-center flex-col text-left gap-8 mb-20">
            <div class="inline-flex flex-col sm:flex-row w-full justify-center gap-8">
                <div class="w-[400px] h-[400px] hidden sm:block">
                    <img class="w-[400px] h-[400px] object-cover" :src="props.product.url" />
                </div>
                <div class="inline-flex sm:text-lg flex-col justify-between">
                    <div>
                        <h1 class="text-[2rem] sm:w-[20ch] sm:text-5xl">
                            {{ props.product.title }}
                        </h1>
                        <span class=""
                            >Dostupnost:
                            <span class="text-green-500" v-if="isInStock">Ima na zalihi</span>
                            <span class="text-red-600" v-else>Nedostupno</span>
                        </span>
                        <va-rating color="#f97316" v-model="props.product.rating" />
                    </div>
                    <div class="w-[200px] h-[200px] my-4 sm:hidden">
                        <img class="w-[200px] h-[200px] object-cover" :src="props.product.url" />
                    </div>
                    <ul class="inline-flex flex-col gap-0.5 text-xl">
                        <li>Format: {{ props.product.product_type?.name }}</li>
                        <li>Stanje Omota: {{ props.product.sleeve_condition?.name }}</li>
                        <li>Stanje Medija: {{ props.product.media_condition?.name }}</li>
                        <li>Izdanje: {{ props.product.edition }}</li>
                        <li>
                            Cijena:
                            <span class="font-semibold">{{ props.product.initial_price }}kn</span>
                        </li>
                    </ul>
                    <div class="inline-flex sm_flex-row gap-4 items-center mt-3">
                        <va-button
                            size="large"
                            color="#f97316"
                            text-color="#fff"
                            icon-right="shopping_cart"
                            @click="handleAddToCart"
                            >Dodaj u košaricu</va-button
                        >
                        <va-counter :min="1" color="#f97316" v-model="product.quantity" />
                    </div>
                </div>
            </div>
            <div class="inline-flex flex-col">
                <h2 class="sm:text-4xl">Opis</h2>
                <div class="h-0.5 mb-2 mt-1 w-full bg-orange sm:w-24" />
                <p class="text-xl">{{ props.product.description }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    product: Object,
});
const { init } = useToast();
const config = useRuntimeConfig();
const userData = useUserStore();
const cartData = useCartStore();
const product = reactive({ quantity: 1 });
const isInStock = props.product?.stock > 0;

const addCartItem = async () => {
    if (product.quantity > props.product.stock) {
        init({
            title: 'Kreiranje Proizvoda',
            position: 'top-right',
            message: 'Količina proizvoda koju pokušavate naručiti nije dostupna!',
            color: 'warning',
        });
        return;
    }

    const responseCartItem = await useFetch(`${config.API_BASE_URL}/cartItems`, {
        method: 'POST',
        body: {
            cart_id: localStorage.getItem('cart_id'),
            quantity: product.quantity,
            product_id: props.product?.id,
            price: props.product?.initial_price,
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
                id: props.product?.id,
                title: props.product?.title,
                quantity: product?.quantity,
                url: props.product?.url,
                price: props.product?.initial_price,
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
            errorStatus.value = response.status;
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
