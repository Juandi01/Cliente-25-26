//Programa que clasifica a corredores segun la cantidad de kilometros que corre a la semana

let kilometros = prompt("Cuandos kilometros corres al dia?: ");
console.log(kilometros);

const DIASSEMANA = 7;
const NOVATO = 10;
const INICIADO = 30;
const EXPERTO = 50;

//Bucle para que si el numero introducido no es positivo lo vuelva a pedir
while (kilometros < 0 || isNaN(kilometros)) {
    alert("El numero debe ser positivo");
    kilometros = prompt("Cuantos kilometros corres al dia?: ");
    console.log(kilometros);
}

//Aplicamos la logica para clasificar al corredor
let kmSemana = kilometros * DIASSEMANA;
console.log("Corres " + kmSemana + " kilometros a la semana");

if (kmSemana < NOVATO) {
    console.log("Eres un corredor NOVATO");
    document.writeln("Eres un corredor NOVATO");
    document.writeln("<br>");
} else if (kmSemana >= NOVATO && kmSemana < INICIADO) {
    console.log("Eres un corredor INICIADO");
    document.writeln("Eres un corredor INICIADO");
    document.writeln("<br>");
}   else if (kmSemana >= INICIADO && kmSemana < EXPERTO) {
    console.log("Eres un corredor EXPERTO");
    document.writeln("Eres un corredor EXPERTO");
    document.writeln("<br>");
} else {
    console.log("Eres IRON MAN");
    document.writeln("Eres IRON MAN");
    document.writeln("<br>");
}