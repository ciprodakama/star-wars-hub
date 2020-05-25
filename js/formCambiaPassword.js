$(document).ready(function() {
    //Verifico la presenza di errori e nel caso mostro l'errore corrispondente
    if($("#avvisoErrore").hasClass("passwordSbagliata")){
        $("#avvisoErrore").text("La password dell'account è sbagliata");
    }else if($("#avvisoErrore").hasClass("erroreGenericoCambioPassword")){
        $("#avvisoErrore").text("C'è stato un errore inaspettato sul cambio della password");
    }
    //Elimino il cookie che avvisa degli errori, così in caso la pagina venga ricarica non ci sarà più l'errore
    document.cookie = "cookieErrore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

function validaChange(){
    //Controlle che la nuova passowrd e la sua conferma siano uguali e che siano diverse da quella vecchia
    if(document.formChangePassword.nuovapassword.value==document.formChangePassword.vecchiapassword.value){
        window.alert("La vecchia password coincide con quella nuova. Devono essere diverse");
        return false;
    }else if(document.formChangePassword.nuovapassword.value!=document.formChangePassword.confermapassword.value){
        window.alert("La nuova password non coincide con la sua conferma");
        return false;
    }
}