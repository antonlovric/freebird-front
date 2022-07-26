<template>
    <div class="ml-4 font-sans inline-flex justify-center relative w-11/12 text-center">
        <div class="sm:pt-[20vh] inline-flex justify-center flex-col text-left gap-8 mb-20">
            <div class="inline-flex flex-col sm:flex-row w-full justify-center gap-8">
                <div class="w-[400px] h-[400px] hidden sm:block">
                    <img class="w-[400px] h-[400px] object-cover" :src="props.product.url" />
                </div>
                <div class="inline-flex sm:text-lg flex-col justify-between">
                    <div>
                        <h1 class="text-[2rem] sm:w-[20ch] sm:text-5xl">
                            {{ props.product.title }}
                        </h1>
                        <span class=""
                            >Dostupnost:
                            <span class="text-green-500" v-if="isInStock">Ima na zalihi</span>
                            <span class="text-red-600" v-else>Nedostupno</span>
                        </span>
                        <va-rating color="#f97316" v-model="props.product.rating" />
                    </div>
                    <div class="w-[200px] h-[200px] my-4 sm:hidden">
                        <img class="w-[200px] h-[200px] object-cover" :src="props.product.url" />
                    </div>
                    <ul class="inline-flex flex-col gap-0.5 text-xl">
                        <li>Format: {{ props.product.product_type?.name }}</li>
                        <li>Stanje Omota: {{ props.product.sleeve_condition?.name }}</li>
                        <li>Stanje Medija: {{ props.product.media_condition?.name }}</li>
                        <li>Izdanje: {{ props.product.edition }}</li>
                        <li>
                            Cijena:
                            <span class="font-semibold">{{ props.product.initial_price }}kn</span>
                        </li>
                    </ul>
                    <div class="">
                        <va-button
                            class="mt-3"
                            size="large"
                            color="#f97316"
                            text-color="#fff"
                            icon-right="shopping_cart"
                            >Dodaj u košaricu</va-button
                        >
                    </div>
                </div>
            </div>
            <div class="inline-flex flex-col">
                <h2 class="sm:text-4xl">Opis</h2>
                <div class="h-0.5 mb-2 mt-1 w-full bg-orange sm:w-24" />
                <p class="text-xl">{{ props.product.description }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    product: Object,
});
const isInStock = props.product.stock > 0;
</script>
