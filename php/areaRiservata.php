<!doctype html>
<html>
    <head>
        <title>STAR WARS HUB</title>
        <meta name="viewport" content="width=device−width, initial−scale=1"/></meta>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>      
        <script src="../bootstrap/js/bootstrap.min.js" type="text/javascript" lang="javascript"></script>
        <script src="../js/login-SignUp.js" type="text/javascript" lang="javascript"></script>
        <link rel="icon" href="../immagini/favicon3.png">
        <link rel="stylesheet" type="text/css" href="../css/login-SignUp.css"/>
        <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="../css/universalStandardSite.css">
        <script type="text/javascript" src="../js/vue.min.js"></script>
    </head>
   <body>
        <!--Caricamento della navbar universale per file PHP tramite VueJS-->
        <div id="navunivperphp">
            <intrositoperphp></intrositoperphp>
        </div>
        <br>
        <h3 align="center">Benvenuto nell'area utente</h3>
        <p align="center">Esegui il login al sito per accedere alle tue informazioni personali e ai dati legati al tuo account oppure, se sei un nuovo utente, registrati</p>
        <!--Per informare l'utente di un errore o di un avviso nel caso del salvataggio del
            quiz o di un acquisto, vengono inseriti i contenuti dei cookie, se esistono, come classi
            dei div sottostanti e poi tramite lo javascript collegato, si prendono provvedimenti-->
        <div class="stileMessaggio">
            <h5 id="avvisoCookieQuiz" class=" <?php if (isset($_COOKIE["cookieSalvaRisQuiz"])) { echo "salvaQuiz"; } ?> ">
            </h5>
        </div>
        <div class="stileMessaggio">
            <h5 id="avvisoCookieShop" class=" <?php if (isset($_COOKIE["cookieAcquisto"])) { echo "salvaAcquisto"; } ?> ">
            </h5>
        </div>
        <div class="stileErrore">
            <h5 id="avvisoErrore" class="<?php echo "".$_COOKIE["cookieErrore"]."";?>"></h5>
        </div>
        <div class="containerFlex">
            <!--div dedicato al login-->
            <div class="sinistraLogin stileH1 stileP" align="center">
                <img src="../immagini/avatar2.png" class="avatar">
                <h1 class="h3 mb−3 font−weight−normal">Esegui qui il Login</h1>
                <form action="login.php" method="POST" name="formLogin">
                    <p>Email</p>
                    <input type="email" name="loginEmail" placeholder="Email address" required autofocus>
                    <p>Password</p>
                    <input type="password" name="loginPassword" placeholder="Password" pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,}" required>  
                    <br>
                    <button class="btn btn-primary btn-lg" style="background-color: #cb0101; border-color: black" name="loginButton" type="Submit">Login</button>
                </form>
            </div>
            <!--div dedicato alla registrazione-->
            <div class="destraRegistrazione stileH1 stileP" align="center">
                <img src="../immagini/avatar2.png" class="avatar">
                <h1 class="h3 mb−3 font−weight−normal">Esegui qui la Registrazione</h1>
                <form action="registrazione.php" method="POST" name="formRegistrazione" onSubmit="return controllaPassword();">
                    <p>Email</p>
                    <input type="email" name="regEmail" placeholder="Email address" required autofocus>
                    <p>Nome</p>
                    <input type="text" name="regName" placeholder="Name" required autofocus>
                    <p>Cognome</p>
                    <input type="text" name="regSurname" placeholder="Surname" required autofocus>
                    <p>Password *</p>
                    <input type="password" name="regpassword" placeholder="Password" pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,}" required>
                    <p>Conferma la password *</p>
                    <input type="password" name="regconfpassword" placeholder="Conferma la password" pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,}" required>
                    <br>
                    <button class="btn btn-primary btn-lg" style="background-color: #cb0101; border-color: black" name="signUpButton" type="Submit">Sign Up</button>
                </form>
            </div>
            <p class="aspettoInfo">*In caso di registrazione, la password deve essere lunga almeno 6 caratteri e contenere almeno: una lettera maiuscola, una lettera minuscola e un valore numerico. Sono accettati anche caratteri speciali</p>
        </div>
        <!--Caricamento del footer universale per file PHP tramite VueJS-->
        <div id="perphpfooteruniv">
            <perphpendsito></perphpendsito>
        </div>
        <script type="text/javascript" src="../js/footerPerPHP.js"></script>
        <script type="text/javascript" src="../js/navbarPerPHP.js"></script>           
    </body>
</html>