let colores = ["red", "green", "white", "blue", "brown", "pink", "black"];
//Declaro dos arrays distontos, uno para los colores y otro para las palabras que no son colores
let colores2 = [];
let noColores = [];

//Pido 9 palabras al usuario
for (let i = 0; i < 9; i++) {
    let palabra = prompt("Introduce una palabra:");
    palabra = palabra.trim();
    // Con el metodo includes compruebo si la palabra introducida esta en el array colores
    if (colores.includes(palabra)) {
        colores2.push(palabra);
    // Si no lo esta la añado al array de no colores
    } else {
        noColores.push(palabra);
    }
}
//Con el metodo concat, concateno primero los colores y luego los no colores
let palabrasOrdenadas = colores2.concat(noColores);

//El metodo join une todos los elementos de un array en un string y los separa con lo que le indiques
document.writeln("Palabras introducidas: " + palabrasOrdenadas.join(", ") + "<br>");


