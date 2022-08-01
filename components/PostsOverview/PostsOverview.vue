<template>
    <div class="min-h-[80vh] pt-[10vh] relative sm:w-9/12 w-10/12 mx-auto">
        <h1 class="text-3xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">Novosti</h1>
        <div class="inline-flex mt-7 flex-col">
            <div class="inline-flex gap-4">
                <va-input label="Pretraživanje" class="w-[40ch]" v-model="input.searchQuery" />
                <va-button @click="searchHandler" type="submit" color="#f97316" text-color="#fff"
                    >Pretraga</va-button
                >
            </div>
            <va-inner-loading :loading="props.pending">
                <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <post-component
                        v-for="(post, index) in posts.postCollection"
                        :key="index"
                        :image="getDisplay(post.images)"
                        :postTitle="post.heading"
                        :postDescription="post.subheading"
                        :postId="post.id"
                    />
                </div>
            </va-inner-loading>
            <va-pagination
                :pages="totalPages"
                v-model="input.pageNumber"
                @update:model-value="handlePageChange"
                class="col-span-1 my-8 sm:col-span-2 md:col-span-3"
            />
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const props = defineProps({
    posts: [],
    currentPage: Number,
    totalPages: Number,
    pending: Boolean,
    searchQuery: String,
});
const input = reactive({ searchQuery: props.searchQuery, pageNumber: props.currentPage });

const emits = defineEmits(['change_page', 'search']);

const posts = reactive({ postCollection: props.posts });

const getDisplay = (images) => images?.find((image) => image.is_display === 1)?.url;

const searchHandler = () => {
    emits('search', { query: input.searchQuery });
};

const handlePageChange = () => {
    emits('change_page', { newPage: input.pageNumber });
};
</script>
