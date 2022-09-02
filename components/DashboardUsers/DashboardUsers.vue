<template>
    <div class="px-4">
        <div class="mx-auto max-w-[90%] overflow-x-scroll">
            <h3 class="mb-2">Korisnici</h3>
            <va-data-table
                class=""
                striped
                :items="users?.data"
                :columns="columns"
                selectable
                v-model="selectedItems"
                @selection-change="selectHandler"
                select-mode="multiple"
                :loading="pending"
            >
            </va-data-table>
        </div>
        <div class="ml-16 inline-flex items-center gap-4 justify-start mt-5">
            <span>Šifre označenih računa: {{ items.ids.toString() }}</span>
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
    pending,
    data: users,
    refresh,
} = useFetch(`${config.API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${userData.token}`,
    },
    initialCache: false,
    lazy: true,
});

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
            init({
                title: 'Odjava',
                position: 'bottom-right',
                message: 'Greška prilikom brisanja!',
                color: 'danger',
                duration: 5000,
            });
        },
    });
    if (response.status === 204) {
        refresh();
        init({
            title: 'Odjava',
            position: 'bottom-right',
            message: 'Korisnici uspješno obrisani!',
            color: 'success',
            duration: 5000,
        });
    }
};

const columns =
    [
        { key: 'id', name: 'id', label: 'ID' },
        { key: 'username', name: 'username', label: 'Korisničko Ime' },
        { key: 'first_name', name: 'first_name', label: 'Ime' },
        { key: 'last_name', name: 'last_name', label: 'Prezime' },
        { key: 'email', name: 'email', label: 'E-Mail' },
    ] || [];
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
