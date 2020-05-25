<?php
    $dbconn = pg_connect("host=localhost port=5432 dbname=progetto user=postgres password=password")
    or die('Could not connect:' . pg_last_error());
    
    //Controllo che io provenga dal bottone di cancellazione ultimo ordine
    if(!(isset($_POST['cancellaLast']))){
        //Se falso, rimando l'utente alla pagina ordini
        header("Location: ordini.php");
    }
    else{
        //Controllo che esistano i cookie dell'ultimo acquisto e la mail per poter interrogare il DB
        if (((isset($_COOKIE["cookieDataAcquisto"])) && (isset($_COOKIE["cookieEmail"])))){

            //salvo i valori da passare alla query
            $email = $_COOKIE["cookieEmail"];
            $date = $_COOKIE["cookieDataAcquisto"];

            $query_ultimo_acquisto="delete from ordini where email=$1 and data=$2";
            $result=pg_query_params($dbconn, $query_ultimo_acquisto, array($email, $date));

            //controllo che la delete vada a buon fine
            //quindi resetto i cookie per negare all'utente la possibilità di cancellare lo stesso ordine
            //una volta tornato nella pagina ordini
            if($result){
                setcookie("cookieDataAcquisto", NULL, 0, "/");
                setcookie("cookieTotaleAcquisto", NULL, 0, "/");
                setcookie("cookieOggettiAcquisto", NULL, 0, "/");
                //ultimo ordine eliminato
                
                //rimando l'utente alla pagina ordini
                //sfruttto il cookie di Errore per mostrare all'utente un messaggio di conferma
                setcookie("cookieErrore", "okRimozione", time()+3600, "/");
                header("Location: ordini.php");
            }
            else{
                //problema
                //setto il cookie di errore da mostrare all'utente
                setcookie("cookieErrore", "erroreRimozione", time()+3600, "/");
                header("Location: ordini.php");
            }              
        }
        else{
            //non ho valori per fare la chiamata
            header("Location: ordini.php");
        }
    }  
?>