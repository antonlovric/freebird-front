<template>
    <div class="min-h-[80vh] pt-[10vh] relative">
        <h1 class="text-3xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">
            {{ props.post.heading }}
        </h1>
        <p class="text-center mb-5">Vrijeme objave: {{ formattedDate }}</p>
        <img
            class="max-w-[200px] mx-auto sm:max-w-[500px]"
            :src="displayImage?.url"
            :alt="props.post.heading"
        />
        <h2 class="text-2xl mb-4 sm:mb-0 sm:text-3xl sm:mt-4 text-center">
            {{ props.post.subheading }}
        </h2>
        <h2></h2>
        <div class="w-[60ch] mt-6 mx-auto text-justify">
            <p>{{ props.post.body }}</p>
        </div>
        <h3 class="text-center my-10">Galerija</h3>
        <div class="flex flex-col">
            <img
                class="max-w-[200px] mb-8 mx-auto sm:max-w-[500px]"
                v-for="(image, index) in postImages"
                :key="index"
                :src="image.url"
                :alt="image.filename"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    post: Object,
});
const date = new Date(props.post.created_at);
const formattedDate = Intl.DateTimeFormat('en-GB').format(date);

const displayImage = props.post.images.find((image) => image.is_display === 1);
const postImages = props.post.images.filter((image) => image.is_display === 0);
</script>
