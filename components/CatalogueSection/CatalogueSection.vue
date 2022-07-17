<template>
    <div class="bg-primary text-white text-center">
        <div class="inline-flex flex-col justify-center items-center w-full">
            <div class="mb-24 h-0.5 w-full mx-auto bg-orange sm:w-11/12" />
            <h2 class="text-2xl sm:text-6xl">Katalog</h2>
            <p class="text-xl sm:text-2xl my-8">
                Pregledajte artikle u našem katalogu i obogatite svoju kolekciju!
            </p>
            <div class="mt-10 inline-flex flex-col justify-center gap-14 sm:flex-row">
                <product-card
                    imageSource="https://upload.wikimedia.org/wikipedia/en/a/ac/Acdc_Highway_to_Hell.JPG"
                />
                <product-card
                    imageSource="https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg"
                />
                <product-card
                    imageSource="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png"
                />
                <product-card
                    imageSource="https://upload.wikimedia.org/wikipedia/en/8/84/MarvinGayeWhat%27sGoingOnalbumcover.jpg"
                />
            </div>
            <div class="w-11/12 my-12 flex flex-col sm:flex-row justify-center gap-8">
                <store-feature icon="payments" iconColor="#fff" text="Različiti načini plaćanja" />
                <store-feature
                    icon="local_shipping"
                    iconColor="#C5E7E2"
                    text="Besplatna poštarina za narudžbe više od 500kn"
                />
                <store-feature icon="verified_user" iconColor="#f97316" text="Sigurno plaćanje" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.va-card {
    box-shadow: unset;
}
</style>
