<template>
    <div class="min-h-[80vh] pt-[10vh] relative">
        <h1 class="text-3xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">Profil</h1>
        <div class="w-5/6 mx-auto mb-10">
            <div class="inline-flex w-full gap-10 justify-center items-center">
                <h2 class="text-center text-2xl">{{ data.username }}</h2>
                <nuxt-link v-if="userData.type === 2" to="/dashboard" class="cursor-pointer"
                    ><va-chip>Upravljačka Ploča</va-chip></nuxt-link
                >
            </div>
            <div class="inline-flex justify-center flex-col mt-9 sm:mt-0 sm:flex-row gap-10">
                <div class="inline-flex flex-col gap-5">
                    <h3 class="mb-4 text-xl">Osobni Podaci</h3>
                    <va-input label="Ime" v-model="personalData.firstName" />
                    <va-input label="Prezime" v-model="personalData.lastName" />
                    <va-input label="Telefon" v-model="personalData.phone" />
                    <va-input label="Država" v-model="personalData.country" />
                    <va-input label="Grad" v-model="personalData.city" />
                    <va-input label="Poštanski Broj" v-model="personalData.zipcode" />
                    <va-button :disabled="personalData.isChanged" @click="handleDetailsChange"
                        >Promijeni detalje</va-button
                    >
                </div>
                <div>
                    <h3 class="mb-4 text-xl">Narudžbe</h3>
                    <va-data-table :columns="columns" striped :items="data.orders"></va-data-table>
                </div>
            </div>
            <va-data-table
                striped
                :items="props.orderedProducts"
                :columns="productColumns"
                clickable
                selectable
                select-mode="single"
                @row:click="handleRowClick"
            >
                <template #cell(image)="{ value }"
                    ><img style="height: 100px" :src="value"
                /></template>
            </va-data-table>
        </div>
        <va-modal hide-default-actions blur v-model="modal.isVisible">
            <template #header>
                <h2>Recenzija proizvoda {{ modal.productTitle }}</h2>
            </template>
            <div class="inline-flex justify-center items-center">
                <span>Ocjena: </span>
                <va-rating v-model="modal.rating" />
            </div>
            <h3>Recenzija:</h3>
            <va-input type="textarea" :min-rows="5" v-model="modal.review" />
            <template #footer>
                <div class="inline-flex justify-center items-center gap-5">
                    <va-button @click="handleReview"> Pošalji </va-button>
                    <va-button @click="() => (modal.isVisible = false)"> Odustani </va-button>
                </div>
            </template>
        </va-modal>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user';

const props = defineProps({
    personalDetails: Object,
    pending: Boolean,
    orderedProducts: Array,
});
const { data } = props.personalDetails;
const modal = reactive({
    isVisible: false,
    productTitle: '',
    productId: null,
    rating: 0,
    review: '',
});
const userData = useUserStore();
const { init } = useToast();
const config = useRuntimeConfig();

const personalData = reactive({
    firstName: data.first_name,
    lastName: data.last_name,
    city: data.city,
    country: data.country,
    zipcode: data.zipcode,
    phone: data.phone,
    isChanged: true,
});

const isDataChanged = () => {
    return (
        personalData.firstName === data.first_name &&
        personalData.lastName === data.last_name &&
        personalData.city === data.city &&
        personalData.country === data.country &&
        personalData.zipcode === data.zipcode &&
        personalData.phone === data.phone
    );
};

watch(personalData, (newValue, oldValue) => {
    personalData.isChanged = isDataChanged();
});

const columns = [
    { key: 'id', name: 'id', label: 'Šifra' },
    { key: 'total', name: 'total', label: 'Ukupna Cijena (kn)' },
    { key: 'order_status.name', name: 'order_status.name', label: 'Status' },
];

const productColumns = [
    { key: 'id', name: 'id', label: 'Šifra' },
    { key: 'title', name: 'title', label: 'Naziv' },
    { key: 'url', name: 'image', label: 'Slika' },
];

const handleDetailsChange = () => {
    useFetch(`${config.API_BASE_URL}/users/${userData.session_id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            first_name: personalData.firstName,
            last_name: personalData.lastName,
            city: personalData.city,
            country: personalData.country,
            zipcode: personalData.zipcode,
            phone: personalData.phone,
        },
        async onResponse({ response }) {
            if (response.status === 200) {
                init({
                    title: 'Izmjenjivanje osobnih podataka',
                    position: 'top-right',
                    color: 'success',
                    message: 'Podaci uspješno izmijenjeni!',
                });
            }
        },
    });
};

const handleRowClick = (args) => {
    const product = args.item;
    modal.isVisible = true;
    modal.productId = args.item.id;
    modal.productTitle = args.item.title;
};

const handleReview = () => {
    console.log(modal);
    useFetch(`${config.API_BASE_URL}/productReviews`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userData.token}`,
        },
        body: {
            product_id: modal.productId,
            session_id: userData.session_id,
            review: modal.review,
            rating: modal.rating,
        },
        async onResponse({ response }) {
            if (response.status === 201) {
                init({
                    title: 'Ocjenjivanje proizvoda',
                    position: 'top-right',
                    color: 'success',
                    message: 'Proizvod uspješno ocijenjen!',
                });
            }
            modal.isVisible = false;
        },
        initialCache: false,
    });
};
</script>
