$(document).ready(function() {

    //controllo se l'elemento con ID avvisoErrore è stato inizializzato
    //a seconda del valore mostrerò un messaggio all'utente

    if($("#avvisoErrore").hasClass("erroreRimozione")){
        $("#avvisoErrore").text("C'è stato un problema con l'annullamento del tuo ultimo ordine. Riprova!");
    }else if($("#avvisoErrore").hasClass("erroreHistory")){
        $("#avvisoErrore").text("C'è stato un errore inaspettato nel caricamento dei tuoi ordini!");
    }else if($("#avvisoErrore").hasClass("okRimozione")){
        $("#avvisoErrore").text("Rimozione dell'ultimo ordine avvenuta con successo!"); //sfrutto la stessa classe per mostrare un alert
    }

    //Elimino il cookie che avvisa degli errori, così in caso la pagina venga ricarica non ci sarà più l'errore
    document.cookie = "cookieErrore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //se l'utente non ha fatto acquisti, non gli mostro la possibilità di cancellare l'ultimo ordine
    if($("#shop-button").css("display") == "block"){
        $(".ultimoAcquisto").hide();
    }

    //sfrutto la classe valid, gestita dal PHP, per attivare o meno il bottone di rimozione
    if($("#delOrder").hasClass("valid")){
        $("#delOrder").attr("disabled", false);
        $("#delOrder").text("Cancella ultimo ordine");
    }
    else{
        $("#delOrder").attr("disabled", true);
        $("#delOrder").text("Ultimo ordine già processato");
    }
});
    