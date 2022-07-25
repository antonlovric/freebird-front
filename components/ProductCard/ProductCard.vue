<template>
    <!-- <div class="inline-flex flex-col">
        <img :src="props.imgSrc" :alt="props.imgAlt" />
        <div class="inline-flex flex-col">
            <div class="inline-flex items-center justify-between mt-1">
                <nuxt-link :to="products / id">{{ props.productTitle }}</nuxt-link>
                <va-icon name="shopping_cart" />
            </div>
            <div class="inline-flex items-center justify-between mt-2">
                <span>{{ props.initialPrice }} HRK</span>
            </div>
        </div>
    </div> -->
    <va-card stripe stripe-color="success">
        <va-image class="product-image" :src="props.imgSrc" />
        <va-card-content class="px-2 py-1">
            <div class="inline-flex items-center justify-between w-full mt-1">
                <nuxt-link>{{ props.productTitle }}</nuxt-link>
                <va-icon name="shopping_cart" />
            </div>
        </va-card-content>
        <va-card-content class="px-2 py-1 pb-3">
            <div class="inline-flex items-center justify-between mt-2">
                <span>{{ props.initialPrice }} HRK</span>
            </div>
        </va-card-content>
    </va-card>
</template>

<script setup>
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
</script>

<style scoped>
img,
.product-image {
    height: 250px;
    width: 250px;
    object-fit: cover;
}
</style>
