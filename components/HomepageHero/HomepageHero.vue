<template>
    <div
        class="homepage-hero-container relative h-[100vh] w-[100vw] flex justify-center items-center flex-col"
    >
        <Head>
            <Link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin
            /></Link>
            <Link
                href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap"
                rel="stylesheet"
            />
        </Head>
        <div
            class="inline-flex gap-3 flex-col justify-center items-center text-center w-full h-full mt-auto"
        >
            <h1 class="text-white px-3 text-4xl sm:text-6xl">Free Bird Music shop</h1>
            <h2 class="text-white px-3 text-2xl sm:text-3xl">Najveći glazbeni dućan u Hrvatskoj</h2>
        </div>
        <img
            src="../../assets/HeroSplashImage.png"
            class="object-cover absolute w-full h-full brightness-50 top-0 -z-10"
            alt=""
        />
        <div class="arrow down"></div>
    </div>
</template>

<script setup></script>

<style scoped>
h1 {
    font-family: 'Roboto Mono', monospace;
}

.arrow {
    width: 100px;
    height: 100px;
    margin: 20px;
    display: inline-block;
    position: relative;
}

.arrow::before {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    border-style: solid;
    border-color: #fff;
    border-width: 2px 2px 0 0;
    position: absolute;
    transform-origin: 50% 50%;
}

.down::before {
    transform: rotate(135deg);
    margin: -20px 0 0 -15px;
}
</style>
