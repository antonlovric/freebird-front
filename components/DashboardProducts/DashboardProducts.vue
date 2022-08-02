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
                        ><img style="height: 100px" :src="value"
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
        <div class="ml-16 inline-flex flex-column items-center gap-4 justify-start mt-5">
            <span>Šifre označenih računa: {{ items.ids.toString() }}</span>
            <nuxt-link to="addProducts">
                <va-button color="success" icon="add_circle">Dodaj</va-button>
            </nuxt-link>
            <va-button :disabled="items.ids.length !== 1" color="warning" icon="update"
                >Ažuriraj</va-button
            >
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
        async onResponseError({ response }) {
            init({
                title: 'Odjava',
                position: 'top-right',
                message: 'Greška prilikom brisanja!',
                color: 'danger',
                duration: 5000,
            });
        },
    });
    if (response.data.value) {
        init({
            title: 'Brisanje Proizvoda',
            position: 'top-right',
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
    { key: 'discount_id', name: 'discount_id', label: 'Šifra popusta' },
    { key: 'url', name: 'image', label: 'image' },
];
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
