<template>
    <div>
        <the-header />
        <div class="w-10/12 min-h-[80vh] mx-auto pt-[10vh]">
            <h1 class="text-3xl mb-4 sm:mb-0 sm:text-5xl sm:mt-4 text-center">Uvjeti Korištenja</h1>
            <p>
                Na stranicama www.freebird.hr nije moguća direktna kupovina (plaćanje), svaka
                narudžba prolazi provjeru stanja jer je moguća prodaja proizvoda u dućanu u
                Tratinskoj 50.
            </p>
            <h2>Tijek narudžbe</h2>
            <ol>
                <li>Kupac odabire proizvode stavljanjem u košaricu</li>
                <li>Kupac upisuje podatke (ime, prezime, adresa, ...)</li>
                <li>Kupac bira način plaćanja (bankovna transakcija, paypal ili pouzeće)</li>
                <li>Kupac bira način dostave (poštom ili preuzimanje u dućanu)</li>
                <li>Kupac potvrđuje narudžbu</li>
                <li>Freebird zaprima narudžbu i provjerava stanje</li>
                <li>Freebird šalje ponudu sa ukupnom cijenom dostupnih proizvoda</li>
                <li>Kupac potvrđuje da se slaže sa ponudom</li>
                <li>Freebird šalje uputu za plaćanje</li>
                <li>Freebird šalje proizvode nakon zaprimljene uplate ili odmah šalje pouzećem</li>
            </ol>
            <h2>Napomene</h2>
            <ul>
                <li>proizvodi se šalju putem HP-a ili GLS-a</li>
            </ul>
        </div>
        <the-footer />
    </div>
</template>

<style scoped>
p {
    font-size: 20px;
    text-align: justify;
    margin: 20px auto;
}

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
