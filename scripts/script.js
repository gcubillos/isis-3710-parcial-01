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
    function (response) {
        jsonDatos = JSON.parse(response);
        console.log(jsonDatos)
    })

// Agregar eventlisteners a los distintos botones de categorias
let navegacionCategorias = document.getElementsByClassName("nav-item");
for (let i = 0; i < navegacionCategorias.length; i++) {
    navegacionCategorias[i].addEventListener("click", mostrarCategoria => {
        // Cambiar el título de la sección
        document.getElementById("titulo-seccion").textContent = navegacionCategorias[i].textContent
        // Obtener índice del elemento
        let indiceElemento = parseInt((navegacionCategorias[i].id).substring(4, (navegacionCategorias[i].id).length));
        // Agregar los elementos a los cards
        let rowCards = document.getElementById("productos-asociados");
        console.log()
        // Se asume que siempre se utiliza el key de products
        for (let j = 0; j < jsonDatos[indiceElemento].products.length; j++) {
            // Crear la columna con el div
            let divCol = document.createElement("div")
            // Se realiza con col-3 para que queden 4 productos cuando se muestre en la página
            divCol.classList.add("col-3")
            // Creación de la card
            let divCard = document.createElement("div")
            divCard.classList.add("card")
            // Agregar como hijo de la columna
            divCol.appendChild(divCard);

            // Imagen correspondiente a la tarjeta
            let imCard = document.createElement("img")
            imCard.classList.add("card-img-top")
            // Ruta de la imagen a la tarjeta
            // TODO: Estandarizar el tamaño de las fotos
            imCard.src = jsonDatos[indiceElemento].products[j].image;
            // Texto alternativo por si no sale la imagen
            imCard.alt = jsonDatos[indiceElemento].products[j].name;
            // Agregar como hijo de la card
            divCard.appendChild(imCard);

            // Creación del cuerpo de la card
            let divBody = document.createElement("div");
            divBody.classList.add("card-body")
            // Agregar como hijo de la card
            divCard.appendChild(divBody);

            // Creación del título de la card
            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            let textoTitle = document.createTextNode(jsonDatos[indiceElemento].products[j].name);
            cardTitle.appendChild(textoTitle);
            // Agregar como hijo del cuerpo
            divBody.appendChild(cardTitle)

            // Creación del cuerpo de la card
            let cardText = document.createElement("p");
            cardText.classList.add("card-text")
            let textoCard = document.createTextNode(jsonDatos[indiceElemento].products[j].description);
            cardText.appendChild(textoCard);
            // Agregar como hijo del cuerpo
            divBody.appendChild(cardText)

            // Texto precio
            let pPrecio = document.createElement("p");
            pPrecio.classList.add("precio");
            let textoPrecio = document.createTextNode("$"+jsonDatos[indiceElemento].products[j].price);
            pPrecio.appendChild(textoPrecio)
            cardText.appendChild(pPrecio)

            // Creación del botón de agregar carro de compras
            let butCarroCompras = document.createElement("a");
            // Agregar estilo de Bootstrap
            butCarroCompras.classList.add("btn");
            butCarroCompras.classList.add("btn-primary")
            // Texto del botón
            let textButCarro = document.createTextNode("Add to car");
            butCarroCompras.appendChild(textButCarro);
            // Agregar como hijo del cuerpo
            divBody.appendChild(butCarroCompras)
            // Agregar listener por si se da clic
            butCarroCompras.addEventListener("click", agregarACarro => {
                // TODO: Cambiar el número que se muestra
                let numItemsCarro = Number.parseInt(document.getElementById("num-items").innerText);

            })
            // Agregar card al body
            rowCards.appendChild(divCol);
        }





    });

}

// Event Listener para el carrito de compras
let butCarroCompras = document.getElementById("carro-compras");
butCarroCompras.addEventListener("click", resumenDePedido => {
    // Modificar el título de la sección
    document.getElementById("titulo-seccion").textContent = "Order detail";

    // Crear tabla en donde se van a poner los elementos
    let tablaResumen = document.createElement("table");
    // Agregar estilos en tabla
    tablaResumen.classList.add("table");
    tablaResumen.classList.add("table-striped");

    // Crear headers tabla
    let headerTabla = tablaResumen.createTHead();
    let rowHeader = headerTabla.insertRow();
    // Se crean los headers uno por uno
    // Array con los titulos de los headers
    let titulosHeaders = Array("Item", "Qty.", "Description", "Unit Price", "Amount");
    console.log(typeof (titulosHeaders))
    for (let i = 0; i < titulosHeaders.length; i++) {
        let th = document.createElement("th");
        let textoHeader = document.createTextNode(titulosHeaders[i]);
        th.appendChild(textoHeader);
        // Agregar la fila a la tabla
        rowHeader.appendChild(th);
    }
    // Crear body de la tabla
    let bodyTabla = tablaResumen.createTBody();
    let rowBody = bodyTabla.insertRow();
    let datoBody = rowBody.insertCell();
    //TODO: Mostrar información del pedido
    //TODO: Total del pedido
    //TODO: Botones del pedido

    // Agregar tabla a contenido principal
    document.getElementById("resumen-orden").appendChild(tablaResumen);


})

// TODO: Evitar que se sobrepongan los elementos al refrescar la página