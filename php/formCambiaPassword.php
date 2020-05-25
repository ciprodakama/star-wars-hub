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
        <script src="../js/formCambiaPassword.js" type="text/javascript" lang="javascript"></script>
        <link rel="stylesheet" type="text/css" href="../css/formCambiaPassword.css"/>
        <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="../css/universalStandardSite.css">
        <link rel="icon" href="../immagini/favicon3.png">
    </head>
   <body>
        <!--Caricamento della navbar universale per file PHP tramite VueJS-->
        <div id="navunivperphp">
            <intrositoperphp></intrositoperphp>
        </div>
        <br>
        <h3 align="center">Cambia Password</h3>
        <p align="center">Conferma le vecchie credenziale e inserisci quelle nuove per cambiare password</p>
        <div class="stileErrore">
            <h5 id="avvisoErrore" class="<?php echo "".$_COOKIE["cookieErrore"]."";?>"></h5>
        </div>
        <div class="containerFlex">
            <div class="containerChangePassword stileP" align="center">
                <img src="../immagini/avatar2.png" class="avatar">
                <form action="changePassword.php" method="POST" name="formChangePassword" onSubmit="return validaChange();">
                    <br>
                    <p>Email: <?php echo "".$_COOKIE["cookieEmail"]."";?></p>
                    <br>
                    <p>Inserisci la vecchia password</p>
                    <input type="password" name="vecchiapassword" placeholder="Vecchia password" pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,}" required>  
                    <p>Inserisci la nuova password *</p>
                    <input type="password" name="nuovapassword" placeholder="Nuova password" pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,}" required>  
                    <p>Conferma la nuova password *</p>
                    <input type="password" name="confermapassword" placeholder="Conferma nuova password" pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,}" required>  
                    <br>
                    <button class="btn btn-primary btn-lg" style="background-color: #cb0101; border-color: black" name="changeButton" type="Submit">Cambia Password</button>
                </form>
            </div>
            <p class="aspettoInfo">* La password deve essere lunga almeno 6 caratteri e contenere almeno: una lettera maiuscola, una lettera minuscola e un valore numerico. Sono accettati anche caratteri speciali</p>
        </div>
        <div class="text-center">
            <a href="utente.php">Torna alla pagina utente</a>
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