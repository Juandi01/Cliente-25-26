let colores = ["red", "green", "white", "blue", "brown", "pink", "black"];
let franjas = prompt("Introduce el numero de franjas (entre 1 y 5): ");

while (franjas < 1 || franjas > 5 || isNaN(franjas)) {
    alert("El numero de franjas debe estar entre 1 y 5");
    franjas = prompt("Introduce el numero de franjas (entre 1 y 5): ");
}


/*
// Apartado a

for (let i = 0; i < franjas; i++) {
    let color = colores[Math.floor(Math.random() * colores.length)];
    document.writeln("<table style='width:20%; height:100px; background-color:" + color + ";'></table>");
}


// Apartado b

// Creo una copia del array para no modificar el original
let coloresDisponibles = [...colores];

for (let i = 0; i < franjas; i++) {
    // Genero índice aleatorio dentro del array disponible
    let indiceAleatorio = Math.floor(Math.random() * coloresDisponibles.length);
    
    // Selecciono el color en esa posición
    let color = coloresDisponibles[indiceAleatorio];
    
    //Elimino ese color del array con splice()
    coloresDisponibles.splice(indiceAleatorio, 1);
    
    document.writeln("<table style='width:20%; height:100px; background-color:" + color + ";'></table>");
}
*/
// Apartado c


//Declaro una variable color anterior vacia
let colorAnterior; 

for (let i = 0; i < franjas; i++) {
    let color;
    //Genero un color aleatorio, que en la primera iteracion no tiene color anterior
    do {
        color = colores[Math.floor(Math.random() * colores.length)];
       //console.log("Color en el bucle " + color);
    } while (color === colorAnterior); // A partir de la segunda iteracion si el color generado aleatoriamente es igual que el antrior, vuelve a entrar en el bucle 
    
    //console.log("Color antes de igualarlo a color anterior " + color);
    // Igualo el colo para la siguiente iteracion
    colorAnterior = color;
    //console.log(colorAnterior);
    //console.log("Color despues de igualarlo a color anterior " + color);
    document.writeln("<table style='width:20%; height:100px; background-color:" + color + ";'></table>");
}
