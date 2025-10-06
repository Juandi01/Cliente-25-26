let array = [];
let array2 = [];
let arrayNoIguales = [];

let cantidadElementos1 = parseInt(prompt("Ingrese la cantidad de elementos del primer array:"));
let cantidadElementos2 = parseInt(prompt("Ingrese la cantidad de elementos del segundo array:"));

for (let i = 0; i < cantidadElementos1; i++) {
    let elemento = prompt(`Ingrese el elemento ${i + 1} del primer array:`);
    array.push(elemento);
}

for (let i = 0; i < cantidadElementos2; i++) {
    let elemento = prompt(`Ingrese el elemento ${i + 1} del segundo array:`);
    array2.push(elemento);
}

console.log("Primer array:", array);
console.log("Segundo array:", array2);


// Elementos del array1 que NO están en array2
for (let elemento of array) {
    if (!array2.includes(elemento)) {
        arrayNoIguales.push(elemento);
    }
}

// Elementos del array2 que NO están en array1
for (let elemento of array2) {
    if (!array.includes(elemento)) {
        // Verifico que no esté ya en el array (evitar duplicados)
        if (!arrayNoIguales.includes(elemento)) {
            arrayNoIguales.push(elemento);
        }
    }
}

console.log("Elementos no comunes en ambos arrays:", arrayNoIguales);




