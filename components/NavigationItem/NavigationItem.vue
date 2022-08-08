<template>
    <li class="inline">
        <NuxtLink
            :to="props.path"
            class="inline-flex items-center justify-center px-1 py-1"
            v-if="props.type === 'link'"
        >
            <va-icon v-if="props.icon" :name="props.iconName" />
            <span v-else>{{ props.text }}</span>
        </NuxtLink>
        <span
            v-if="props.type === 'span'"
            class="nav-span inline-flex items-center justify-center px-1 py-1"
        >
            <va-icon v-if="props.icon" :name="props.iconName" />
            <span v-else>{{ props.text }}</span>
        </span>
        <nuxt-link
            :to="products.cartQuantity > 0 ? props.path : ''"
            v-on:mouseenter="handleCartHover"
            v-on:mouseleave="handleCartHoverOut"
            v-if="props.type === 'cart'"
            class="nav-span inline-flex relative items-center justify-center px-2 py-2"
        >
            <div
                v-on:mouseenter="handleCartHover"
                v-on:mouseleave="handleCartHoverOut"
                v-if="cartHover.isVisible"
                class="absolute shadow-lg bg-[#121317] top-[110%] right-[40%] w-[350px]"
            >
                <ul>
                    <cart-preview-item
                        v-for="(item, index) in products.cartItems"
                        :img="loggedIn ? item.products.url : item.url"
                        :title="loggedIn ? item.products.title : item.title"
                        :price="item.price"
                        :quantity="item.quantity"
                        :key="index"
                    />
                </ul>
                <div class="flex">
                    <va-button
                        icon-right="shopping_cart_checkout"
                        color="#f97316"
                        text-color="#fff"
                        class="block mx-auto my-3"
                        >Pregledaj Narudžbu</va-button
                    >
                </div>
            </div>
            <nuxt-link @mouseenter="handleCartHover" @mouseleave="handleCartHoverOut" to="/cart">
                <va-badge :text="products.cartQuantity" bottom v-if="props.icon">
                    <va-icon :name="props.iconName" />
                </va-badge>
            </nuxt-link>

            <span>{{ props.text }}</span>
        </nuxt-link>
    </li>
</template>

<script setup>
import { storeToRefs } from '~~/node_modules/@pinia/nuxt/dist/runtime/composables';
import { useCartStore } from '~~/stores/cart';
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    text: {
        type: String,
        default: '',
    },
    path: {
        type: String,
        default: '/',
    },
    icon: {
        type: Boolean,
        default: false,
    },
    iconName: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'link',
    },
});
const cartStore = useCartStore();
const { cartItems, cartQuantity } = storeToRefs(cartStore);
const cartHover = reactive({ isVisible: false });
const userData = useUserStore();
const { token } = storeToRefs(userData);
const loggedIn = token.value;
const config = useRuntimeConfig();
const products = reactive({
    cartItems: cartItems.value,
    cartQuantity: cartQuantity.value,
    isVisible: false,
});

const getQuantity = () => products.cartItems.reduce((prev, next) => prev + next?.quantity, 0);

if (token.value) {
    const cartId = useCookie('cart_id').value;
    const responseCartItems = await useAsyncData('cart_items_overview', () =>
        useFetch(`${config.API_BASE_URL}/cartItems/${cartId}`)
    );
    if (responseCartItems.data.value) {
        products.cartItems = responseCartItems?.data?.value?.data;
        products.cartQuantity = getQuantity();
    }
}

watch(cartItems, (newItems) => (products.cartItems = newItems));
watch(cartQuantity, (newQuantity) => (products.cartQuantity = newQuantity));

const handleCartHover = () => {
    if (process.client) {
        cartHover.isVisible = window.innerWidth > 768 && products.cartQuantity > 0;
    }
};

const handleCartHoverOut = () => {
    cartHover.isVisible = false;
};
</script>

<style>
.nav-span {
    cursor: pointer;
}
</style>
