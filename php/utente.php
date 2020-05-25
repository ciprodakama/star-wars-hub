<?php
    //Se uno dei cookie per le info dell'utente non è settato, va rieffettuato il login/registrazione
    if (!isset($_COOKIE["cookieEmail"]) || !isset($_COOKIE["cookieNome"]) || !isset($_COOKIE["cookieCognome"])){
        header("Location: areaRiservata.php");
    }
?>
<html>
    <head>
        <title>STAR WARS HUB</title>
        <meta name="viewport" content="width=device−width, initial−scale=1"/></meta>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>      
        <script src="../bootstrap/js/bootstrap.min.js" type="text/javascript" lang="javascript"></script>
        <script src="../js/vue.min.js" type="text/javascript" lang="javascript"></script>
        <script src="../js/utente.js" type="text/javascript" lang="javascript"></script>
        <link rel="icon" href="../immagini/favicon3.png">
        <link rel="stylesheet" type="text/css" href="../css/utente.css"/>
        <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="../css/universalStandardSite.css">
    </head>
   <body>
        <!--Caricamento della navbar universale per file PHP tramite VueJS-->
        <div id="navunivperphp">
            <intrositoperphp></intrositoperphp>
        </div>
        <br>
        <h3 align="center">Benvenuto nell'area utente</h3>
        <p align="center">Da qui puoi vedere tutte le tue informazioni</p>
        <!--Per informare l'utente di un errore vengono inseriti i contenuti dei cookie, se esistono, come classi
            dei div sottostanti e poi tramite lo javascript collegato, si prendono provvedimenti-->
        <div class="stileErrore">
            <h5 id="avvisoErrore" class="<?php echo "".$_COOKIE["cookieErrore"]."";?>"></h5>
        </div>
        <div class="containerUtente">
            <div class="utente">
                <div class="containerdati">
                    <!--Carico i dati utente leggendo i cookie-->
                    <div>
                        <span class="valoriutente nomeutente">Nome: </span>
                        <?php echo "<p>".$_COOKIE["cookieNome"]."</p>";?>
                    </div>
                    <div>
                        <span class="valoriutente cognomeutente">Cognome: </span>
                        <?php echo "<p>".$_COOKIE["cookieCognome"]."</p>";?>
                    </div>
                    <div>
                        <span class="valoriutente emailutente">Email: </span>
                        <?php echo "<p>".$_COOKIE["cookieEmail"]."</p>";?>
                    </div>
                    <div>
                        <button id="bottoneOrdini" class="aspettoLinkQuiz btn btn-primary btn-lg" style="background-color: rgb(129, 0, 0); border-color: black">Ordini</a>
                    </div>
                    <br>
                    <div>
                        <button id="cambiaPassword" class="aspettoLinkQuiz btn btn-primary btn-lg" style="background-color: rgb(129, 0, 0); border-color: black">Cambia Password</a>
                    </div>
                    <br>
                    <div>
                        <button id="bottoneLogout" class="aspettoLinkQuiz btn btn-primary btn-lg" style="background-color: rgb(129, 0, 0); border-color: black">Logout</a>
                    </div>
                </div>
                <div class="containerRisQuiz">
                    <!--Carico le informazioni sul quiz dell'utente leggendo i cookie,
                        e tramite javascript prendo i provvedimenti adeguati-->
                    <span id="spanQuiz" class="valoriutente <?php echo "".$_COOKIE["cookieRisQuiz"]."";?>">Risultato del quiz: </span>
                    <br>
                    <div align="center" id="risQuiz" class="testoRisultato" style="font-family:starwars_v1;"></div>
                    <img id="immRisultato" class="risultatoQuiz">

                    <!--Bottone per fare il quiz nel caso in cui non sia stato fatto precedentemente-->
                    <div class="containerQuiz">
                        <button id="linkQuiz" class="btn btn-primary btn-lg" style="background-color: rgb(0, 129, 6); border-color: black; display: none">Clicca qui per andare a fare il quiz!</a>
                    </div>

                    <!--Form per cancellare il quiz nel caso in cui sia stato fatto precedentemente-->
                    <form action="cancellaQuiz.php" method="POST" name="formCancellaQuiz" onSubmit="return validaCancellaQuiz();">
                        <div class="containerQuiz stileP stileInput">
                            <p id="idScrittaCanc">Conferma la password se desideri cancellare il quiz:</p>
                            <input id="idInputCanc" type="password" name="confpassword" class="stileInput" placeholder="Conferma la password" required>  
                        </div>
                        <div class="containerQuiz">
                            <button id="idSubmit" class="aspettoBottoneCancellaQuiz btn btn-primary btn-lg" name="bottoneCancellaQuiz" type="Submit" style="background-color: rgb(0, 129, 6); border-color: black">Cliccami per cancellare il risultato del quiz</button>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
        <br>
        <!--Caricamento del footer universale per file PHP tramite VueJS-->
        <div id="perphpfooteruniv">
            <perphpendsito></perphpendsito>
        </div>
        <script type="text/javascript" src="../js/footerPerPHP.js"></script>
        <script type="text/javascript" src="../js/navbarPerPHP.js"></script>
   </body>
</html>