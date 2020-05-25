//VAR GLOBALE DA PASSARE AL PHP CHE INIZIALIZZA COOKIE ACQUISTO
//Nell'indice [0] in posizione [0] andiamo a mettere il totale dell'acquisto
//Mentre in posizione [1] la data dell'acquisto
//I dati dell'indice [0] vengono popolati al momento del checkout
//Nell'indice[1] invece troveremo i singoli prodotti
//La variabile globale e l'elemento cart di Vue vengono popolati contemporaneamente
//Questo è stato fatto per evitare di farlo durante il Checkout
//e garantire grazie all'uso degli indici un inserimento più veloce ed ordinato

var ext_cart = [
  [,''],
  [
  ['','',0],
  ['','',0],
  ['','',0],
  ['','',0],
  ['','',0],
  ['','',0],
  ['','',0],
  ['','',0],
  ['','',0],
  ]
];

new Vue({
    el: '#app',
    data:{
      groupWrapper: "list-group-item", //Bootstrap Class
      isShowingCart: false, //Variabile che gestisce zona prodotti e carrello
      cart: { 
        //carrello locale che viene aggiornato in base alle azioni dell'utente
        //durante l'inserimento ogni elemento di items avrà due campi: Products e Quantity
        //Products coincide con products dell'elemento Vue; mentre Quantity è un semplice intero
        items: [] 
      },
      products: [ //Ogni prodotto ha una struttura qui descritta -->
        {
          id: 1,
          name: "Funko Pop Baby Yoda",
          picture: "immagini/shop/pop_yoda.jpg",
          description:
          "Un delizioso Funko Pop che non puoi negarti",
          price: 9.99,
          inStock: 10
        },
        {
          id: 2,
          name: "Funko Pop Darth Vader",
          picture: "immagini/shop/pop_vader.jpg",
          description:
          "Il lato oscuro della forza come non l'avete mai visto",
          price: 9.99,
          inStock: 6
        },
        {
          id: 3,
          name: "Funko Pop Trooper",
          picture: "immagini/shop/pop_trooper.jpg",
          description:
          "Un pezzo da collezione immancabile",
          price: 9.99,
          inStock: 15
        },
        {
          id: 4,
          name: "Trilogia Originale",
          picture: "immagini/shop/original.jpg",
          description:
          "Scopri le origini del Supremo Imperatore",
          price: 29.99,
          inStock: 5
        },
        {
          id: 5,
          name: "Trilogia Prequel",
          picture: "immagini/shop/prequel.jpg",
          description:
          "Dove tutto ebbe inizio! Riscopri le origini della saga!",
          price: 29.99,
          inStock: 5
        },
        {
          id: 6,
          name: "Bundle I-VI",
          picture: "immagini/shop/bundle.jpg",
          description:
          "Per chi non vuole farsi mancare nulla",
          price: 49.99,
          inStock: 3
        },
        {
          id: 7,
          name: "T-Shirt Baby Yoda",
          picture: "immagini/shop/shirt_yoda.jpg",
          description:
          "Condividi la tua dolcezza con questa fantastica maglietta",
          price: 19.99,
          inStock: 19
        },
        {
          id: 8,
          name: "T-Shirt Darth Vader",
          picture: "immagini/shop/shirt_vader.jpg",
          description:
          "Fai vedere a tutti chi è il vero imperatore della galassia",
          price: 19.99,
          inStock: 0
        },
        {
          id: 9,
          name: "T-Shirt Trooper",
          picture: "immagini/shop/shirt_trooper.jpg",
          description:
          "Un personaggio iconico della saga sempre con te!",
          price: 19.99,
          inStock: 3
        },
      ]
    },
    //nella sezione computed troviamo le funzioni che gestiscono i prezzi del carrello
    computed:{

      //itero su ogni elemento presente nella variabile locale cart.items tramite forEach()
      //aggiornando la variabile locale total che verrà restituita una volta finiti gli item
      cartTotal: function() {
        var total = 0;
        this.cart.items.forEach(function(item) {
          total += item.quantity * item.product.price;
        });
        return total;
      },

      //per simulare un prezzo reale
      taxAmount: function() {
        return this.cartTotal * 22 / 100;
      }
    },
    filters: {

      //questa funzione gestisce l'aggiunta della valuta
      //E' stata preferita per renderla adattabile a qualsiasi soluzione dello shop
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
      currency: function(value) {
        var formatter = new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0
        });
        return formatter.format(value);
      }
    },

    //nella sezione methods troviamo tutte le funzioni che gestiscono l'interazione con l'utente
    methods:{

      //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?page=1&tab=active#tab-top
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      //riferimento all'implementazione scelta
      getDay: function(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours() > 12 ? today.getHours() - 12 : (today.getHours() < 10 ? "0" + today.getHours() : today.getHours());
        var minute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
	      var seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
	      var meridium = String(today.getHours() > 12 ? "PM" : "AM");

        today = mm + '/' + dd + '/' + yyyy + ' | '+hour+':'+minute+':'+seconds+' '+meridium;
        return today;
      },

      //La funziona di Checkout oltre a ripulire la variabile locale, 
      //gestisce l'indirizzamento della variabile globale al php per costruire il cookie
      //sfruttato per salvare i dati dell'acquisto all'interno del DB
      checkout: function() {
        if (confirm('Sicuro di voler acquistare questi prodotti? Controlla bene il tuo carrello e conferma!')) {
          ext_cart[0][0]=$('#cartTotal').text(); //aggiungo totale
          ext_cart[0][1]=this.getDay(); //aggiungo data 
          var temp = JSON.stringify(ext_cart); //trasformo in stringa per salvare risultato in un cookie
          
          window.location.href = "php/salvataggioAcquisto.php?cart="+temp; //copio stringa in cart

          //L'utente verrà poi mandato alla pagina di Registrazione/Login per salvare l'acquisto
          alert("Acquisto finalizzato! Per salvare l'acquisto verrai reidirizzato alla pagina di Registrazione!")
          this.cart.items = [];
        }
      },

      //Funzione ausiliaria per capire se un certo prodotto si trova o meno nel carrello
      getCartItem: function(product) {
        for (var i = 0; i < this.cart.items.length; i++) {
          if (this.cart.items[i].product.id === product.id) {
            return this.cart.items[i];
          }
        }
        
        return null;
      },

      //funziona per rimuovere un certo oggetto dal carrello
      removeItemFromCart: function(cartItem) {
        var index = this.cart.items.indexOf(cartItem); //per sapere dove si trova l'item di interesse
        
        if (index !== -1) { //se esiste 
          this.cart.items.splice(index, 1); //usando splice() rimuovo 1 elemento nella posizione index

          //aggiorno anche la var global sfruttando l'id del prodotto per identificare la posizione nell'array
          //l'indice va decrementato di 1 poichè altrimenti l'elemento finale con id=9 non sarebbe utilizzabile
          //e anche tutti gli altri elementi si troverebbero shiftati di 1
          ext_cart[1][cartItem.product.id - 1][0] = '';
          ext_cart[1][cartItem.product.id - 1][1] = '';
          ext_cart[1][cartItem.product.id - 1][2] = 0;
        }
      },

      //funzione chiamata dal bottone nella grid dei prodotti
      addProductToCart: function(product) {

        //controllo se l'elemento è nel carrello
        var cartItem = this.getCartItem(product);
        
        //se è presente, incremento semplicemente la proprietà quantity in cartItem
        //posso fare questa operazione poichè getCartItem mi ha restituito quell'item
        //per quanto riguarda la variabile globale basta incrementare l'elemento con indice[2]
        if (cartItem != null) {
          ext_cart[1][product.id -1][2]++;
          cartItem.quantity++;

        //se non è presente, lo devo aggiungere
        //primma aggiorno la var globale sfruttando i dati di product
        //invece nella variabile locale this.cart.items usando push()
        //inserisco l'intera struttura dati product e la quantità 
        } else {
          ext_cart[1][product.id -1][0] = product.id;
          ext_cart[1][product.id -1][1] = product.name;
          ext_cart[1][product.id -1][2] = 1;
          this.cart.items.push({
            product: product,
            quantity: 1
          });
        }

        //aggiorno la disponibilità per renderlo un valore dinamico 
        product.inStock--;
      },

      //bottone di aggiunta nel carrello
      //sapendo che l'elemento è nel carrello, mi basta incrementare quantity
      //devo però aggiornare anche la proprietà inStock per negare l'aggiunta infinita di quel prodotto
      increaseQuantity: function(cartItem) {
        cartItem.product.inStock--;
        ext_cart[1][cartItem.product.id -1][2]++;
        cartItem.quantity++;;
      },

      //bottone rimozione carrello
      //finchè cartItem.quantity è != 0, lavoro solo con quantity
      //se raggiunge 0, dovrò proprio eliminare quell'item dal carrello
      //chiamando la funzione removeItemFromCart()
      decreaseQuantity: function(cartItem) {
        cartItem.quantity--;
        ext_cart[1][cartItem.product.id -1][2]--;
        cartItem.product.inStock++;
        if (cartItem.quantity == 0) {
          this.removeItemFromCart(cartItem);
        }
      },
    }
  })

$(document).ready(function() {
  $("#navShop").addClass("active"); //per attivare il glow nella navbar su Shop
});
  