<template>
    <va-card>
        <img :src="props.imageSource" style="width: 250px; height: 250px" alt="" />
        <va-card-actions align="center" class="bg-primary shadow-none">
            <nuxt-link :to="props.productLink">
                <va-button class="justify-center" color="#f97316" text-color="#fff"
                    >Vidi Detalje</va-button
                ></nuxt-link
            >
        </va-card-actions>
    </va-card>
</template>

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
});
</script>
