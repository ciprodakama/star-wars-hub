/*  'chiHaScopri' serve a capire di chi sono le info extra mostrate nel corrispettivo div dinamico e quindi
    per poter gestire i cambiamenti
*/

var chiHaScopri = -1;
//Ogni indice dei successivi array è specifico per ogni autore
var informazioni0 = ["", "", ""];   //nomi autori
var informazioni1 = ["", "", ""];   //motto
var informazioni2 = ["", "", ""];   //personaggio preferio
var informazioni3 = ["", "", ""];   //immagine quiz
var informazioni4 = ["", "", ""];   //scritta quiz
var informazioni5 = ["", "", ""];   //colore scritta quiz

$(document).ready(function() {
    $("#bottoneQuiz").click(function(){
        window.location.href ="quiz.html";
    })
    inizializzazioneInfoExtraDaDocumenti();
    $("#sezioneScopri").hide();
    //Per ogni bottone di ogni card dei programmatori/studenti del sito viene associato un comportamento per e in base alla sezione dinamica sottostante
    $("#bottoneLuca").click(function(){
        ripristinaScrittaBottone();
        if(chiHaScopri==0){
            $("#sezioneScopri").hide();
            chiHaScopri=-1;
        }else{
            chiHaScopri=0;
            $("#sezioneScopri").show();
            $("#bottoneLuca").text("Chiudi extra");
            inserimentoDati(chiHaScopri);
        }
    })
    $("#bottoneGianfranco").click(function(){
        ripristinaScrittaBottone();
        if(chiHaScopri==1){
            $("#sezioneScopri").hide();
            chiHaScopri=-1;
        }else{
            chiHaScopri=1;
            $("#sezioneScopri").show();
            $("#bottoneGianfranco").text("Chiudi extra");
            inserimentoDati(chiHaScopri);
        }
    })
    $("#bottoneGeorge").click(function(){
        ripristinaScrittaBottone();
        if(chiHaScopri==2){
            $("#sezioneScopri").hide();
            chiHaScopri=-1;
        }else{
            chiHaScopri=2;
            $("#sezioneScopri").show();
            $("#bottoneGeorge").text("Chiudi extra");
            inserimentoDati(chiHaScopri);
        }
    })
});

//Imposta i dati della zona dinamica con lo studente programmatore richiesto dall'utente
function inserimentoDati(numPersona){
    var intNumPers = parseInt(numPersona);
    $("#info1").text(informazioni1[intNumPers]);
    $("#info2").text(informazioni2[intNumPers]);
    $("#info3").attr("src", informazioni3[intNumPers]);
    $("#info4").text(informazioni4[intNumPers]);
    $("#info4").css("color", informazioni5[intNumPers])
}

function ripristinaScrittaBottone(){
    if(chiHaScopri==0){
        $("#bottoneLuca").text("Scopri di più");
    }else if(chiHaScopri==1){
        $("#bottoneGianfranco").text("Scopri di più");
    }else if(chiHaScopri==2){
        $("#bottoneGeorge").text("Scopri di più");
    }
}

function inizializzazioneInfoExtraDaDocumenti(){
    //Qui AJAX esegue una connessione asincrona (la open è settata a true)
    for(var i=0; i<5; i++){
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = gestisciRisposta;
        httpRequest.id=i;
        httpRequest.open("GET", "file/aboutUs/informazioni"+i+".txt", true);
        httpRequest.send();
    }
}

function gestisciRisposta(e){
    if(e.target.readyState == XMLHttpRequest.DONE && e.target.status==200){
        var letture = e.target.responseText.split("\n");
        informazioni0[e.target.id]=letture[0];
        informazioni1[e.target.id]=letture[1];
        informazioni2[e.target.id]=letture[2];
        informazioni3[e.target.id]=letture[3];
        informazioni4[e.target.id]=letture[4];
        informazioni5[e.target.id]=letture[5];
    }
}
