
// object("#dropdown-item").onclick = function(){
//     var output = document.getElementById('characterId')
//     output.innerHTML="img"+"CharaterDataContainer";
// };

// getCharacters= function(){
//     access marvel api
//     retrieve the questions within the list for each character
    

var PRIV_KEY = "509ef6241a118527ba0cc4159410064e07950f14";
var PUBLIC_KEY = "c75a405d177bd0e520a0611c6f73e954";

function getMarvelResponse() {
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
};

// var characterName 
// $getJSON (getCharacters)

// url= ("https://gateway.marvel.com:443/v1/public/characters");



        
        

     
     



// let dropdown = document.querySelector('.dropdown');
//        dropdown.addEventListener('click', function (event) {
//            event.stopPropagation();
//            dropdown.classList.toggle('is-active');
//        });

    //    $( "#Spider-Man" ).click(function() {
    //     console.log ("Spiderman" );
    //   });