//Script que pide un numero N positivo mayor que 0
let num = prompt("Introduce un numero positivo: ");
console.log(num);

//Bucle para que si el numero introducido no es positivo lo vuelva a pedir 
while (num <= 0 || isNaN(num)) {
    alert("El numero debe ser positivo y mayor que 0");
    num = prompt("Introduce un numero positivo: ");
    console.log(num);
}

//Calculamos los divisores del numero N
let divisores = [];

for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
        divisores.push(i);
    }
}

console.log("Los divisores de " + num + " son: " + divisores);
document.writeln("Los divisores de " + num + " son: " + divisores);
document.writeln("<br>");

// Calculamos los cuadrados de los divisores con una funcion anomnima

let cuadrados = divisores.map(function(divisor) {
    return divisor * divisor;
});

//Y su suma con otra funcion anomnima
let suma = cuadrados.reduce(function(a,b){
    return a + b;
});

console.log("Los cuadrados de los divisores son: " + cuadrados);
console.log("La suma de los cuadrados de los divisores es: " + suma);
document.writeln("Los cuadrados de los divisores son: " + cuadrados);
document.writeln("<br>");
document.writeln("La suma de los cuadrados de los divisores es: " + suma);
document.writeln("<br>");

// Comprobams si el numero es un cuadrado 

// Calculamos la raíz cuadrada de la suma
let raizCuadrada = Math.sqrt(suma);

// Comprobamos si es un número entero usando Number.isInteger()
if (Number.isInteger(raizCuadrada)) {
    console.log("¡La suma " + suma + " SÍ es un cuadrado perfecto!");
} else {
    console.log("La suma no es un cuadrado perfecto");
}

