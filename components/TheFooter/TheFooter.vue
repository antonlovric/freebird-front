<template>
    <section
        class="bg-grey flex flex-col sm:flex-row px-8 sm:gap-32 justify-start py-8 w-full text-black"
    >
        <div class="">
            <h2>O nama</h2>
            <ul class="flex flex-col mb-4 mt-2 gap-2">
                <li><a href="#">Povijest</a></li>
                <li><a href="#">Dostava</a></li>
                <li><a href="#">Uvjeti Korištenja</a></li>
                <li><a href="#">Sustav Ocjenjivanja</a></li>
            </ul>
        </div>
        <div class="">
            <h2>Služba za korisnike</h2>
            <ul class="flex flex-col mb-4 mt-2 gap-2">
                <li><a href="#">Kontakt</a></li>
                <li><a href="#">Otvoreni Upit</a></li>
            </ul>
        </div>
        <div>
            <h2>Ne propustite nove akcije</h2>
            <div class="flex flex-col gap-3">
                <label class="mt-3" for="newsletter">
                    Prijavite se na naš newsletter i ostanite u toku sa svim novim ponudama!</label
                >
                <va-input
                    inputmode="email"
                    id="newsletter"
                    class="max-w-[30ch] sm:max-w-[30ch]"
                    v-model="input.email"
                    @click-append-inner="handleNewsletter"
                >
                    <template #appendInner> <va-icon name="send" /></template
                ></va-input>
            </div>
        </div>
    </section>
</template>

<script setup>
const input = reactive({ email: '' });
const config = useRuntimeConfig();
const { init } = useToast();

const handleNewsletter = () => {
    const responseNewsletter = useFetch(`${config.API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        body: {
            email: input.email,
        },
        initialCache: false,
        async onResponseError({ response }) {
            init({
                title: 'Prijavlijvanje na newsletter',
                position: 'top-right',
                color: 'danger',
                message: 'Greška prilikom prijavljivanja na newsletter!',
            });
        },
        async onResponse({ request, response, options }) {
            if (response.status === 200) {
                init({
                    title: 'Prijavlijvanje na newsletter',
                    position: 'top-right',
                    color: 'success',
                    message: 'Uspješno ste prijavljeni na FreeBirdMusic newsletter!',
                });
            }
        },
    });
};
</script>

<style scoped>
a {
    font-size: 20px;
    position: relative;
    display: inline-block;
}

h2 {
    position: relative;
    display: inline-block;
}

h2::after {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -5px;
    width: 90%;
    background: #f97316;
    left: 0;
}

a::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #f97316;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

a:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

h2 {
    font-size: 24px;
    margin-bottom: 0.5rem;
}
</style>
