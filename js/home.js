var audio = document.getElementById("my_audio");

$(document).ready(function() {
    /*Funzione che aspetta la fine delle animazioni (in particolare aspetta che l'animazione "finalAnimation" di #logo termini) 
    per rimuovere le classi delle animazioni "animate-intro", "animate-crawl" e "animate-logo"
    (così ripremendo sul bottone posso far ripartire tutta l'animazione) e per far riapparire il bottone*/
    $("#logo").on('animationend', (e) => {  
      var animName = e.originalEvent.animationName;
      //console.log(animName + " just ended");
      //console.log(audio.currentTime);
      if(animName=="finalAnimation"){
        $("#avvia-animazione").show();
        $(".intro").removeClass("animate-intro");
        $(".crawl").removeClass("animate-crawl");
        $("#logo").removeClass("animate-logo");
        audio.currentTime=0;
      }
    });
    //Se avviene un click sul bottone, iniziano le animazioni e nascondo bottone
    $("#avvia-animazione").click(function(){
      $("#avvia-animazione").hide();
      audio.play();
      $("#logo").addClass("animate-logo");
      $(".intro").addClass("animate-intro");
      $(".crawl").addClass("animate-crawl");
    })
});