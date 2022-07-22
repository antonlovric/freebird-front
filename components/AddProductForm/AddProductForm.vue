<template>
    <div class="minh-[80vh] pt-[10vh] text-white relative">
        <h1 class="text-2xl mb-4 sm:mb-0 sm:text-4xl sm:mt-4 text-center">Dodavanje Proizvoda</h1>
        <form id="form" class="flex flex-col w-3/4 sm:w-1/5 mx-auto gap-6 mb-5" @submit.prevent>
            <va-input
                v-model="productData.title"
                color="#000"
                label="Naslov"
                type="text"
                id="title"
            />
            <va-input
                v-model="productData.description"
                color="#000"
                label="Opis"
                type="text"
                id="description"
            />
            <va-select
                v-model="productData.sleeve_condition"
                color="#000"
                label="Stanje Omota"
                id="sleeve-condition"
                searchable
                :options="predefinedData.conditions"
                text-by="name"
                track-by="id"
                value-by="id"
            />
            <va-select
                v-model="productData.media_condition"
                color="#000"
                label="Stanje Medija"
                id="media-condition"
                searchable
                :options="predefinedData.conditions"
                text-by="name"
                track-by="id"
                value-by="id"
            />
            <va-input v-model="productData.sku" color="#000" label="SKU" type="text" id="sku" />
            <va-input
                v-model="productData.initial_price"
                color="#000"
                label="Cijena"
                type="number"
                id="price"
            />
            <va-input
                v-model="productData.author"
                color="#000"
                label="Autor"
                type="text"
                id="author"
            />
            <va-select
                v-model="productData.genre_id"
                color="#000"
                label="Žanr"
                id="genre_id"
                searchable
                :options="predefinedData.genres"
                text-by="name"
                track-by="id"
                value-by="id"
            />
            <va-select
                v-model="productData.product_type_id"
                color="#000"
                label="Tip proizvoda"
                id="product_type_id"
                searchable
                :options="predefinedData.productTypes"
                text-by="name"
                track-by="id"
                value-by="id"
            />
            <va-input
                v-model="productData.edition"
                color="#000"
                label="Izdanje"
                type="text"
                id="edition"
            />
            <va-input
                v-model="productData.stock"
                color="#000"
                label="Zaliha"
                type="number"
                id="stock"
            />
            <va-file-upload
                class="mx-auto"
                v-model="productData.image"
                id="image"
                type="gallery"
                file-types="jpg,png,webp"
                ref="file"
            />
            <va-button :click="submitHandler">Dodaj</va-button>
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const userData = useUserStore();

const file = ref(null);

const config = useRuntimeConfig();
const errorStatus = ref(null);
const modalOpen = true;
const predefinedData = reactive({
    productTypes: [],
    conditions: [],
    genres: [],
});

const options = [{ label: 'prva', value: '1' }];

const productData = ref({
    title: 'naslov',
    description: 'opis',
    sleeve_condition: 1,
    media_condition: 2,
    sku: 'sku',
    initial_price: 0,
    rating: 0,
    product_type_id: 1,
    author: 'author',
    discount_id: null,
    genre_id: 2,
    edition: 'edition',
    stock: 0,
    number_of_ratings: 0,
    image: '',
});

const responseProductTypes = await useFetch(`${config.API_BASE_URL}/productTypes`, {
    method: 'GET',
    initialCache: false,
    async onResponseError({ response }) {
        errorStatus.value = response.status;
    },
});
predefinedData.productTypes = responseProductTypes.data.value;

const responseConditions = await useFetch(`${config.API_BASE_URL}/conditions`, {
    method: 'GET',
    initialCache: false,
    async onResponseError({ response }) {
        errorStatus.value = response.status;
    },
});
predefinedData.conditions = responseConditions.data.value;

const responseGenres = await useFetch(`${config.API_BASE_URL}/genres`, {
    method: 'GET',
    initialCache: false,
    async onResponseError({ response }) {
        errorStatus.value = response.status;
    },
});
predefinedData.genres = responseGenres.data.value;

const submitHandler = async () => {
    productData.value.image = file.value.files[0];
    console.log(productData.value);
    const submitResponse = await useFetch(`${config.API_BASE_URL}/products`, {
        method: 'POST',
        body: productData.value,
        headers: {
            Authorization: `Bearer ${userData.token}`,
            'Content-Type': 'multipart/form-data',
        },
        initialCache: false,
        async onResponseError({ response }) {
            errorStatus.value = response.status;
        },
    });
};
</script>
