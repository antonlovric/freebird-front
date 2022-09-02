<template>
    <va-modal hide-default-actions blur v-model="props.isVisible">
        <template #header>
            <h3 class="text-2xl mb-4 sm:mb-0 sm:text-4xl sm:mt-4 text-center">
                Brisanje Korisnika
            </h3>
        </template>
        <p>
            Sigurno želite obrisati korisnike: {{ props.users.toString() }}? Ova akcija je
            neizmjenjiva.
        </p>
        <template #footer>
            <div class="inline-flex justify-center items-center gap-5">
                <va-button @click="closeHandler">Odustani</va-button>
                <va-button @click="deleteHandler">Obriši</va-button>
            </div>
        </template>
    </va-modal>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    users: Array,
    isVisible: Boolean,
});

const config = useRuntimeConfig();
const userData = useUserStore();
const { init } = useToast();

const emits = defineEmits(['close-modal', 'deleted-users']);

const modal = reactive({
    isVisible: props.isVisible,
});

const closeHandler = () => {
    emits('close-modal');
};

const deleteHandler = async () => {
    const response = await useLazyFetch(`${config.API_BASE_URL}/users/deleteUsers`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            ids: props.users,
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
    });
    if (response.data?.value?.status === 204) {
        init({
            title: 'Brisanje Korisnika',
            position: 'bottom-right',
            message: 'Korisnici uspješno obrisani!',
            color: 'success',
            duration: 5000,
        });
        emits('deleted-users');
    }
};
</script>
