<?php
    //Se uno dei cookie per le info dell'utente non è settato, va rieffettuato il login/registrazione
    if (!isset($_COOKIE["cookieEmail"]) || !isset($_COOKIE["cookieNome"]) || !isset($_COOKIE["cookieCognome"])){
        header("Location: areaRiservata.php");
    }

    //controllo se i cookie dell'ultimo ordine sono presenti per sapere cosa mostrare all'utente
    if(!isset($_COOKIE["cookieDataAcquisto"]) || !isset($_COOKIE["cookieTotaleAcquisto"])){
        $active = "";
    }
    else{
        $active = "valid";
    }
?>
<html>
    <head>
        <!-- Titolo Universale -->
        <title>STAR WARS HUB</title>
        <meta name="viewport" content="width=device−width, initial−scale=1"/></meta>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>      
        <script src="../bootstrap/js/bootstrap.min.js" type="text/javascript" lang="javascript"></script>
        <script src="../js/vue.min.js" type="text/javascript" lang="javascript"></script>
        <script src="../js/ordini.js" type="text/javascript" lang="javascript"></script>
        <link rel="icon" href="../immagini/favicon3.png">
        <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="../css/universalStandardSite.css">
    </head>
    <style>
        .container-flex {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            color: black;
        }

        hr{
            background-color:#ecd310;
        }

        /* stile degli errori */
        .stileErrore h5{
            font-size: 22px;
            text-align: center;
            color: red;
        }

        /* differenzio il colore rispetto agli errori */
        .stileErrore .okRimozione{
            font-size: 22px;
            text-align: center;
            color: green;
        }
    </style>
   <body>
        <!-- NavBar Universale -->
        <div id="navunivperphp">
            <intrositoperphp></intrositoperphp>
        </div>
        <br>
        <h3 align="center">Benvenuto nell'area ordini</h3>
        <p align="center">Da qui puoi vedere tutti i tuoi ordini</p>
        <div class="stileErrore">
            <h5 id="avvisoErrore" class="<?php echo "".$_COOKIE["cookieErrore"]."";?>"></h5>
        </div>
        <div class="container-flex">
            <div class="containerAcquisti">
                <p> 
                    <?php //Ora mostro ordini passati, se presenti
                    $dbconn = pg_connect("host=localhost port=5432 dbname=progetto user=postgres password=password")
                    or die('Could not connect:' . pg_last_error());
                    $email = $_COOKIE["cookieEmail"]; //Uso email memorizzato nei cookie per accedere al database
                    $query_acquisti="select data,totale,oggetti from ordini where email=$1";
                    $result = pg_query_params($dbconn, $query_acquisti, array($email)) or die("Query failed: ".pg_last_error());
                    echo "<ul>";
                    $button="block";
                    if($result){
                        while($line = pg_fetch_array($result, null, PGSQL_ASSOC)){ //Stampo dettagli ordini, se presenti
                            $button="none"; //Se entro nel while allora ho ordini da mostrare e non ho bisogno del bottone che rimanda al negozio
                            echo "<li> Data dell'ordine: ".$line["data"];
                            echo "<li>Articoli:<ul>";
                            $object_array = json_decode($line["oggetti"]);
                            for ($row = 0; $row < 9; $row++) {
                                if($object_array[$row][1]!="" || $object_array[$row][2]!=0){
                                    echo "<ul>";
                                    if($object_array[$row][1]!="" || $object_array[$row][2]!=0){
                                        echo "<li>".json_encode($object_array[$row][1]).", in quantità: ".json_encode($object_array[$row][2])."</li>";       
                                    }
                                echo "</ul>";
                                }
                            }
                            echo "</ul>";
                            echo "<li> Spesa totale: ".$line["totale"];
                            echo "<hr>";
                        }
                    }
                    else{
                        //problema
                        //alert utente di riprovare o simili
                        setcookie("cookieErrore", "erroreHistory", time()+3600, "/");
                        header("Location: ordini.php");    
                    }
                    echo "</ul>\n";
                    pg_free_result($result);
                    pg_close($dbconn);
                    ?>
                </p>  
            </div>
            <!-- Bottone che permmette di cancellare ultimo ordine se cookie attivo -->
            <div class="ultimoAcquisto text-center container-flex">
                <!-- Form per richiamare codice PHP -->
                <form action="cancellaOrdine.php" method="POST" name="formDeleteOrder">
                    <!-- La classe del bottone avrà o meno il valore active a seconda della presenza del cookie acquisto -->
                    <button class="btn btn-primary btn-sm btn-warning <?php echo $active; ?>" id="delOrder" name="cancellaLast" type="submit"></button>
                </form>
                <p>Se il tuo ultimo ordine non è stato ancora processato, hai la possibilità di <b>annullarlo</b>,</p>
                <p>altrimenti il corrispettivo bottone ti risulterà <b>disabilitato</b>.</p>
            </div>
            
            <!-- Bottone che rimanda al negozio se utente non ha mai effettuato acquisti -->
            <div class="containerNotAcquisti"> 
                <a href="../shop.html" class="btn btn-primary btn-sm btn-warning" style = "display:<?php echo $button; ?>" id="shop-button">Non hai ancora effettuato acquisti! Visita il nostro shop</a>
            </div>
        <br>
        </div>
        <div class="text-center">
            <a href="utente.php"> Torna alla pagina utente</a>
        </div>
        <br>
        <!-- Footer -->    
        <div id="perphpfooteruniv">
            <perphpendsito></perphpendsito>
        </div>
        <script type="text/javascript" src="../js/footerPerPHP.js"></script>
        <script type="text/javascript" src="../js/navbarPerPHP.js"></script>
   </body>
</html>