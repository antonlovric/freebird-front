<template>
    <div class="bg-primary pb-3 text-white text-center h-auto">
        <div class="inline-flex flex-col justify-center items-center w-full">
            <div class="h-0.5 w-full mx-auto bg-orange mb-3 sm:w-11/12" />
            <h2 class="text-2xl sm:text-6xl">Katalog</h2>
            <p class="text-xl sm:text-2xl my-8">
                Pretražite naš katalog kako biste pronašli vinil koji bi vam upotpunio kolekciju!
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
            </div>
        </div>
    </div>
</template>
