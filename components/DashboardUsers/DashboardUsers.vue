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
        <delete-users-modal
            :users="items.ids"
            :isVisible="input.isModalVisible"
            @close-modal="handleCloseModal"
            @deleted-users="handleDeletedUsers"
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
});

const emits = defineEmits(['change_page']);

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

const handleDeletedUsers = () => {
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
    ] || [];
</script>

<style>
div {
    --va-data-table-thead-color: #fff;
}
</style>
