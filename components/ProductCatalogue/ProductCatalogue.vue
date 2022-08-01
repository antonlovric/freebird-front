<template>
    <div>
        <div class="grid grid-cols-[30%_1fr] grid-rows-1 min-h-screen px-2 sm:px-3">
            <div class="mt-4">
                <va-accordion class="w-2/3 mx-auto">
                    <va-collapse
                        v-for="(option, index) in dropdownOptions"
                        :key="option.title"
                        :header="option.title"
                        color="#17191E"
                    >
                        <div class="inline-flex flex-wrap pl-2 py-3">
                            <va-checkbox
                                v-for="item in option.content"
                                :key="item.id"
                                :label="item.name"
                                v-model="filters.selectedFilters[index].activeFilters"
                                :option="option"
                                color="#f97316"
                                class="my-3"
                                :array-value="item.id"
                            />
                            <div v-if="option.cijena">
                                <va-input
                                    label="Najmanja cijena"
                                    class="my-3"
                                    v-model="input.priceFilter.min"
                                />
                                <va-input label="Najveća cijena" v-model="input.priceFilter.max" />
                            </div>
                        </div>
                    </va-collapse>
                    <va-button
                        @click="filterHandler"
                        class="my-3 mr-3"
                        type="submit"
                        color="#f97316"
                        text-color="#fff"
                        >Primijeni</va-button
                    >
                    <va-button @click="resetHandler" type="submit" color="#f97316" text-color="#fff"
                        >Resetiraj</va-button
                    >
                </va-accordion>
            </div>
            <div class="inline-flex flex-col">
                <div class="inline-flex gap-4">
                    <va-input label="Pretraživanje" class="w-[40ch]" v-model="input.searchQuery" />
                    <va-button
                        @click="searchHandler"
                        type="submit"
                        color="#f97316"
                        text-color="#fff"
                        >Pretraga</va-button
                    >
                </div>
                <va-inner-loading :loading="products.isLoading">
                    <ul class="inline-flex gap-8 flex-wrap my-5 text-sm">
                        <li v-for="product in products.productCollection" :key="product.id">
                            <product-card
                                :imgSrc="product.url"
                                :imgAlt="product.title"
                                :productTitle="product.title"
                                :productId="product.id"
                                :initialPrice="product.initial_price"
                            />
                        </li>
                    </ul>
                </va-inner-loading>
                <va-pagination
                    :pages="input.totalPages"
                    v-model="input.page"
                    @update:model-value="handlePageChange"
                    class="col-span-1 my-8 sm:col-span-2 md:col-span-3"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const { init } = useToast();
const config = useRuntimeConfig();
const input = reactive({
    searchQuery: '',
    priceFilter: {
        min: null,
        max: null,
    },
    page: 1,
    totalPages: 1,
});

const products = reactive({ productCollection: [], isLoading: true });

const filters = reactive({
    selectedFilters: [
        { filter: 'format', activeFilters: [] },
        { filter: 'price', activeFilters: [] },
        { filter: 'genre', activeFilters: [] },
        { filter: 'media_condition', activeFilters: [] },
        { filter: 'sleeve_condition', activeFilters: [] },
    ],
});

const dropdownOptions = [
    {
        title: 'Format',
        content: [
            { id: 1, name: 'LP' },
            { id: 2, name: `12''` },
            { id: 3, name: `10''` },
            { id: 4, name: `8''` },
            { id: 5, name: `6''` },
            { id: 6, name: `5''` },
            { id: 7, name: 'CD' },
            { id: 8, name: 'DVD' },
            { id: 9, name: 'BLU-RAY' },
        ],
    },
    {
        title: 'Cijena',
        cijena: true,
    },
    {
        title: 'Žanr',
        content: [],
    },
    {
        title: 'Stanje Medija',
        content: [],
    },
    {
        title: 'Stanje Omota',
        content: [],
    },
];

const responseGenres = await useLazyFetch(`${config.API_BASE_URL}/genres`, {
    method: 'GET',
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Dohvaćanje Žanrova',
            position: 'top-right',
            message: 'Greška prilikom dohvaćanja žanrova!',
            color: 'danger',
            duration: 5000,
        });
    },
    async onResponse({ request, response, options }) {
        dropdownOptions[2].content = response._data;
    },
    initialCache: false,
});

const responseConditions = await useLazyFetch(`${config.API_BASE_URL}/conditions`, {
    method: 'GET',
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Dohvaćanje Stanja',
            position: 'top-right',
            message: 'Greška prilikom dohvaćanja stanja!',
            color: 'danger',
            duration: 5000,
        });
    },
    async onResponse({ request, response, options }) {
        dropdownOptions[3].content = response._data;
        dropdownOptions[4].content = response._data;
    },
    initialCache: false,
});

const responseProducts = await useLazyFetch(`${config.API_BASE_URL}/products`, {
    method: 'GET',
    params: {
        title: '',
        page: input.page,
        page_size: 3,
    },
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Dohvaćanje Proizvoda',
            position: 'top-right',
            message: 'Greška prilikom dohvaćanja proizvoda!',
            color: 'danger',
            duration: 5000,
        });
        products.isLoading = false;
    },
    async onResponse({ request, response, options }) {
        products.isLoading = false;
        products.productCollection = response._data.data;
        input.totalPages = response._data.last_page;
    },
    initialCache: false,
});

const searchHandler = async () => {
    products.isLoading = true;
    await useFetch(`${config.API_BASE_URL}/products`, {
        method: 'GET',
        params: {
            title: input.searchQuery,
            page: input.page,
            page_size: 3,
        },
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Dohvaćanje Proizvoda',
                position: 'top-right',
                message: 'Greška prilikom dohvaćanja proizvoda!',
                color: 'danger',
                duration: 5000,
            });
            products.isLoading = false;
        },
        async onResponse({ request, response, options }) {
            products.isLoading = false;
            products.productCollection = response._data.data;
        },
        initialCache: false,
    });
};

const resetHandler = () => {
    filters.selectedFilters.forEach((filter) => (filter.activeFilters = []));
    searchHandler();
};

const filterHandler = async () => {
    await useFetch(`${config.API_BASE_URL}/products`, {
        method: 'GET',
        params: {
            format: filters.selectedFilters[0].activeFilters,
            min_price: input.priceFilter.min,
            max_price: input.priceFilter.max,
            genre: filters.selectedFilters[2].activeFilters,
            media_condition: filters.selectedFilters[3].activeFilters,
            sleeve_condition: filters.selectedFilters[4].activeFilters,
            title: input.searchQuery,
        },
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Dohvaćanje Proizvoda',
                position: 'top-right',
                message: 'Greška prilikom dohvaćanja proizvoda!',
                color: 'danger',
                duration: 5000,
            });
            products.isLoading = false;
        },
        async onResponse({ request, response, options }) {
            products.isLoading = false;
            products.productCollection = response._data.data;
        },
        initialCache: false,
    });
};

const handlePageChange = () => {
    searchHandler();
};
</script>
