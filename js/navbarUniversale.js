/*  Abbiamo usato VueJS universalizzare la navbar. Differisce da quell'altro perché i file PHP
    si trovano in un'altra cartella rispetto agli html e quindi hanno i link per raggiungere altre pagine diversi
*/
Vue.component('introsito', {
    template: `
            <div style="background-image:url(immagini/cielo_stelle.jpg);">
                <h1 align="center" class="titolopagina" style="font-family:starwars_v1;">STAR WARS HUB</h1>
                <h4 align="center" class="sottotitolopagina" style="font-family:starwars_v1;">Somewhere on the internet far far away</h4>
                <nav class="navbar navbar-expand-md navbar-expand-lg navbar-dark bg-dark sticky-top">
                    <!-- Brand -->
                    <a class="navbar-brand" href="#"><h5 class="navbarlogo" style="font-family:starwars_v1;">STAR WARS HUB</h5></a>
                    <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <!-- Menù -->
                        <ul class="navbar-nav ml-auto" >
                            <li id="navHome" class="nav-item">
                                <a class="nav-link" href="home.html">Homepage</a>
                            </li>
                            <li id="navStoryline" class="nav-item">
                                <a class="nav-link" href="storyline.html">Storyline</a>
                            </li>
                            <li id="navPersonaggi" class="nav-item">
                                <a class="nav-link" href="personaggi.html">Personaggi</a>
                            </li>
                            <li id="navQuiz" class="nav-item">
                            <a class="nav-link" href="quiz.html">Quiz</a>
                            </li>
                            <li id="navShop" class="nav-item">
                                <a class="nav-link" href="shop.html">Shop</a>
                            </li>
                            <li id="navUtente" class="nav-item">
                                <a class="nav-link" href="php/areaRiservata.php">Area Riservata</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div> `,
});

var app = new Vue({
    el: '#navuniv',
});