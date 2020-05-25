<?php
    $dbconn = pg_connect("host=localhost port=5432 dbname=progetto user=postgres password=password")
    or die('Could not connect:' . pg_last_error());
    if(!(isset($_POST['loginButton']))){
        //Questo serve perchè se sia qui senza essere passati per il bottone loginButton, allora ci riporta alla pagina areaRiservata
        header("Location: areaRiservata.php");
    }else{
        $email = $_POST['loginEmail'];
        $q1 = "select * from utente where email= $1";   
        $result=pg_query_params($dbconn, $q1, array($email));
        if(!($line=pg_fetch_array($result ,null ,PGSQL_ASSOC))){
            //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
            setcookie("cookieErrore", "emailSbagliata", time()+3600, "/");
            header("Location: areaRiservata.php");
        }else{
            $password = sha1($_POST['loginPassword']);
            /*  La password non è in chiaro. Viene passata alla funzione sha1 che applica una funzione di hash.
                Si è preferito sha1 perché leggermente più sicura e da luogo a meno collisioni.
            */
            $q2="select * from utente where email = $1 and password = $2";
            $result=pg_query_params($dbconn,$q2,array($email, $password));
            if(!($line=pg_fetch_array($result ,null ,PGSQL_ASSOC))){
                //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                setcookie("cookieErrore", "passwordSbagliata", time()+3600, "/");
                header("Location: areaRiservata.php");
            }else{
                //Se il cookie dedicato al quiz è impostato, va aggiunto al db durante il login
                if (isset($_COOKIE["cookieSalvaRisQuiz"])) {
                    $quiz = $_COOKIE["cookieSalvaRisQuiz"];
                    $q3 = "update utente set risultatoquiz=$1 where email=$2 and password = $3";
                    $result=pg_query_params($dbconn, $q3, array($quiz, $email, $password));
                    if($result==false){
                        //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                        setcookie("cookieErrore", "erroreAggiornamentoQuiz", time()+3600, "/");
                        header("Location: areaRiservata.php");
                    }else{
                        setcookie("cookieSalvaRisQuiz", "", time()-4000, "/");
                    }
                }
                
                $q4 = "select email, nome, cognome, risultatoquiz from utente where email= $1 and password = $2";
                $result=pg_query_params($dbconn, $q4, array($email, $password));
                if($line=pg_fetch_array($result ,null ,PGSQL_ASSOC)){
                    setcookie("cookieNome", $line["nome"], time()+3600, "/");
                    setcookie("cookieCognome", $line["cognome"], time()+3600, "/");
                    setcookie("cookieEmail", $line["email"], time()+3600, "/");
                    setcookie("cookieRisQuiz", $line["risultatoquiz"], time()+3600, "/");
                    header("Location: utente.php");
                }else{
                    //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                    setcookie("cookieErrore", "erroreGenerico", time()+3600, "/");
                    header("Location: areaRiservata.php");                }

                //VEDERE COMMENTI IN REGISTRAZIONE.PHP
                if (isset($_COOKIE["cookieAcquisto"])) { //Se esiste è stato lo shop ad impostarlo, quindi devo aggiornare il db
                    $cart_array = json_decode($_COOKIE["cookieAcquisto"], TRUE);
                    $date = $cart_array[0][1];
                    $total = $cart_array[0][0];
                    $objects = json_encode($cart_array[1]);
                    $q5 = "insert into ordini values ($1,$2,$3,$4)"; 
                    $data=pg_query_params($dbconn, $q5, array($date, $email, $total, $objects));
                    
                    if ($data){
                        setcookie("cookieDataAcquisto",$date, time()+3600, "/");
                        setcookie("cookieTotaleAcquisto", $total, time()+3600, "/");
                        setcookie("cookieOggettiAcquisto", $objects, time()+3600, "/");
                        setcookie("cookieAcquisto", "", time()-3600, "/");
                        header("Location: utente.php");
                    }else{
                        setcookie("cookieErrore", "erroreOrdini", time()+3600, "/");
                        header("Location: areaRiservata.php");
                        //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                    }
                }
            }
        }
    }
?>