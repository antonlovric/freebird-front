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
            :to="props.path"
            v-on:mouseenter="handleCartHover"
            v-on:mouseleave="handleCartHoverOut"
            v-if="props.type === 'cart'"
            class="nav-span inline-flex relative items-center justify-center px-2 py-2"
        >
            <div
                v-if="cartHover.isVisible"
                class="absolute shadow-lg bg-[#121317] top-[110%] right-[40%] w-[350px]"
            >
                <ul>
                    <cart-preview-item
                        v-for="(item, index) in cartItems"
                        :img="item.products.url"
                        :title="item.products.title"
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
            <va-badge :text="cartQuantity.valueOf()" bottom v-if="props.icon">
                <va-icon :name="props.iconName" />
            </va-badge>
            <span v-else>{{ props.text }}</span>
        </nuxt-link>
    </li>
</template>

<script setup>
import { storeToRefs } from '~~/node_modules/@pinia/nuxt/dist/runtime/composables';
import { useCartStore } from '~~/stores/cart';

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
const cartHover = reactive({ isVisible: false });
const { cartItems, cartQuantity } = storeToRefs(cartStore);

const handleCartHover = () => {
    if (process.client) {
        cartHover.isVisible = window.innerWidth > 768;
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
