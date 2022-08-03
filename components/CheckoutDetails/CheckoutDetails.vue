<template>
    <div class="w-full sm:w-10/12 inline-flex flex-col items-center justify-center">
        <div class="inline-flex flex-col justify-center items-center">
            <h2 class="mb-3">Osobni Podaci</h2>
            <div class="inline-flex flex-col justify-center items-center gap-5">
                <va-input required v-model="order.personalDetails.firstName" label="Ime*" />
                <va-input v-model="order.personalDetails.lastName" label="prezime*" />
                <va-input v-model="order.personalDetails.email" label="email*" />
                <va-input v-model="order.personalDetails.phone" label="Telefon" />
            </div>
        </div>
        <div class="mt-5 inline-flex flex-col sm:flex-row gap-5">
            <div class="mt-5 sm:w-[300px] inline-flex flex-col">
                <h2 class="mb-3">Podaci o dostavi</h2>
                <va-select
                    v-model="order.paymentDetails.selectedShipping"
                    class="block w-full mb-4"
                    label="Način Dostave"
                    :options="order.paymentDetails.shippingType"
                    text-by="label"
                    track-by="id"
                />
                <va-select
                    v-model="order.paymentDetails.selectedPayment"
                    class="block w-full"
                    label="Način Plaćanja"
                    :options="order.paymentDetails.paymentType"
                    text-by="label"
                    track-by="id"
                />
            </div>
            <div class="mt-5 sm:w-[300px] inline-flex flex-col">
                <h2 class="mb-3">Podaci o plaćanju</h2>
                <va-select
                    v-model="order.paymentDetails.selectedShipping"
                    class="block w-full mb-4"
                    label="Način Dostave"
                    :options="order.paymentDetails.shippingType"
                    text-by="label"
                    track-by="id"
                />
                <va-select
                    v-model="order.paymentDetails.selectedPayment"
                    class="block w-full"
                    label="Način Plaćanja"
                    :options="order.paymentDetails.paymentType"
                    text-by="label"
                    track-by="id"
                />
                <va-input
                    class="mt-4 w-full"
                    v-model="order.paymentDetails.comment"
                    type="textarea"
                    label="Napomena"
                />
            </div>
        </div>
        <div class="mt-5 inline-flex flex-col sm:flex-row">
            <div class="inline-flex flex-col gap-5">
                <h2>Adresa za naplatu</h2>
                <div class="inline-flex mr-4 flex-col gap-5">
                    <va-input v-model="order.billingAddress.address" label="Adresa" />
                    <va-input v-model="order.billingAddress.city" label="Grad" />
                    <va-input v-model="order.billingAddress.zipCode" label="poštanski broj" />
                    <va-input v-model="order.billingAddress.country" label="država" />
                    <va-checkbox
                        v-model="order.sameAddress"
                        label="Adresa za dostavu je jednaka adresi za naplatu"
                    />
                </div>
            </div>
            <div v-if="!order.sameAddress" class="inline-flex flex-col gap-5">
                <h2 class="">Adresa za dostavu</h2>
                <div class="inline-flex mr-4 flex-col gap-5">
                    <va-input v-model="order.shippingAddress.address" label="Adresa" />
                    <va-input v-model="order.shippingAddress.city" label="Grad" />
                    <va-input v-model="order.shippingAddress.zipCode" label="poštanski broj" />
                    <va-input v-model="order.shippingAddress.country" label="država" />
                </div>
            </div>
        </div>
        <div class="inline-flex flex-col sm:flex-row mt-5 px-10 gap-5 w-full">
            <va-checkbox
                :error="!order.privacy"
                v-model="order.privacy"
                label="Prihvaćam FreeBird politiku privatnosti"
            />
            <va-checkbox
                :error="!order.terms"
                v-model="order.terms"
                label="Prihvaćam FreeBird uvjete korištenja"
            />
            <va-checkbox
                v-model="order.newsletter"
                label="Želim se prijaviti na FreeBird newsletter"
            />
        </div>
        <va-button @click="handleCheckout" text-color="#fff" class="mt-5" size="large"
            >Potvrda plaćanja</va-button
        >
    </div>
</template>

<script setup>
const { init } = useToast();
const config = useRuntimeConfig();
const props = defineProps({
    details: Object,
});
const emits = defineEmits(['checkout']);
const order = reactive({
    personalDetails: {
        firstName: props.details.first_name,
        lastName: props.details.last_name,
        email: props.details.email,
        phone: props.details.phone,
    },
    paymentDetails: {
        shippingType: [
            {
                id: 1,
                label: 'Dostava GLS',
            },
            {
                id: 2,
                label: 'Preuzimanje u poslovnici',
            },
        ],
        paymentType: [
            {
                id: 1,
                label: 'Plaćanje pouzećem',
            },
            {
                id: 2,
                label: 'Plaćanje uplatnicom (virman)',
            },
            {
                id: 3,
                label: 'Paypal',
            },
        ],
        selectedShipping: {
            id: 1,
            label: 'Preuzimanje u poslovnici',
        },
        selectedPayment: {
            id: 1,
            label: 'Plaćanje pouzećem',
        },
        comment: '',
    },
    billingAddress: {
        address: '',
        city: '',
        zipCode: '',
        country: '',
    },
    shippingAddress: {
        address: '',
        city: '',
        zipCode: '',
        country: '',
    },
    privacy: false,
    sameAddress: true,
    terms: false,
    newsletter: false,
});

const handleCheckout = () => {
    emits('checkout', order);
};
</script>
