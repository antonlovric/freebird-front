<template>
    <div>
        <the-header />
        <div class="min-h-[80vh] pt-[10vh] relative">
            <product-details
                v-if="productResponse.data.value"
                :product="productResponse.data.value"
            />
        </div>
        <the-footer />
    </div>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.productId;

const productResponse = useFetch(`${config.API_BASE_URL}/products/${id}`, {
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

useHead({
    title: 'Detalji Proizvoda',
});
</script>
