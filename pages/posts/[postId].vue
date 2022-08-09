<template>
    <div>
        <the-header />
        <div class="min-h-[80vh] pt-[10vh] relative">
            <va-inner-loading :loading="postResponse.pending.value">
                <post-details v-if="!postResponse.pending.value" :post="postResponse.data.value" />
            </va-inner-loading>
        </div>
        <the-footer />
    </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.postId;
const postResponse = useLazyFetch(`${config.API_BASE_URL}/posts/${id}`, {
    method: 'GET',
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Dohvaćanje podataka o objavi',
            position: 'bottom-right',
            message: 'Greška prilikom dohvaćanja podataka o objavi!',
            color: 'danger',
            duration: 5000,
        });
    },
    initialCache: false,
});

useHead({
    title: 'Detalji Novosti',
});
</script>
