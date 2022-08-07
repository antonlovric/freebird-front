<template>
    <div class="px-4 my-5">
        <div class="mx-auto max-w-[90%] overflow-x-scroll">
            <h3 class="mb-2">Objave</h3>
            <va-inner-loading :loading="props.pending">
                <va-data-table
                    class=""
                    striped
                    :items="props.posts"
                    :columns="columns"
                    selectable
                    v-model="selectedItems"
                    @selection-change="selectHandler"
                    select-mode="multiple"
                >
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
                    </template>
                </va-data-table>
            </va-inner-loading>
        </div>
        <div
            class="sm:ml-16 flex-col sm:flex-row inline-flex flex-column items-center gap-4 justify-start mt-5"
        >
            <span>Šifre označenih objava: {{ items.ids.toString() }}</span>
            <nuxt-link to="addPost">
                <va-button color="success" icon="add_circle">Dodaj</va-button>
            </nuxt-link>
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

const input = reactive({
    searchQuery: '',
    page: props.currentPage,
    totalPages: props.totalPages,
});
const emits = defineEmits(['change_page']);
const handlePageChange = () => {
    emits('change_page', { newPage: input.page });
};
const props = defineProps({
    posts: Array,
    pending: Boolean,
    totalPages: Number,
    currentPage: Number,
});

const selectHandler = (prop) => {
    items.ids = selectedItems.value.map((item) => item['id']);
};

const removeHandler = async () => {
    const response = await useLazyFetch(`${config.API_BASE_URL}/posts/deletePosts`, {
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
    if (response.status === 200) {
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
    { key: 'heading', name: 'heading', label: 'Naslov' },
    { key: 'created_at', name: 'created_at', label: 'Vrijeme Kreiranja' },
];
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
