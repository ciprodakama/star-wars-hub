var slideIndex =0; //indice della slide in cui mi trovo 
showSlide(slideIndex);

function plusSlides(n){ //per spostarmi di slide
    showSlide(slideIndex+=n);
}

function currentSlide(n){ //Mostrare la slide richiesta quando premo su 'dot'
    showSlide(slideIndex=n);
}
//Funzione che mostra la slide n
function showSlide(n){
    var i;
    var slides = document.getElementsByClassName("mySlide");
    var dots = document.getElementsByClassName("dot");
    //Controllo se sono all'inizio o alla fine delle slide e agisco d conseguenza
    if(n>slides.length-1){slideIndex=0}
    if(n<0){slideIndex= slides.length-1}
    //Non voglio mostrare le altre slide e gli altri dot
    for(i=0; i<slides.length;i++){
        slides[i].style.display = "none";
    }
    for(i=0;i<dots.length;i++){
        dots[i].className =dots[i].className.replace(" active", "");
        //selettore active si usa per selezionare e definire lo stile di un link attivo, può essere usato con hover
    }
    //Mostro la slide e il dot voluti
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}

/*Funzione ausiliaria per caricare foto e testi dei personaggi
i nomi delle immagini sono utilizzati per suddividerle fra trilogie, in particolare hanno la forma: 
trilogia + i + _img + j + .png dove i= {1 per la trilogia prequel, 2 per la trilogia originale, 3 per la trilogia sequel},
j={1,2,3,4,5} corrispondente al numero della slide che l'immagine occuperà

i testi da inserire nelle slide si trovano in tre file .htm, uno per trilogia, che contengono elementi con id numerico con cui accedervi per
rilevare il testo voluto */
 function caricaPersonaggi(n){
    var path_text; //path del file da cui scaricare il testo
    var str_text; //testo da caricare
    var str_slide; //per accedere al testo della slide da cambiare
    var slide_img; //slide di cui si deve cambiare l'immagine
    var path_img = "immagini/slides_immagini/trilogia" + n + "_img"; //path dell'immagine da inserire
    var nome_img; //nome dell'immagine da inserire
    if(n==1){
        path_text = "file/personaggi_storie/trilogia_prequel_personaggi.html #";
    }
    else if(n==2){
        path_text = "file/personaggi_storie/trilogia_classica_personaggi.html #";
    }
    else if(n==3){
        path_text = "file/personaggi_storie/trilogia_sequel_personaggi.html #";
    }
    for(var i=1;i<=5;i++){
        //carico il testo
        str_slide = "#slide" + i + " p"; 
        str_text = path_text + i;
        $(str_slide).load(str_text,function(resonseTxt,statusTxt, xhr){ 
            if(statusTxt == "error") alert("Errore " + xhr.status + ":" + xhr.statusTxt);
        });
        //carico l'immagine
        slide_img = "#slide" + i; 
        nome_img = path_img + i + ".png"; 
        $(slide_img + " img").attr("src", nome_img); 
    }
    //Ritorno alla prima slide
    slideIndex=0;
    showSlide(slideIndex);
 }

 $(document).ready(function(){
    $("#navPersonaggi").addClass("active");
     //voglio aprire i personaggi della trilogia prequel
     $("#apriTrilogia1").click(function(){
         caricaPersonaggi(1);
     });
     //voglio aprire i personaggi della trilogia classica
     $("#apriTrilogia2").click(function(){
         caricaPersonaggi(2);
     });
     //voglio aprire i personaggi della trilogia sequel
     $("#apriTrilogia3").click(function(){
        caricaPersonaggi(3);
     });
 });
