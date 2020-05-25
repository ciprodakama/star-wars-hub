<?php
    /*  Siamo stati obbligati a passare per questo file php per generare il cookie perché la creazione 
        di un cookie in javascript è di tipo session e non si può cancellare fino al cambio sessione
    */
    $quiz = $_GET["quiz"];
    setcookie("cookieSalvaRisQuiz", $quiz, time()+3600, "/");
    header("Location: AreaRiservata.php");
?>