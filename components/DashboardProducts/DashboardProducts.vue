<template>
    <div class="px-4 my-5">
        <div class="mx-auto max-w-[90%] overflow-x-scroll">
            <h3 class="mb-2">Proizvodi</h3>
            <va-inner-loading :loading="props.pending">
                <va-data-table
                    class=""
                    striped
                    :items="props.products"
                    :columns="columns"
                    selectable
                    v-model="selectedItems"
                    @selection-change="selectHandler"
                    select-mode="multiple"
                    :loading="props.pending"
                >
                    <template #cell(image)="{ value }"
                        ><img class="sm:h-[100px] h-auto" :src="value"
                    /></template>
                    <template #bodyAppend>
                        <tr>
                            <td colspan="8" class="table-example--pagination">
                                <va-pagination
                                    :pages="props.totalPages"
                                    v-model="input.page"
                                    @update:model-value="handlePageChange"
                                />
                            </td>
                        </tr>
                    </template> </va-data-table
            ></va-inner-loading>
        </div>
        <div
            class="sm:ml-16 flex-col sm:flex-row inline-flex flex-column items-center gap-4 justify-start mt-5"
        >
            <span>Šifre označenih računa: {{ items.ids.toString() }}</span>
            <va-button
                :disabled="items.ids.length !== 0"
                @click="input.isModalVisible = true"
                color="success"
                icon="add_circle"
                >Dodaj</va-button
            >
            <va-button
                @click="input.isModalVisible = true"
                :disabled="items.ids.length !== 1"
                color="warning"
                icon="update"
                >Ažuriraj</va-button
            >
            <product-form
                v-if="input.isModalVisible"
                :isVisible="input.isModalVisible"
                :product="selectedItems[0]"
                :predefinedData="predefinedData"
                @close-modal="input.isModalVisible = false"
            ></product-form>
            <va-button
                :disabled="items.ids.length === 0"
                @click="removeHandler"
                color="danger"
                icon="delete_forever"
                >Obriši</va-button
            >
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const { init } = useToast();
const config = useRuntimeConfig();
const userData = useUserStore();
const selectedItems = ref([]);
const items = reactive({ ids: [] });

const selectHandler = (prop) => {
    items.ids = selectedItems.value.map((item) => item['id']);
};

const props = defineProps({
    products: Array,
    pending: Boolean,
    totalPages: Number,
    currentPage: Number,
});

const input = reactive({
    searchQuery: '',
    page: props.currentPage,
    totalPages: props.totalPages,
    isModalVisible: false,
});

const emits = defineEmits(['change_page']);

const handlePageChange = () => {
    emits('change_page', { newPage: input.page });
};

const removeHandler = async () => {
    const response = useFetch(`${config.API_BASE_URL}/products/deleteProducts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            ids: items.ids,
        },
        async onResponseError({ response, error }) {
            init({
                title: 'Odjava',
                position: 'bottom-right',
                message: 'Greška prilikom brisanja!',
                color: 'danger',
                duration: 5000,
            });
        },
    });
    if (response.data.value) {
        init({
            title: 'Brisanje Proizvoda',
            position: 'bottom-right',
            message: 'Proizvodi uspješno obrisani!',
            color: 'success',
            duration: 5000,
        });
    }
};

const columns = [
    { key: 'id', name: 'id', label: 'ID' },
    { key: 'title', name: 'title', label: 'Naslov' },
    { key: 'initial_price', name: 'initial_price', label: 'Cijena' },
    { key: 'discount', name: 'discount', label: 'Popust (%)' },
    { key: 'url', name: 'image', label: 'image' },
];

const responseProductTypes = await useFetch(`${config.API_BASE_URL}/productTypes`, {
    method: 'GET',
    initialCache: false,
    async onResponseError({ response }) {
        errorStatus.value = response.status;
    },
});

const predefinedData = reactive({
    productTypes: [],
    conditions: [],
    genres: [],
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
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
