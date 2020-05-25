/*  'immaginescelta' serve a salvare di volta in volta la scelta dell'utente
    'salvaRisultatoQuiz' salva il risultato nel caso in cui l'utente voglia salvarlo nel suo account
*/
var immaginescelta=0;
var testiDomande = ["", "", "", "", ""];
var salvaRisultatoQuiz = "";

$(document).ready(function() {
    //Imposto come attivo il bottone del menù relativo al quiz
    $("#navQuiz").addClass("active");

    $("#modificaTesto").click(function() {
        if(checkRisposta()==-1){
            return;
        }
        var indice = parseInt(localStorage.indexProssimaDomanda);
        //Se ci sono ancora domande proseguo, altrimenti mostro il risultato
        if(indice<testiDomande.length){
            proseguimentoQuiz();
        }else{
            localStorage.indexProssimaDomanda=-1; //Imposto che le domande sono finite
            mostraRisultato();
        }
    });
    //Da qui imposto i comportamenti grafici e funzionali delle immagini/bottoni dei quiz
    $("#immSin").click(function(){
        if(immaginescelta==1){  //Questo controllo permette all'utente di deselezionare la scelta senza farne un'altra
            $("#immSin").removeClass("contornoVerde");
            $("#immSin").addClass("contornoArancione"); //Metto il bordo arancione perché se sto deselezionando sono dentro la cella
            immaginescelta=0;
        }else{
            //Se l'immagine scelta prima era l'altra, allora devo toglierle il bordo verde
            if(immaginescelta==2){
                $("#immDes").removeClass("contornoVerde");
                $("#immDes").addClass("contornoNero");
            }
            $("#immSin").removeClass("contornoArancione");
            $("#immSin").addClass("contornoVerde");
            immaginescelta=1;
        }
    });
    //Aggiunge bordo arancione all'immagine sinistra se non è stata scelta  e si entra con il mouse
    $("#immSin").mouseenter(function(){
        if($("#immSin").hasClass("contornoNero")){
            $("#immSin").removeClass("contornoNero");
            $("#immSin").addClass("contornoArancione");
        }
    });
    //Toglie il bordo arancione all'immagine sinistra se non è stata scelta e si esce con il mouse
    $("#immSin").mouseleave(function(){
        if($("#immSin").hasClass("contornoArancione")){
            $("#immSin").removeClass("contornoArancione");
            $("#immSin").addClass("contornoNero");
        }
    });
    $("#immDes").click(function(){
        if(immaginescelta==2){  //Questo controllo permette all'utente di deselezionare la scelta senza farne un'altra
            $("#immDes").removeClass("contornoVerde");
            $("#immDes").addClass("contornoArancione"); //Metto il bordo arancione perché se sto deselezionando sono dentro la cella
            immaginescelta=0;
        }else{
            //Se l'immagine scelta prima era l'altra, allora devo toglierle il bordo verde
            if(immaginescelta==1){
                $("#immSin").removeClass("contornoVerde");
                $("#immSin").addClass("contornoNero");
            }
            $("#immDes").removeClass("contornoArancione");
            $("#immDes").addClass("contornoVerde");
            immaginescelta=2;
        }
    });
    //Aggiunge bordo arancione all'immagine destra se non è stata scelta  e si entra con il mouse
    $("#immDes").mouseenter(function(){
        if($("#immDes").hasClass("contornoNero")){
            $("#immDes").removeClass("contornoNero");
            $("#immDes").addClass("contornoArancione");
        }
    });
    //Toglie il bordo arancione all'immagine destra se non è stata scelta e si esce con il mouse
    $("#immDes").mouseleave(function(){
        if($("#immDes").hasClass("contornoArancione")){
            $("#immDes").removeClass("contornoArancione");
            $("#immDes").addClass("contornoNero");
        }
    });

    $("#bottoneSalvaQuiz").click(function(){
        /*  Passo il risultato del quiz ad un file php che genererà un cookie temporaneo.
            Non uso javascript per creare i cookie perché alcuni browser non creano cookie
            temporanei anche se si inserisce l'expires, ma creano cookie di sessione,
            che non si comportano come richiesto dalla successiva implementazione
        */
        window.location.href = "php/salvataggioRisQuiz.php?quiz="+salvaRisultatoQuiz+"";
    });
});

function checkRisposta(){
    if(immaginescelta==0){
        window.alert("Prima di procedere devi fare una scelta!");
        return -1;
    }
    /*  Nel localStorage.punteggioQuiz incremento di 1 ogni volta che l'utente sceglie il lato di
        sinistra. Alla fine il risultato dipenderà dalla grandezza di questa variabile
    */
    if(immaginescelta==1){
        var punteggio = parseInt(localStorage.punteggioQuiz);
        punteggio++;
        localStorage.punteggioQuiz=punteggio;
        $("#immSin").removeClass("contornoVerde");
        $("#immSin").addClass("contornoNero");
    }else{
        $("#immDes").removeClass("contornoVerde");
        $("#immDes").addClass("contornoNero");
    }
    immaginescelta=0;
    return 0;
}

function mostraRisultato(){
    //Cancello gli elementi non più necessari
    var cambio = document.getElementsByClassName("elementiDaTogliere");
    for(i=0; i<cambio.length; i++){
        cambio[i].style.display="none";
        cambio[i].style.visibility = "hidden";
    }
    //Cancello gli elementi necessari al risultato
    cambio = document.getElementsByClassName("elementiFinali");
    for(i=0; i<cambio.length; i++){
        cambio[i].style.display="block";
    }
    var punteggio = parseInt(localStorage.punteggioQuiz);
    var titoloRis = document.getElementById("testoRisultato");
    var immRis = document.getElementById("immRisultato");
    var audioRis;
    //Imposto la pagina in base al risultato
    if(punteggio>3){
        salvaRisultatoQuiz = "jedi";
        titoloRis.textContent="Tu sei un JEDI";
        titoloRis.style.color="#0010f1";
        document.getElementById("sottoTestoRisultato").textContent="Il bene è la tua via, difensore di libertà e giustizia. La forza scorre forte in te";
        immRis.style.backgroundImage="url('immagini/quiz/Jedi2.jpg')";
        immRis.style.border="3px solid #0010f1";
        audioRis = document.getElementById("finaleBuono");
        audioRis.style.display="block";
    }else if(punteggio==3){
        salvaRisultatoQuiz = "indeciso";
        titoloRis.textContent="La forza è in bilico con te";
        titoloRis.style.color="#159220";
        document.getElementById("sottoTestoRisultato").textContent="Non è ancora ben chiaro a quale dei due lati della forza appartieni. Il tuo destino è incerto";
        immRis.style.backgroundImage="url('immagini/quiz/Indeciso.jpg')";
        immRis.style.border="3px solid #159220";
        audioRis = document.getElementById("finaleIndeciso");
        audioRis.style.display="block";
    }else{
        salvaRisultatoQuiz = "sith";
        titoloRis.textContent="Tu sei un SITH";
        titoloRis.style.color="#c90a0a";
        document.getElementById("sottoTestoRisultato").textContent="Il fascino del potere è qualcosa a cui pochi resistono. Sei un discepolo del male";
        immRis.style.backgroundImage="url('immagini/quiz/Sith.jpg')";
        immRis.style.border="3px solid #c90a0a";
        audioRis = document.getElementById("finaleCattivo");
        audioRis.style.display="block";
    }
    audioRis.play();
}

function inizializzazioneDomande(){
    //Inizializzo le domande leggendo con AJAX da file
    for(var i=0; i<5; i++){
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = gestisciRisposta;
        httpRequest.id=i;
        /*  La open è impostata a false, cioè connessione sincrona, in quanto se fosse impostata a true,
            cioè connessione asincrona, non caricherebbe i testi in tempo per quando viene mostrata
            la domanda correlata alle immagini.
        */
        httpRequest.open("GET", "file/quiz/domande"+i+".txt", false);
        httpRequest.send();
    }
}

function gestisciRisposta(e){
    if(e.target.readyState == XMLHttpRequest.DONE && e.target.status==200){
        testiDomande[e.target.id]=e.target.responseText;
    }
}

//Tramite localStorage recupero lo stato del quiz nel caso di chiusura inaspettata del browser o cambio involontario di pagina, se l'utente lo desidera
function controlloPrecedenteSalvataggio(){ 
    if(typeof(localStorage.indexProssimaDomanda) == "undefined" || parseInt(localStorage.indexProssimaDomanda)==1 || parseInt(localStorage.indexProssimaDomanda)==-1){
        localStorage.punteggioQuiz = 0;
        localStorage.indexProssimaDomanda = 0;
    }else {
        var domanda = confirm("È stato rilevato un quiz iniziato, ma non completato. Desideri continuarlo? Premendo annulla lo ricomincerai da capo");
        if (domanda === false) {
            localStorage.punteggioQuiz = 0;
            localStorage.indexProssimaDomanda = 0;
        }else{
            var indice = parseInt(localStorage.indexProssimaDomanda);
            indice--;
            localStorage.indexProssimaDomanda=indice;
        }
    }
}

function inizializzazioneDati(){
    controlloPrecedenteSalvataggio();
    inizializzazioneDomande();
    proseguimentoQuiz();
}

function proseguimentoQuiz(){
    //Avendo tutte le immagini dei quiz con path simile, è stato possibile modularizzare il caricamento
    var indice = parseInt(localStorage.indexProssimaDomanda);
    var num1 = 2*indice+1;
    var num2 = 2*indice+2;
    var testo = testiDomande[indice];
    var pre_url = "url('immagini/quiz/quiz";
    var post_url = ".jpg')"
    var trovaElementi = document.getElementById("immSin");
    trovaElementi.style.backgroundImage=pre_url+num1+post_url;
    trovaElementi = document.getElementById("immDes");
    trovaElementi.style.backgroundImage=pre_url+num2+post_url;
    trovaElementi = document.getElementById("domandaQuiz");
    trovaElementi.textContent=testo;
    indice++;
    localStorage.indexProssimaDomanda=indice;
}