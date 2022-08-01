<template>
    <div class="px-4 my-5">
        <div class="mx-auto max-w-[90%] overflow-x-scroll">
            <h3 class="mb-2">Objave</h3>
            <va-data-table
                class=""
                striped
                :items="posts.data"
                :columns="columns"
                selectable
                v-model="selectedItems"
                @selection-change="selectHandler"
                select-mode="multiple"
            >
            </va-data-table>
        </div>
        <div class="ml-16 inline-flex flex-column items-center gap-4 justify-start mt-5">
            <span>Šifre označenih objava: {{ items.ids.toString() }}</span>
            <nuxt-link to="addPost">
                <va-button @click="addHandler" color="success" icon="add_circle">Dodaj</va-button>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const errorStatus = ref(null);
const porukaBrisanje = ref('Sigurni ste da želite obrisati korisnika? ');
const { init } = useToast();
const config = useRuntimeConfig();
const userData = useUserStore();
const selectedItems = ref([]);
const items = reactive({ ids: [] });

const selectHandler = (prop) => {
    items.ids = selectedItems.value.map((item) => item['id']);
};

const {
    data: posts,
    pending,
    refresh,
} = useLazyFetch(`${config.API_BASE_URL}/posts`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${userData.token}`,
    },
    async onResponseError({ response }) {
        errorStatus.value = response.status;
        init({
            title: 'Odjava',
            position: 'top-right',
            message: 'Greška prilikom odjave!',
            color: 'danger',
            duration: 5000,
        });
    },
    initialCache: false,
});

const removeHandler = async () => {
    const response = await useLazyFetch(`${config.API_BASE_URL}/products/deletePosts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            ids: items.ids,
        },
        async onResponseError({ response }) {
            errorStatus.value = response.status;
            init({
                title: 'Odjava',
                position: 'top-right',
                message: 'Greška prilikom brisanja!',
                color: 'danger',
                duration: 5000,
            });
        },
    });
    if (response.status === 204) {
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
