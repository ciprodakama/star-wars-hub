$(document).ready(function() {
    //Imposto come attivo il bottone del menù relativo all'utente
    $("#navUtente").addClass("active");

    //Imposto il quiz in base alla classe aggiunta tramite la lettura del cookie del quiz
    if ($("#spanQuiz").hasClass("sith")){
        $("#risQuiz").text("Tu sei un SITH");
        $("#risQuiz").addClass("testoSith");
        $("#immRisultato").attr("src", "../immagini/quiz/Sith.jpg");
    }else if ($("#spanQuiz").hasClass("jedi")){
        $("#risQuiz").text("Tu sei un JEDI");
        $("#risQuiz").addClass("testoJedi");
        $("#immRisultato").attr("src", "../immagini/quiz/Jedi2.jpg");
    }else if($("#spanQuiz").hasClass("indeciso")){
        $("#risQuiz").text("La forza è ancora incerta in te");
        $("#risQuiz").addClass("testoIndeciso");
        $("#immRisultato").attr("src", "../immagini/quiz/Indeciso.jpg");
    } else{
        //Nel caso di quiz non fatto, viene cambiata in parte la schermata e mostrata la situazione correlata
        $("#risQuiz").addClass("quizNonFatto");
        $("#risQuiz").text("Non hai ancora fatto il quiz!");
        $("#linkQuiz").show();
        $("#idSubmit").hide();
        $("#idScrittaCanc").hide();
        $("#idInputCanc").hide();
        $("#immRisultato").attr("src", "../immagini/quiz/porg-cropped.jpg");
    }

    $("#linkQuiz").click(function(){
        window.location.href = "../quiz.html";
    })
    $("#cambiaPassword").click(function(){
        window.location.href = "formCambiaPassword.php";
    })
    $("#bottoneOrdini").click(function(){
        window.location.href = "ordini.php";
    })

    //In caso di logout cancello ogni cookie e ritorno all'area riservata
    $("#bottoneLogout").click(function(){
        document.cookie = "cookieNome=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieCognome=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieRisQuiz=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieOggettiAcquisto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieDataAcquisto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieTotaleAcquisto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cookieAcquisto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "areaRiservata.php";
    })

    //Verifico la presenza di errori e nel caso mostro l'errore corrispondente
    if($("#avvisoErrore").hasClass("passwordSbagliata")){
        $("#avvisoErrore").text("La password dell'account è sbagliata");
    }else if($("#avvisoErrore").hasClass("erroreCancellazioneQuiz")){
        $("#avvisoErrore").text("C'è stato un errore inaspettato sulla cancellazione del quiz");
    }
    
    //Elimino il cookie che avvisa degli errori, così in caso la pagina venga ricarica non ci sarà più l'errore
    document.cookie = "cookieErrore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});
