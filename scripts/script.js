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