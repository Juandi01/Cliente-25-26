// Variables globales
let filas = 0;
let columnas = 0;
let tableroLogico = []; 

function iniciarJuego() {
    let tamaño = prompt("Introduce el tamaño del tablero:");
    tamaño = parseInt(tamaño);

    if (isNaN(tamaño) || tamaño < 2) {
        alert("Introduce un número válido mayor a 1.");
        return;
    }

    filas = tamaño;
    columnas = tamaño;

    generarTableros(tamaño);

    // Por ejemplo, pongo el 15% de las celdas como minas
    let totalCeldas = filas * columnas;
    let numeroMinas = Math.floor(totalCeldas * 0.15); 
    
    ponerMinas(numeroMinas);
    generarNumeros();
}

function generarTableros(tamaño) {
    const tableroDOM = document.getElementById("tablero");
    
    tableroDOM.innerHTML = "";
    tableroLogico = [];

    for (let i = 0; i < filas; i++) {
        let filaLogica = [];
        
        // 1. Crear un contenedor para la fila visual
        const filaDOM = document.createElement("div");
        filaDOM.classList.add("fila");

        for (let j = 0; j < columnas; j++) {
            filaLogica.push(0); 

            // 2. Crear la celda
            const celda = document.createElement("div");
            celda.classList.add("celda");
            celda.dataset.fila = i; // Dataset asigna datos personalizados a los elementos HTML en este caso se usan para identificar la posición
            celda.dataset.col = j; // Y no tener que hacer calculos para saber que mina estamos pulsando
            

            // Añado el evento click a la celda
            celda.addEventListener("click", (e) => {
                manejarClick(i, j, celda); 
            });
            // 3. Meter la celda DENTRO de la fila
            filaDOM.appendChild(celda);
        }
        
        // 4. Meter la fila completa DENTRO del tablero
        tableroDOM.appendChild(filaDOM);
        tableroLogico.push(filaLogica);
    }
    console.log("Tablero generado con estructura de filas.");
}


function ponerMinas(cantidad) {
    let minasColocadas = 0;

    while (minasColocadas < cantidad) {
        // Generar coordenadas aleatorias
        // Math.random() da un número entre 0 y 0.99
        // Lo multiplico por filas y redondeo hacia abajo con floor
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);

        // Verifico si ya hay una mina ahí para no repetir
        if (tableroLogico[f][c] !== "MINA") {
            tableroLogico[f][c] = "MINA";
            minasColocadas++;
        }
    }
    
    console.log("Tablero Lógico con minas:", tableroLogico);
    // Desde la consola del navegador puedo ver el tablero lógico
}


// Función que se ejecuta al hacer click en una celda
function manejarClick(fila, col, celdaDOM) {
    // Si ya está abierta, no hacemos nada
    if (celdaDOM.classList.contains("revelada")) return;

    let valor = tableroLogico[fila][col];

    // CASO 1: Es una MINA (Fin del juego)
    if (valor === "MINA") {
        celdaDOM.innerHTML = "💣";
        celdaDOM.classList.add("revelada");
        celdaDOM.style.backgroundColor = "red";
        celdaDOM.style.color = "white";
        alert("¡BOOM! Fin del juego.");
    } 
    // CASO 2: Es un 0 (Expandimos)
    else if (valor === 0) {
        expandirCasillas(fila, col);
    } 
    // CASO 3: Es un número (Solo mostramos este)
    else {
        celdaDOM.classList.add("revelada");
        celdaDOM.innerText = valor;
    }
}

function generarNumeros() {
    // Recorremos todo el tablero celda por celda
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            
            // Si la celda actual ya es una mina, no necesitamos contar números
            if (tableroLogico[i][j] === "MINA") {
                continue; // Saltamos a la siguiente iteración del bucle
            }

            let contador = 0;

            // Logica para contar minas alrededor
            
            // Bucle para mirar la fila de arriba, la actual y la de abajo (-1, 0, 1)
            for (let x = -1; x <= 1; x++) {
                // Bucle para mirar columna izquierda, actual y derecha (-1, 0, 1)
                for (let y = -1; y <= 1; y++) {
                    
                    // Calculamos la coordenada del vecino que queremos mirar
                    let filaVecino = i + x;
                    let colVecino = j + y;

                    // 1. VALIDACIÓN DE BORDES:
                    // Verificamos que el vecino esté DENTRO del tablero
                    // (fila >= 0 y fila < total, etc.)
                    if (filaVecino >= 0 && filaVecino < filas && 
                        colVecino >= 0 && colVecino < columnas) {
                        
                        // 2. VERIFICAR MINA:
                        // Si ese vecino es una mina, sumamos 1 al contador
                        if (tableroLogico[filaVecino][colVecino] === "MINA") {
                            contador++;
                        }
                    }
                }
            }
            
            // Guardamos el número final en nuestra matriz lógica
            tableroLogico[i][j] = contador;
        }
    }
    
    console.log("Tablero Lógico final con números:", tableroLogico);
}

function expandirCasillas(f, c) {
    // 1. VALIDACIÓN DE BORDES 
    // Si nos salimos del tablero, paramos.
    if (f < 0 || f >= filas || c < 0 || c >= columnas) return;

    // 2. OBTENER ELEMENTO DOM
    // Buscamos el div específico en el HTML usando los índices
    const filaDOM = document.getElementById("tablero").children[f];
    const celdaDOM = filaDOM.children[c];

    // 3. VALIDACIÓN DE ESTADO
    // Si ya está revelada, no hacemos nada (evita bucles infinitos)
    if (celdaDOM.classList.contains("revelada")) return;

    // 4. REVELAR LA CELDA
    celdaDOM.classList.add("revelada");
    
    let valor = tableroLogico[f][c];

    // Si es un número (1-8), lo mostramos y paramos aquí.
    if (valor > 0) {
        celdaDOM.innerText = valor;
        return; 
    }

    // 5. RECURSIVIDAD (Si es 0)
    // Si el valor es 0, no escribimos nada (queda vacío), 
    // PERO llamamos a esta misma función para los 8 vecinos.
    if (valor === 0) {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                // Llamada recursiva: La función se llama a sí misma
                expandirCasillas(f + x, c + y);
            }
        }
    }
}
iniciarJuego();