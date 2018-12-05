
object("#dropdown-item").onclick = function(){
    var output = document.getElementById('characterId')
    output.innerHTML="img"+"CharaterDataContainer";
};

//getCharacters= function(){
    //access marvel api
    //retrieve the questions within the list for each character
    //
//};

let dropdown = document.querySelector('.dropdown');
       dropdown.addEventListener('click', function (event) {
           event.stopPropagation();
           dropdown.classList.toggle('is-active');
       });