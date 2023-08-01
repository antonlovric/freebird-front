<template>
    <div class="ml-4 font-sans inline-flex justify-center relative w-11/12 text-center">
        <div class="md:pt-[5vh] inline-flex justify-center flex-col text-left gap-8 mb-20 relative">
            <div class="inline-flex flex-col md:flex-row w-full justify-center gap-8">
                <div class="w-[400px] h-[400px] hidden md:block">
                    <img class="w-[400px] h-[400px] object-cover" :src="props.product.url" />
                </div>
                <div class="inline-flex md:text-lg flex-col justify-between">
                    <div>
                        <h1 class="text-[2rem] md:w-[20ch] md:text-5xl">
                            {{ props.product.title }}
                        </h1>
                        <span class=""
                            >Dostupnost:
                            <span class="text-green-500" v-if="isInStock">Ima na zalihi</span>
                            <span class="text-red-600" v-else>Nedostupno</span>
                        </span>
                        <va-rating readonly color="#f97316" v-model="props.product.rating" />
                    </div>
                    <div class="w-[200px] h-[200px] my-4 md:hidden">
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
                    <div
                        class="inline-flex flex-col items-start sm:flex-row gap-4 sm:items-center mt-3"
                    >
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
            <div class="flex flex-col w-[80vw]">
                <h2 class="md:text-4xl text-3xl">Opis</h2>
                <div class="h-0.5 mb-2 mt-1 w-full bg-orange md:w-24" />
                <p class="text-xl">{{ props.product.description }}</p>
            </div>
            <div class="w-[80vw]" v-if="props.reviews?.length > 0">
                <h2 class="md:text-4xl text-3xl">Recenzije</h2>
                <div class="h-0.5 mb-9 mt-1 w-full bg-orange md:w-24" />
                <div v-for="(review, index) in props.reviews" :key="review.id">
                    <div class="inline-flex items-center w-full justify-between">
                        <div class="flex gap-3 items-center">
                            <va-icon size="2rem" name="account_circle" />
                            <h3 class="text-2xl">{{ review.user.username }}</h3>
                        </div>
                        <va-rating readonly color="#f97316" v-model="review.rating" />
                    </div>
                    <p class="text-lg pl-11 mt-2">
                        {{ review?.review }}
                    </p>
                    <div
                        class="h-0.5 my-4 w-full bg-orange"
                        v-if="index < props.reviews?.length - 1"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    product: Object,
    reviews: Array,
});
const { init } = useToast();
const config = useRuntimeConfig();
const userData = useUserStore();
const cartData = useCartStore();
const product = reactive({ quantity: 1 });
const isInStock = props.product?.stock > 0;
const discountedPrice = () =>
    props.product.initial_price - (props.product.discount / 100) * props.product.initial_price;
const cartCookie = useCookie('cart_id');

const addCartItem = async () => {
    if (product.quantity > props.product.stock) {
        init({
            title: 'Kreiranje Proizvoda',
            position: 'bottom-right',
            message: 'Količina proizvoda koju pokušavate naručiti nije dostupna!',
            color: 'warning',
        });
        return;
    }

    const responseCartItem = await useFetch(`${config.public.API_BASE_URL}/cartItems`, {
        method: 'POST',
        body: {
            cart_id: cartCookie.value,
            quantity: product.quantity,
            product_id: props.product?.id,
            price: props.product?.discount ? discountedPrice() : props.product?.initial_price,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Kreiranje Proizvoda',
                position: 'bottom-right',
                message: 'Greška prilikom dodavanja proizvoda u košaricu!',
                color: 'warning',
            });
        },
        async onResponse({ request, options, response }) {
            init({
                title: 'Kreiranje Proizvoda',
                position: 'bottom-right',
                message: 'Proizvod uspješno dodan u košaricu!',
                color: 'success',
            });
            cartData.addItem({
                id: props.product?.id,
                title: props.product?.title,
                quantity: product?.quantity,
                url: props.product?.url,
                price: discountedPrice(),
                media_condition: {
                    id: props.product.media_condition.id,
                    name: props.product.media_condition.name,
                },
                sleeve_condition: {
                    id: props.product.sleeve_condition.id,
                    name: props.product.sleeve_condition.name,
                },
                product_type: {
                    id: props.product.product_type.id,
                    name: props.product.product_type.name,
                },
                discount: props.product.discount,
            });
        },
    });
};

const handleAddToCart = async () => {
    if (!userData.token) return addCartItem();

    const responseCart = await useFetch(`${config.public.API_BASE_URL}/carts`, {
        method: 'POST',
        body: {
            session_id: userData.session_id,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Dodavanje Proizvoda',
                position: 'bottom-right',
                message: 'Greška prilikom dodavanja proizvoda u košaricu!',
                color: 'warning',
            });
        },
        async onResponse({ request, options, response }) {
            cartCookie.value = response._data.id;
            addCartItem();
        },
    });
};
</script>
