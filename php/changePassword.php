<?php
    $dbconn = pg_connect("host=localhost port=5432 dbname=progetto user=postgres password=password")
    or die('Could not connect:' . pg_last_error());
    if(!(isset($_POST['changeButton']))){
        //Questo serve perchè se sia qui senza essere passati per il bottone changeButton, allora ci riporta alla pagina utente
        header("Location: utente.php");
    }else{
        $email = $_COOKIE["cookieEmail"];
        $vecchiaPassword = sha1($_POST['vecchiapassword']);
        $q1="select * from utente where email = $1 and password = $2";
        $result=pg_query_params($dbconn,$q1,array($email, $vecchiaPassword));
        if(!($line=pg_fetch_array($result ,null ,PGSQL_ASSOC))){
            //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
            setcookie("cookieErrore", "passwordSbagliata", time()+3600, "/");
            header("Location: formCambiaPassword.php");
        }else{
            $nuovaPassword = sha1($_POST['nuovapassword']);
            $q2 = "update utente set password=$1 where email=$2";
            $result=pg_query_params($dbconn, $q2, array($nuovaPassword, $email));
            if($result==true){
                header("Location: utente.php");
            }else{
                //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                setcookie("cookieErrore", "erroreGenericoCambioPassword", time()+3600, "/");
                header("Location: formCambiaPassword.php");
            }
        }
    }
?>