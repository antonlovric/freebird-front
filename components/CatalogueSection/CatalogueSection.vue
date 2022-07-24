<template>
    <div class="bg-primary text-center">
        <div class="inline-flex flex-col justify-center items-center w-full">
            <div class="mb-24 h-0.5 w-full mx-auto bg-orange sm:w-11/12" />
            <div class="relative">
                <h2 class="text-2xl mb-4 sm:mb-0 sm:text-6xl">Katalog</h2>
                <va-button
                    class="sm:mt-0 sm:!absolute sm:top-0 sm:translate-y-1/2 sm:right-0"
                    text-color="#fff"
                    color="#f97316"
                    >Katalog &rarr;</va-button
                >
                <p class="text-xl sm:text-2xl my-8">
                    Pregledajte artikle u našem katalogu i obogatite svoju kolekciju!
                </p>
                <div class="mt-10 inline-flex flex-col justify-center gap-14 sm:flex-row">
                    <product-showcase-card
                        imageSource="https://upload.wikimedia.org/wikipedia/en/a/ac/Acdc_Highway_to_Hell.JPG"
                    />
                    <product-showcase-card
                        imageSource="https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg"
                    />
                    <product-showcase-card
                        imageSource="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png"
                    />
                    <product-showcase-card
                        imageSource="https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg"
                    />
                </div>
                <div class="w-11/12 mx-auto my-12 flex flex-col sm:flex-row justify-center gap-8">
                    <store-feature
                        icon="payments"
                        iconColor="#fff"
                        text="Različiti načini plaćanja"
                    />
                    <store-feature
                        icon="local_shipping"
                        iconColor="#C5E7E2"
                        text="Besplatna poštarina za narudžbe više od 500kn"
                    />
                    <store-feature
                        icon="verified_user"
                        iconColor="#f97316"
                        text="Sigurno plaćanje"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.va-card {
    box-shadow: unset;
}
</style>
