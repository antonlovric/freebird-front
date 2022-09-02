<template>
    <div class="min-h-[80vh] pt-[5vh] sm:pt-[10vh] relative">
        <h2 class="text-2xl mb-4 sm:mb-0 sm:text-6xl sm:mt-4 text-center">Upravljačka Ploča</h2>
        <dashboard-users
            :totalPages="responseUsers.data?.value?.last_page"
            :page="responseUsers.data?.value?.current_page"
            :pendingProducts="responseUsers?.pending"
            :users="responseUsers.data?.value?.data"
            @change_page="handlePageChangeUsers"
        />
        <dashboard-products
            :totalPages="responseProducts.data?.value?.last_page"
            :page="responseProducts.data?.value?.current_page"
            :pendingProducts="responseProducts?.pending"
            :products="responseProducts.data?.value?.data"
            @change_page="handlePageChangeProducts"
        />
        <dashboard-posts
            :page="responsePosts.data?.value?.data"
            :totalPages="responsePosts.data?.value?.last_page"
            :pendingPosts="responsePosts?.pendingPosts"
            :posts="responsePosts.data?.value?.data"
            @change_page="handlePageChangePosts"
        />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const config = useRuntimeConfig();
const userData = useUserStore();
const inputProducts = reactive({
    page: 1,
    totalPages: 1,
});

const inputPosts = reactive({
    page: 1,
    totalPages: 1,
});

const inputUsers = reactive({
    page: 1,
    totalPages: 1,
});

const responseProducts = await useAsyncData('products', () =>
    $fetch(`${config.API_BASE_URL}/products`, {
        params: {
            title: '',
            page: inputProducts.page,
            page_size: 5,
        },
    })
);

const responsePosts = await useAsyncData('posts', () =>
    $fetch(`${config.API_BASE_URL}/posts`, {
        params: {
            page: inputPosts.page,
            page_size: 5,
        },
    })
);

const responseUsers = await useAsyncData('users-dashboard', () =>
    $fetch(`${config.API_BASE_URL}/users`, {
        params: {
            page: inputUsers.page,
            page_size: 5,
        },
        headers: {
            Authorization: `Bearer ${userData.token}`,
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

const handlePageChangeUsers = async ({ newPage } = args) => {
    inputUsers.page = newPage;
    await responseUsers.refresh();
};
</script>
