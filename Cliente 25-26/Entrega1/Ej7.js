let numeros = [];

for (let i = 0; i < 10; i++) {
    let numero = parseInt(prompt(`Introduce el número ${i + 1}:`));
    numeros.push(numero);
}

console.log("Contenido del array:");
document.writeln("<h2>Contenido del array:</h2>");
document.writeln("<table border='1' style='border-collapse: collapse;'>");
document.writeln("<tr><th>Índice</th><th>Valor</th></tr>");

for (let i = 0; i < numeros.length; i++) {
    console.log(`Índice ${i}: ${numeros[i]}`);
    document.writeln(`<tr><td>${i}</td><td>${numeros[i]}</td></tr>`);
}
document.writeln("</table>");

let inicial, final;

do {
    inicial = parseInt(prompt("Introduce la posición inicial (0-9):"));
    final = parseInt(prompt("Introduce la posición final (0-9):"));
    
    if (isNaN(inicial) || isNaN(final)) {
        alert("Debes introducir números válidos");
        continue;
    }
    
    if (inicial < 0 || inicial > 9 || final < 0 || final > 9) {
        alert("Las posiciones deben estar entre 0 y 9");
        continue;
    }
    
    if (inicial >= final) {
        alert("La posición inicial debe ser menor que la final");
        continue;
    }
    
    break;
    
} while (true);

console.log(`Posición inicial: ${inicial}, Posición final: ${final}`);

// Muestro el array antes del movimiento
console.log("Array antes del movimiento:", numeros);
document.writeln(`<h3>Array antes del movimiento:</h3>`);
document.writeln(`<p>[${numeros.join(", ")}]</p>`);

// Realizo el movimiento: mover elemento y desplazo todo el array
let elementoAMover = numeros[inicial];

// Creo un nuevo array con el desplazamiento
let numerosDesplazados = [];

// Copio todos los elementos excepto el de la posición inicial
for (let i = 0; i < numeros.length; i++) {
    if (i !== inicial) {
        numerosDesplazados.push(numeros[i]);
    }
}

// Insertar el elemento movido en la posición final (ajustada)
// Como eliminamos un elemento, la posición final se ajusta
let posicionFinalAjustada = final > inicial ? final - 1 : final;
// SPLICE: Inserta el elementoAMover en la posición final sin eliminar nada
// Parámetros: (posición, elementos_a_eliminar, elemento_a_insertar)
// splice(posición, 0, elemento) = insertar sin eliminar
numerosDesplazados.splice(posicionFinalAjustada, 0, elementoAMover);

//Declaro un array final para el desplazamiento
let arrayFinal = [];

//El último elemento pasa a la primera posición
arrayFinal.push(numerosDesplazados[numerosDesplazados.length - 1]);

// Los demás elementos se desplazan una posición
for (let i = 0; i < numerosDesplazados.length - 1; i++) {
    arrayFinal.push(numerosDesplazados[i]);
}

// Asignar el array final
numeros = arrayFinal;

// Muestro el array después del movimiento
console.log("Array después del movimiento:", numeros);
document.writeln(`<h3>Array después del movimiento:</h3>`);
document.writeln(`<p>[${numeros.join(", ")}]</p>`);

// Muestro el array final con índices
document.writeln("<h3>Array final con índices:</h3>");
document.writeln("<table border='1' style='border-collapse: collapse;'>");
document.writeln("<tr><th>Índice</th><th>Valor</th></tr>");

for (let i = 0; i < numeros.length; i++) {
    document.writeln(`<tr><td>${i}</td><td>${numeros[i]}</td></tr>`);
}
document.writeln("</table>");

document.writeln(`<p><strong>Se movió el elemento ${elementoAMover} de la posición ${inicial} a la posición ${final}</strong></p>`);