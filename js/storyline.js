//VAR GLOBALI

//primo indice lasciato vuoto per facilitare accesso agli indici
//uso array per gestire in modo separato le 3 zone del DOM
//e sfruttare una singola core function che sfrutta l'indice per gestire le varie zone
var t__init = ['',false,false,false];
var f_active = ['','','',''];

//per gestire tramite variabile la funzione test()
var t1=/t1/;
var t2=/t2/;
var t3=/t3/;

//Javascript per gestire effetto accordion trilogie
//Ho provato a gestire in modo diverso rispetto al solito hide() | show()
document.querySelectorAll('.accordion__button__trilogy').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('accordion__button__trilogy--active');
        });
});


//FUNZ AUX GESTIONE SEZIONE DINAMICA FILM
//CONTROLLARE PRIMA CODICE IN $(document).ready(function(){}
//E FARE RIFERIMENTO AI COMMENTI DELLE VARIE FUNZIONI

//restituisce la classe di interesse in base alla trilogia di interesse
function selector__t(index){
    var trilogy = '.container__trama__t'+index;
    return trilogy;
}

//aggiunta trama zona dinamica
function add__story(trilogy, film){
    //voglio popolare la zona text() dell'elemento $(trilogy), ottenuta tramite selector_t()
    //sfrutto albero delle classi del DOM tramite la funz JQUERY children()
    //specificando la classe d'interesse ".trama"
    $(trilogy).text($('#'+film).children(".trama").text());

    //una volta popolata la zona text(), chiamo show() sulla trilogia d'interesse
    $(trilogy).show();
}

//rimozione trama zona dinamica
function rem__story(trilogy){
    //console.log('trying to rem text');
    $(trilogy).html(''); //svuoto prima di ripopolare
    $(trilogy).hide();
}

//aggiunta blur film selezionato
function add__blur(target){
    //sfrutto anche qui l'albero delle classi per accedere alla specifica copertina d'interesse
    //poichè la classe "ImmCop" è comune a tutte le copertine mi serve sfruttare target che è unico
    $('#'+target).children(".ImmCop").addClass("elementClicked");

    //rimuovo l'hover di default in modo da non perdere in blur quando una copertina è selezionata
    //e l'utente fa hover su quel determinato elemento
    $('#'+target).children(".ImmCop").removeClass("elementHovered");
}

//rimuovo effetto blur
function rem__blur(target){
    //ragionamento inverso rispetto alla add_blur()
    //prima rimuovo il blur e poi rimetto l'hover
    //riportando così l'immagine al suo stato iniziale

    $('#'+target).children(".ImmCop").removeClass("elementClicked");
    $('#'+target).children(".ImmCop").addClass("elementHovered");
}

//aggiunta titolo zona dinamica
function add__title(target, title){
    //sfrutto l'unicità della classe container_trama_tx
    //e accedo al div precedente tramite prev(); popolando così la zona text()
    //non uso direttamente la classe "container_titolo" per aggiornare solo la specifica classe d'interesse

    $(target).prev().text(title);
    $(target).prev().show();
}

//rimozione titolo zona dinamica
function rem__title(target){
    //stesso ragionamento della add ma per svuotare div

    $(target).prev().html('');
    $(target).prev().hide();
}

//aggiunta video youtube zona dinamica
function add__trailer(target, ref){
    //accedo alla specifica zona di interessa tramite $(target).next()
    //sfruttando lo stesso ragionamento del titolo e popolo il div

    $(target).next().html(ref);
    $(target).next().show();
}

//rimozione video trailer zona dinamica
function rem__trailer(target){
    //stesso ragionamento della add ma svuoto div

    $(target).next().html('');
    $(target).next().hide();
}

//CORE FUNCTION
//Come parametri ha l'indice di riferimento per gestire var globali e select_t();
//filmrRef, title e trailer assegnati dinamicamente tramite JQUERY e usati dalle varie funz aux
function attiva__trilogia(index,filmRef, title, trailer){

    //controllo se accordion attivo e controllo chi è la copertina attiva (sfrutto var globali)
    if(t__init[index] == true && (filmRef != f_active[index])){

        //se l'accordion[index] è attivo 
        //e la copertina clickata è diversa dalla copertina attiva per quel accordion 
        //Entro nell'if, e -->
        rem__blur(f_active[index]); //rimuovo blur da copertina attiva dell'accordion di interesse
        add__blur(filmRef); //aggiungo stato clicked alla copertina clickata
        add__title(selector__t(index),title); //popolo titolo dell'accordion di interesse
        add__story(selector__t(index),filmRef); //popolo trama dell'accordion di interesse
        add__trailer(selector__t(index),trailer); //popolo trailer dell'accordion di interesse
        f_active[index] = filmRef; //modifico copertina attiva dell'accordion[index]
    }
    else if((t__init[index] == true && (filmRef == f_active[index]))){

        //se l'accordion[index] è attivo 
        //e la copertina clickata è quella attiva per quel accordion
        //Entro nell'else if, e -->
        rem__blur(filmRef); //rispetto a sopra uso film_Ref poichè == f_active[index]
        rem__title(selector__t(index)); //svuoto titolo
        rem__story(selector__t(index)); //svuoto trama
        rem__trailer(selector__t(index)); //svuoto trailer
        t__init[index] = false; //salvo che accordion[index] non è più attivo
        f_active[index] = ''; //salvo stato non attivo per film di accordion[index]   
    }
    else{

        //se accordion è disattivato
        //inizializzo tutte le condizioni
        //-->
        add__blur(filmRef); 
        add__title(selector__t(index),title);
        add__story(selector__t(index),filmRef);
        add__trailer(selector__t(index),trailer);
        t__init[index] = true;
        f_active[index] = filmRef;
    }   
}


$(document).ready(function(){
    //per attivare NavBar
    $("#navStoryline").addClass("active");

    //default per ogni copertina
    $('.ImmCop').addClass("elementHovered");

    //click degli elementi aventi classe "ImmCop"
    $('.ImmCop').click(function(){

        //salvo parametri di interesse della specifica copertina sfruttando $(this)
        //da passare poi alle varie funzioni aux

        var filmRef = $(this).parent().attr('id'); //id del div padre della copertina 
        var title = $(this).attr('id'); //id della copertina, coincide con il titolo del film
        var trailer = $(this).siblings(".trailer").html();  //codice per incorporare video trailer, 
                                                            //ottenuto sfruttando siblings() 
                                                            //passando la classe trailer
        //Controlliamo nella console l'id del film clickato
        console.log(filmRef+' :id film clickato');

        //con .test() controlliamo in quale trilogia stiamo
        //andando a passare il corrispondente indice
        // 1 --> ORIGINAL TRILOGY 
        // 2 --> PREQUEL TRILOGY
        // 3 --> SEQUEL TRILOGY
          
        if(t1.test(filmRef)){
            attiva__trilogia(1,filmRef, title, trailer);       
        }
        else if(t2.test(filmRef)){
            attiva__trilogia(2,filmRef, title, trailer);         
        }
        else{
            attiva__trilogia(3,filmRef, title, trailer); 
        }
    });
});