<template>
    <section class="bg-grey flex w-full px-8 justify-evenly">
        <div class="">
            <h2>O nama</h2>
            <ul>
                <li><a href="#">Povijest</a></li>
                <li><a href="#">Dostava</a></li>
                <li><a href="#">Uvjeti Korištenja</a></li>
                <li><a href="#">Sustav Ocjenjivanja</a></li>
                <li><a href="#">Kontakt</a></li>
            </ul>
        </div>
        <div class="">
            <h2>Služba za korisnike</h2>
            <ul>
                <li><a href="#">Kontakt</a></li>
                <li><a href="#">Otvoreni Upit</a></li>
            </ul>
        </div>
        <div class="">
            <h2>Ne propustite nove akcije</h2>
            <div class="flex flex-col">
                <label for="">
                    Prijavite se na naš newsletter i ostanite u toku sa svim novim ponudama!</label
                >
                <va-input v-model="value">
                    <template #appendInner> <va-icon name="send" /> </template
                ></va-input>
            </div>
        </div>
    </section>
</template>

<script setup>
const value = '';
</script>
