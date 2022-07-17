<template>
    <va-card>
        <img :src="props.image" alt="" style="width: 500px" />
        <va-card-title class="text-center">{{ props.postTitle }}</va-card-title>
        <va-card-content>{{ props.postDescription }}</va-card-content>
    </va-card>
</template>

<script setup>
const props = defineProps({
    image: {
        type: String,
        default: '',
    },
    postTitle: {
        type: String,
    },
    postDescription: {
        type: String,
        default: '',
    },
});
</script>
