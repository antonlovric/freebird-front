<template>
    <div>
        <the-header />
        <div class="w-10/12 min-h-[80vh] mx-auto pt-[10vh]">
            <h1 class="text-3xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">Kontakt</h1>
            <div class="inline-flex w-2/3 justify-around items-center gap-8">
                <div class="inline-flex flex-col justify-center items-center">
                    <va-icon color="#ed6c02" size="4rem" name="location_on" />
                    <h3>Adresa Dućana</h3>
                    TRATINSKA 50, 10000 Zagreb, Hrvatska
                </div>
                <div class="inline-flex flex-col justify-center items-center">
                    <va-icon color="#ed6c02" size="4rem" name="smartphone" />
                    <h3>Nazovite nas</h3>
                    <a href="tel:+385-1-3821-870">+385-1-3821-870</a>
                </div>
                <div class="inline-flex flex-col justify-center items-center">
                    <va-icon color="#ed6c02" size="4rem" name="watch" />
                    <h3>Radno vrijeme</h3>
                    <p>Pon-Pet: 08:30 - 20:30</p>
                    <p>Sub: 08:30 - 15:00</p>
                </div>
            </div>
            <div class="w-full mt-10">
                <h2>POŠALJITE NAM PORUKU</h2>
                <div class="h-0.5 mb-12 mt-1 w-full bg-orange md:w-24" />
                <form class="flex flex-col w-10/12 mx-auto gap-6 mb-5">
                    <va-input class="w-2/6" type="text" label="ime" v-model="openRequest.name" />
                    <va-input class="w-2/6" type="text" label="email" v-model="openRequest.email" />
                    <va-input
                        type="textarea"
                        :min-rows="7"
                        :min-cols="35"
                        label="Upit"
                        v-model="openRequest.request"
                    />
                    <va-button @click="submitHandler">Pošalji</va-button>
                </form>
            </div>
        </div>

        <the-footer />
    </div>
</template>

<script setup>
const openRequest = reactive({ name: '', email: '', request: '' });
const config = useRuntimeConfig();
const { init } = useToast();
const submitHandler = () => {
    const response = useFetch(`${config.API_BASE_URL}/openRequests`, {
        method: 'POST',
        body: {
            name: openRequest.name,
            email: openRequest.email,
            request: openRequest.request,
        },
        onResponse({ response }) {
            if (response.status === 201) {
                init({
                    title: 'Slanje Upita',
                    position: 'bottom-right',
                    message: 'Uspješno slanje upita!',
                    color: 'success',
                    duration: 5000,
                });
            }
        },
        onResponseError({ response }) {
            init({
                title: 'Slanje Upita',
                position: 'bottom-right',
                message: 'Neuspješno slanje upita!',
                color: 'danger',
                duration: 5000,
            });
        },
        initialCache: false,
    });
};

useHead({
    title: 'Kontakt',
});
</script>

<style scoped>
ul li {
    font-size: 20px;
    margin: 10px auto;
    margin-left: 20px;
    list-style: outside;
}

ol li {
    font-size: 20px;
    margin: 10px auto;
    margin-left: 20px;
    list-style: decimal;
}
</style>
