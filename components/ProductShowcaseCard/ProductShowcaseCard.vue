<template>
    <va-card class="product-showcase-card">
        <img :src="props.imageSource" style="width: 250px; height: 250px" alt="" />
        <div class="text-white mt-2 text-xl">{{ props.productName }}</div>
        <va-card-actions align="center" class="bg-primary shadow-none">
            <nuxt-link :to="props.productLink">
                <va-button class="justify-center" color="#f97316" text-color="#fff"
                    >Vidi Detalje</va-button
                ></nuxt-link
            >
        </va-card-actions>
    </va-card>
</template>

<style>
.product-showcase-card .va-card__inner {
    background-color: #17191e;
}
</style>

<script setup>
const props = defineProps({
    imageSource: {
        type: String,
        default: '',
    },
    productLink: {
        type: String,
        default: '/',
    },
    productName: {
        type: String,
        default: '/',
    },
});
</script>
