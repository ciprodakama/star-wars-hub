<?php
    $dbconn = pg_connect("host=localhost port=5432 dbname=progetto user=postgres password=password")
    or die('Could not connect:' . pg_last_error());
    if(!(isset($_POST['bottoneCancellaQuiz']))){
        //Questo serve perchè se sia qui senza essere passati per il bottone bottoneCancellaQuiz, allora ci riporta alla pagina utente
        header("Location: utente.php");
    }else{
        $email = $_COOKIE["cookieEmail"];
        $password = sha1($_POST['confpassword']);
        $q1="select * from utente where email = $1 and password = $2";
        $result=pg_query_params($dbconn,$q1,array($email, $password));
        if(!($line=pg_fetch_array($result ,null ,PGSQL_ASSOC))){
            //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
            setcookie("cookieErrore", "passwordSbagliata", time()+3600, "/");
            header("Location: utente.php");
        }else{
            $q2 = "update utente set risultatoquiz=null where email=$1 and password = $2";
            $result=pg_query_params($dbconn, $q2, array($email, $password));
            if($result==true){
                $q3="select risultatoquiz from utente where email = $1 and password = $2";
                $result=pg_query_params($dbconn,$q3,array($email, $password));
                if(!($line=pg_fetch_array($result ,null ,PGSQL_ASSOC))){
                    //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                    setcookie("cookieErrore", "erroreCancellazioneQuiz", time()+3600, "/");
                    header("Location: utente.php");
                }else {
                    //Nel caso di successo, cancello il cookie del quiz
                    setcookie("cookieRisQuiz", null, time()-4000000, "/");
                    header("Location: utente.php");
                }
            }else{
                //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                setcookie("cookieErrore", "erroreCancellazioneQuiz", time()+3600, "/");
                header("Location: utente.php");
            }
        }
    }
?>