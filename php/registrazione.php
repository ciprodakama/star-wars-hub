<?php
    $dbconn = pg_connect("host=localhost port=5432 dbname=progetto user=postgres password=password")
    or die('Could not connect:' . pg_last_error());
    if(!(isset($_POST['signUpButton']))){
        //Questo serve perchè se sia qui senza essere passati per il bottone loginButton, allora ci riporta alla pagina areaRiservata
        header("Location: areaRiservata.php");
    }else{
        $email = $_POST['regEmail'];
        $q1 = "select * from utente where email= $1";
        $result=pg_query_params($dbconn, $q1, array($email));
        if($line=pg_fetch_array($result, null, PGSQL_ASSOC)){
            //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
            setcookie("cookieErrore", "emailEsistente", time()+3600, "/");
            header("Location: areaRiservata.php");
        }else{
            $nome=$_POST['regName'];
            $cognome = $_POST['regSurname'];
            /*  La password non viene salvata in chiaro. Viene passata alla funzione sha1 che applica una funzione di hash.
                Si è preferito sha1 perché leggermente più sicura e da luogo a meno collisioni.
            */
            $password = sha1($_POST['regpassword']);
            $q2="insert into utente values ($1,$2,$3,$4,$5)";
            $quiz=null;
            //Se il cookie dedicato al quiz è impostato, va aggiunto al db durante il login
            if (isset($_COOKIE["cookieSalvaRisQuiz"])) {
                $quiz = $_COOKIE["cookieSalvaRisQuiz"];
            }
            $data=pg_query_params($dbconn, $q2, array($email, $nome, $cognome, $password, $quiz));
            if ($data){
                setcookie("cookieNome", $nome, time()+3600, "/");
                setcookie("cookieCognome", $cognome, time()+3600, "/");
                setcookie("cookieEmail", $email, time()+3600, "/");
                setcookie("cookieRisQuiz", $quiz, time()+3600, "/");
                setcookie("cookieSalvaRisQuiz", "", time()-4000, "/");
                header("Location: utente.php");
            }else{
                //Nel caso di errore viene settato un cookie e si viene rimandati alla pagina precedente, dove verrà mostrato un errore
                setcookie("cookieErrore", "erroreGenerico", time()+3600, "/");
                header("Location: areaRiservata.php");
            }
            
            if(isset($_COOKIE["cookieAcquisto"])){ //Se esiste è stato lo shop ad impostarlo, quindi devo aggiornare il db

                //per poter lavorare con le informazioni presenti nel cookie, essendo esso uno stringa
                //ho bisogno di renderlo nuovamente un array; questo è possibile grazie alla funzione json_decode()
                //una volta fatto questo, potrò accedere ai valori da salvare poi nel DB
                $cart_array = json_decode($_COOKIE["cookieAcquisto"], TRUE);

                $date = $cart_array[0][1]; //salvo la data di interesse
                $total = $cart_array[0][0]; //salvo il totale dell'acquisto
                $objects = json_encode($cart_array[1]); //salvo l'array di prodotti in forma di stringa 
                
                $q3="insert into ordini values ($1,$2,$3,$4)";
                $data=pg_query_params($dbconn, $q3, array($date, $email, $total, $objects));

                //controllo che l'inserimento vada a buon fine
                if ($data){

                    //Per gestire la rimozione dell'ultimo ordine inserito nel DB,
                    //setto nuovi cookie con i dati appena inseriti nel DB
                    setcookie("cookieDataAcquisto",$date, time()+3600, "/");
                    setcookie("cookieTotaleAcquisto", $total, time()+3600, "/");
                    setcookie("cookieOggettiAcquisto", $objects, time()+3600, "/");

                    //Uccido invece il cookie provienente dallo shop poichè 
                    //se per caso l'utente tornasse alla pagina di Login/Registrazione, senza aver premuto su Logout
                    //e riprovasse ad entrare; il check del cookie passarebbe e si proverebbe ad inserire un dato già presente
                    setcookie("cookieAcquisto", "", time()-3600, "/");

                    //Una volta completato si rimanda l'utente alla sua pagina personale
                    header("Location: utente.php");

                //se l'inserimento è fallito per qualche motivo, salvo l'errore in un cookie
                //che verrò mostrato nella pagina di Registrazione/Login
                }else{
                    setcookie("cookieErrore", "erroreOrdini", time()+3600, "/");
                    header("Location: areaRiservata.php");
                }
            }
        }
    }
?>