<template>
    <div>
        <the-header />
        <posts-overview
            :key="posts"
            :pending="pending"
            :currentPage="posts.current_page"
            :totalPages="posts.last_page"
            :posts="posts.data"
            :searchQuery="page.query"
            @change_page="handlePageChange"
            @search="handleSearch"
        />
        <the-footer />
    </div>
</template>

<script setup>
const page = reactive({ currentPage: 1, query: '' });
const config = useRuntimeConfig();

const {
    data: posts,
    pending,
    refresh,
} = useLazyAsyncData('posts', () =>
    $fetch(`${config.API_BASE_URL}/posts`, {
        params: {
            page: page.currentPage,
            page_size: 10,
            heading: page.query,
        },
    })
);

const handlePageChange = async ({ newPage } = args) => {
    page.currentPage = newPage;
    await refresh();
};

const handleSearch = async ({ query } = args) => {
    page.query = query;
    await refresh();
};
</script>
