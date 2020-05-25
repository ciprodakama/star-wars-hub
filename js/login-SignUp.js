$(document).ready(function() {
    //Imposto come attivo il bottone del menù relativo all'area riservata
    $("#navUtente").addClass("active");

    //Verifico la presenza di errori e nel caso mostro l'errore corrispondente
    if($("#avvisoErrore").hasClass("passwordSbagliata")){
        $("#avvisoErrore").text("La password dell'account è sbagliata");
    }else if($("#avvisoErrore").hasClass("emailSbagliata")){
        $("#avvisoErrore").text("L'email inserita non è registrata. Corregila o registrati");
    }else if($("#avvisoErrore").hasClass("passwordNonCoincidente")){
        $("#avvisoErrore").text("La password di conferma non coincide. Riprova");
    }else if($("#avvisoErrore").hasClass("emailEsistente")){
        $("#avvisoErrore").text("Questa mail corrisponde ad un account già registrato. Fai il login");
    }else if($("#avvisoErrore").hasClass("erroreAggiornamentoQuiz")){
        $("#avvisoErrore").text("C'è stato un errore nell'aggiornamento del risultato del quiz. Riprova");
    }else if($("#avvisoErrore").hasClass("erroreOrdini")){
        $("#avvisoErrore").text("C'è stato un errore con gli ordini. Riprova");
    }else if($("#avvisoErrore").hasClass("erroreGenerico")){
        $("#avvisoErrore").text("C'è stato un errore inaspettato. Riprova");
    }

    //Verifico la presenza del cookie che procede al salvataggio del quiz nel caso di accesso e se necessario mostro il messaggio corrispondente
    if($("#avvisoCookieQuiz").hasClass("salvaQuiz")){
        $("#avvisoCookieQuiz").text("Eseguendo il login o la registrazione, salverai anche l'ultimo quiz fatto");
    }

    //Verifico la presenza del cookie che procede al salvataggio dell'acquisto nel caso di accesso e se necessario mostro il messaggio corrispondente
    if($("#avvisoCookieShop").hasClass("salvaAcquisto")){
        $("#avvisoCookieShop").text("Eseguendo il login o la registrazione, salverai anche l'ultimo acquisto fatto");
    }

    //Elimino il cookie che avvisa degli errori, così in caso la pagina venga ricarica non ci sarà più l'errore
    document.cookie = "cookieErrore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

function controllaPassword(){
    if(document.formRegistrazione.regpassword.value!=document.formRegistrazione.regconfpassword.value){
        window.alert("La password di conferma non coincide. Riprova");
        return false;
    }
}