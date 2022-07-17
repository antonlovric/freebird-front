<template>
    <ul
        class="inline-flex flex-row items-center justify-center w-full px-4 bg-transparent absolute top-3 z-10"
    >
        <div class="flex items-center justify-around w-1/3">
            <navigation-item class="inline-flex justify-start" text="Naslovnica" />
            <navigation-item class="inline-flex justify-start" path="/about" text="Katalog" />
            <navigation-item class="inline-flex justify-start" path="/posts" text="Novosti" />
        </div>
        <img src="../../assets/logo_transparent 2.png" alt="Freebird logo" />
        <div class="flex items-center justify-end w-1/3">
            <navigation-item
                class="inline-flex justify-end"
                path="/registration"
                text="Registracija"
            />
            <navigation-item class="inline-flex justify-end" path="/login" text="Prijava" />
            <navigation-item class="inline-flex justify-end" icon icon-name="shopping_cart" />
        </div>
    </ul>
</template>
