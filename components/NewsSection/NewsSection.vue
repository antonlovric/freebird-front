<template>
    <section class="bg-primary text-white text-center">
        <div class="my-24 mb-14 h-0.5 w-full mx-auto bg-orange sm:w-11/12" />
        <div class="relative">
            <h2 class="text-2xl mb-4 sm:mb-0 sm:text-6xl">Novosti</h2>
            <va-button
                class="sm:mt-0 sm:!absolute sm:top-0 sm:translate-y-1/2 sm:right-40"
                text-color="#fff"
                color="#f97316"
                >Sve Novosti &rarr;</va-button
            >
            <h3 class="mt-4 text-l sm:text-3xl">
                Budite u toku sa svim obavijestima u FreeBird Music Shopu
            </h3>
            <div
                class="gap-7 mx-auto grid grid-cols-1 grid-rows-3 my-5 sm:grid-rows-1 sm:grid-cols-3 w-9/12"
            >
                <post-component
                    postTitle="NOVI LP LOTOVI U FREE BIRDU!"
                    postDescription="Ovo je opis objave na free bird blogu."
                    image="https://freebird.hr/image/cache/catalog/blog/20220716/20220716_1A-1060x400w.webp"
                />
                <post-component
                    postTitle="NOVI LP LOTOVI U FREE BIRDU!"
                    postDescription="Ovo je opis objave na free bird blogu."
                    image="https://freebird.hr/image/cache/catalog/blog/20220716/20220716_1A-1060x400w.webp"
                />
                <post-component
                    postTitle="NOVI LP LOTOVI U FREE BIRDU!"
                    postDescription="Ovo je opis objave na free bird blogu."
                    image="https://freebird.hr/image/cache/catalog/blog/20220716/20220716_1A-1060x400w.webp"
                />
            </div>
        </div>
    </section>
</template>
