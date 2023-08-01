<template>
    <div>
        <the-header />
        <div class="min-h-[80vh] pt-[10vh] relative">
            <va-inner-loading
                :loading="productResponse.pending.value || reviewsResponse.pending.value"
            >
                <product-details
                    v-if="productResponse.data.value"
                    :product="productResponse.data.value"
                    :reviews="reviewsResponse.data.value"
                />
            </va-inner-loading>
        </div>
        <the-footer />
    </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.productId;

const productResponse = useLazyFetch(`${config.public.API_BASE_URL}/products/${id}`, {
    method: 'GET',
    async onResponseError({ response }) {
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

const reviewsResponse = useLazyFetch(`${config.public.API_BASE_URL}/productReviews/${id}`, {
    method: 'GET',
    initialCache: false,
    async onResponseError({ response }) {
        init({
            title: 'Dohvaćanje recenzija',
            position: 'bottom-right',
            message: 'Greška prilikom dohvaćanja recenzija!',
            color: 'warning',
        });
    },
});

useHead({
    title: 'Detalji Proizvoda',
});
</script>
