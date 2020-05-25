<?php
    //Sono stato obbligato a passare per questo file php perché la creazione di un cookie in javascript è di tipo session, e poi non si può cancellare fino al cambio sessione

    //Prendo il valore inviato al checkout dalla variabile cart
    $cart = $_GET["cart"];

    //salvo il nome e il valore del cookie
    $cookie_name = "cookieAcquisto";
    $cookie_value = $cart;

    //sfruttando la funzione setcookie di PHP, salvo con i paramentri sovrastanti
    setcookie($cookie_name, $cookie_value, time()+3600, "/");

    //rimando l'utente alla pagina AreaRiservata.php
    header("Location: AreaRiservata.php");
?>