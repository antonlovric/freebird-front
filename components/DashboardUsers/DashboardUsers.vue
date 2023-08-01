<template>
    <div class="px-4">
        <div class="mx-auto max-w-[90%] overflow-x-scroll">
            <h3 class="mb-2">Korisnici</h3>
            <va-data-table
                striped
                :items="props.users"
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
                </template>
            </va-data-table>
        </div>
        <div class="ml-16 inline-flex items-center gap-4 justify-start mt-5 flex-col md:flex-row">
            <span>Šifre označenih računa: {{ items.ids.toString() }}</span>
            <va-button
                :disabled="items.ids.length === 0"
                @click="showAdminModal"
                color="warning"
                icon="admin_panel_settings"
                >Dodaj Administratorska Prava</va-button
            >
            <va-button
                :disabled="items.ids.length === 0"
                @click="showRemoveAdminModal"
                color="warning"
                icon="admin_panel_settings"
                >Oduzmi Administratorska Prava</va-button
            >
            <va-button
                :disabled="items.ids.length === 0"
                @click="showDeleteModal"
                color="danger"
                icon="delete_forever"
                >Obriši</va-button
            >
        </div>
        <delete-users-modal
            :users="items.ids"
            :isVisible="input.isModalVisible"
            :modalType="input.actionType"
            @close-modal="handleCloseModal"
            @submit-action="handleSubmitAction"
        ></delete-users-modal>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    users: Array,
    pending: Boolean,
    totalPages: Number,
    currentPage: Number,
});

const input = reactive({
    page: props.currentPage,
    totalPages: props.totalPages,
    isModalVisible: false,
    actionType: 'delete',
});

const emits = defineEmits(['change_page']);

const showAdminModal = () => {
    input.actionType = 'admin';
    input.isModalVisible = true;
};
const showRemoveAdminModal = () => {
    input.actionType = 'removeAdmin';
    input.isModalVisible = true;
};
const showDeleteModal = () => {
    input.actionType = 'delete';
    input.isModalVisible = true;
};

const { init } = useToast();
const config = useRuntimeConfig();
const userData = useUserStore();
const selectedItems = ref([]);
const items = reactive({ ids: [] });
const pagination = reactive({ currentPage: 1 });

const selectHandler = (prop) => {
    items.ids = selectedItems.value.map((item) => item['id']);
};

const removeHandler = () => {
    input.isModalVisible = true;
};

const handleCloseModal = () => {
    input.isModalVisible = false;
};

const handleSubmitAction = () => {
    actions[input.actionType]();
    items.ids = [];
    input.page = 1;
    handlePageChange();
};

const handlePageChange = async () => {
    emits('change_page', { newPage: input.page });
};

const columns =
    [
        { key: 'id', name: 'id', label: 'ID' },
        { key: 'username', name: 'username', label: 'Korisničko Ime' },
        { key: 'first_name', name: 'first_name', label: 'Ime' },
        { key: 'last_name', name: 'last_name', label: 'Prezime' },
        { key: 'email', name: 'email', label: 'E-Mail' },
        { key: 'user_type_id', name: 'user_type_id', label: 'Admin (2 - admin)' },
    ] || [];

const deleteHandler = async () => {
    const response = await useLazyFetch(`${config.public.API_BASE_URL}/users/deleteUsers`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            ids: items.ids,
        },
        async onResponseError({ response }) {
            init({
                title: 'Brisanje Korisnika',
                position: 'bottom-right',
                message: 'Greška prilikom brisanja!',
                color: 'danger',
                duration: 5000,
            });
        },
        initialCache: false,
    });
    if (!response.error?.value) {
        init({
            title: 'Brisanje Korisnika',
            position: 'bottom-right',
            message: 'Korisnici uspješno obrisani!',
            color: 'success',
            duration: 5000,
        });
    }
};

const adminHandler = async () => {
    const response = await useLazyFetch(`${config.public.API_BASE_URL}/users/makeAdmin`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            ids: items.ids,
        },
        async onResponseError({ response }) {
            init({
                title: 'Kreiranje Admina',
                position: 'bottom-right',
                message: 'Greška prilikom kreiranja admina!',
                color: 'danger',
                duration: 5000,
            });
        },
        initialCache: false,
    });
    if (!response.error?.value) {
        init({
            title: 'Kreiranje Admina',
            position: 'bottom-right',
            message: 'Uspješno dodijeljena administratorska prava!',
            color: 'success',
            duration: 5000,
        });
    }
};
const removeAdminHandler = async () => {
    const response = await useLazyFetch(`${config.public.API_BASE_URL}/users/removeAdmin`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            ids: items.ids,
        },
        async onResponseError({ response }) {
            init({
                title: 'Brisanje Admina',
                position: 'bottom-right',
                message: 'Greška prilikom kreiranja admina!',
                color: 'danger',
                duration: 5000,
            });
        },
        initialCache: false,
    });
    if (!response.error?.value === 204) {
        init({
            title: 'Kreiranje Admina',
            position: 'bottom-right',
            message: 'Uspješno oduzeta administratorska prava!',
            color: 'success',
            duration: 5000,
        });
    }
};

const actions = { delete: deleteHandler, admin: adminHandler, removeAdmin: removeAdminHandler };
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
