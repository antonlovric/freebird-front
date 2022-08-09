<template>
    <div class="min-h-[80vh] pt-[5vh] sm:pt-[10vh] relative">
        <h2 class="text-2xl mb-4 sm:mb-0 sm:text-6xl sm:mt-4 text-center">Upravljačka Ploča</h2>
        <dashboard-users />
        <dashboard-products
            :totalPages="responseProducts.data?.value?.last_page"
            :page="responseProducts.data?.value?.current_page"
            :pendingProducts="responseProducts?.pending"
            :products="responseProducts.data?.value?.data"
            @change_page="handlePageChangeProducts"
        />
        <dashboard-posts
            :page="responsePosts.data?.value.data"
            :totalPages="responsePosts.data?.value?.last_page"
            :pendingPosts="responsePosts?.pendingPosts"
            :posts="responsePosts.data?.value?.data"
            @change_page="handlePageChangePosts"
        />
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const inputProducts = reactive({
    page: 1,
    totalPages: 1,
});

const inputPosts = reactive({
    page: 1,
    totalPages: 1,
});

const responseProducts = useLazyAsyncData('products', () =>
    $fetch(`${config.API_BASE_URL}/products`, {
        params: {
            title: '',
            page: inputProducts.page,
            page_size: 3,
        },
    })
);

const responsePosts = useLazyAsyncData('posts', () =>
    $fetch(`${config.API_BASE_URL}/posts`, {
        params: {
            page: inputPosts.page,
            page_size: 3,
        },
    })
);

const handlePageChangeProducts = async ({ newPage } = args) => {
    inputProducts.page = newPage;
    await responseProducts.refresh();
};

const handlePageChangePosts = async ({ newPage } = args) => {
    inputPosts.page = newPage;
    await responsePosts.refresh();
};
</script>
