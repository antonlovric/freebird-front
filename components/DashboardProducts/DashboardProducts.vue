<template>
    <div class="px-4 my-5">
        <div class="mx-auto max-w-[90%] overflow-x-scroll">
            <h3 class="mb-2">Proizvodi</h3>
            <va-data-table
                class="text-white"
                striped
                :items="users.userCollection"
                :columns="columns"
                selectable
                v-model="selectedItems"
                @selection-change="selectHandler"
                select-mode="multiple"
            >
            </va-data-table>
        </div>
        <div class="ml-16 inline-flex flex-column items-center gap-4 justify-start mt-5">
            <span>Šifre označenih računa: {{ items.ids.toString() }}</span>
            <nuxt-link to="addProducts">
                <va-button @click="addHandler" color="success" icon="add_circle">Dodaj</va-button>
            </nuxt-link>
            <va-button
                :disabled="items.ids.length !== 1"
                @click="updateHandler"
                color="warning"
                icon="update"
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

const errorStatus = ref(null);
const porukaBrisanje = ref('Sigurni ste da želite obrisati korisnika? ');
const { init } = useToast();
const config = useRuntimeConfig();
const users = reactive({ userCollection: [] });
const userData = useUserStore();
const selectedItems = ref([]);
const items = reactive({ ids: [] });
const showModal = reactive({ show: false });

const selectHandler = (prop) => {
    items.ids = selectedItems.value.map((item) => item['id']);
};

const removeHandler = async () => {
    const response = await useLazyFetch(`${config.API_BASE_URL}/users/deleteUsers`, {
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
            title: 'Odjava',
            position: 'top-right',
            message: 'Proizvodi uspješno obrisani!',
            color: 'success',
            duration: 5000,
        });
    }
};

const addHandler = () => {
    showModal.show = true;
};

const response = await useLazyFetch(`${config.API_BASE_URL}/products`, {
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

users.userCollection = response.data.value?.data || [];
const columns = [{ key: 'id', name: 'id', label: 'ID' }] || [];
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
