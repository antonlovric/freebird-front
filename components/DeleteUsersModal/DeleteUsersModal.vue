<template>
    <va-modal hide-default-actions blur v-model="props.isVisible">
        <template #header>
            <h3 class="text-2xl mb-4 sm:mb-0 sm:text-4xl sm:mt-4 text-center">
                {{ heading[props.modalType] }}
            </h3>
        </template>
        <p v-if="props.modalType === 'delete'">
            Sigurno želite obrisati korisnike: {{ props.users.toString() }}? Ova akcija je
            neizmjenjiva.
        </p>
        <p v-else-if="props.modalType === 'admin'">
            Dodjeljivanje administratorskih prava korisnicima: {{ props.users.toString() }}.
        </p>
        <p v-else-if="props.modalType === 'removeAdmin'">
            Oduzimanje administratorskih prava korisnicima: {{ props.users.toString() }}.
        </p>
        <template #footer>
            <div class="inline-flex justify-center items-center gap-5">
                <va-button @click="closeHandler">Odustani</va-button>
                <va-button @click="submitHandler">{{ heading[props.modalType] }}</va-button>
            </div>
        </template>
    </va-modal>
</template>

<script setup>
const heading = { delete: 'Obriši Korisnika', admin: 'Dodaj Admina', removeAdmin: 'Ukloni Admina' };

const props = defineProps({
    users: Array,
    isVisible: Boolean,
    modalType: {
        type: String,
        default: 'delete',
    },
});

const emits = defineEmits(['close-modal', 'submit-action']);

const closeHandler = () => {
    emits('close-modal');
};

const submitHandler = () => {
    emits('submit-action');
};
</script>
