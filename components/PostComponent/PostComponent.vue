<template>
    <nuxt-link :to="`/posts/${props.postId}`">
        <va-card>
            <div class="max-w-[500px] max-h-[150px] overflow-hidden">
                <img
                    :src="props.image"
                    :alt="props.postTitle"
                    style="width: 500px; height: 150px; object-fit: cover"
                />
            </div>
            <va-card-title class="text-center">{{ props.postTitle }}</va-card-title>
            <va-card-content>{{ props.postDescription }}</va-card-content>
        </va-card>
    </nuxt-link>
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
    postId: {
        type: Number,
        default: null,
    },
});
</script>
