<template>
    <div>
        <the-header />
        <post-details :post="productResponse.data.value" />
        <the-footer />
    </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.postId;
const productResponse = useLazyFetch(`${config.API_BASE_URL}/posts/${id}`, {
    method: 'GET',
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Dohvaćanje podataka o objavi',
            position: 'top-right',
            message: 'Greška prilikom dohvaćanja podataka o objavi!',
            color: 'danger',
            duration: 5000,
        });
    },
    initialCache: false,
});
</script>
