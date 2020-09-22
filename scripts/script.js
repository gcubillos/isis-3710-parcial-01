// Url de donde se sacan los datos
let urlDatos = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"

// Variable en la que se van a guardar los datos
let jsonDatos = '';
// Pedir datos y guardarlos como un json
function pedirJSON(url) {
    return new Promise((response, rej) => {
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            if (req.status === 200) {
                response(this.responseText)
            }
            else {
                console.warn("F no se pudo pedir el JSON")
            }
        };
        req.send();
    })
}
pedirJSON(urlDatos).then(
    function(response){
    jsonDatos = JSON.parse(response);
    console.log(jsonDatos)
})
// Agregar eventlisteners a los distintos botones
let navegacionCategorias = document.getElementsByClassName("nav-item");
for (let i = 0; i < navegacionCategorias.length; i++) {
    navegacionCategorias[i].addEventListener("click",
    function(){
        // Cambiar el título de la sección
        document.getElementById("titulo-seccion").textContent = navegacionCategorias[i].textContent
        // Obtener índice del elemento
        // TODO: Revisar 
        let indiceElemento = navegacionCategorias[i].localName
        // Agregar los elementos a los cards
        let rowCards = document.getElementById("productos-asociados");
        // Iterar sobre los distintos elementos
        console.log(jsonDatos[indiceElemento])
        /*for (let j = 0; j < jsonDatos.length; j++) {
            const element = jsonDatos[j];
            
        }*/
        // Crear la columna con el div
        let divCol = document.createElement("div")
        // Se realiza con col-3 para que queden 4 productos cuando se muestre en la página
        divCol.classList.add("col-3")
        // Creación de la card
        let divCard = document.createElement("div")
        divCard.classList.add("card")

        // Imagen correspondiente a la tarjeta
        let imCard = document.createElement("img")
        imCard.classList.add("card-img-top")
        imCard.src = ""

    });
    
}