// Juego del Buscaminas

//Pido el tamaño del tablero
let tamaño = parseInt(prompt("Introduce el tamaño del tablero (mínimo 3):"));
while (isNaN(tamaño) || tamaño < 3) {
    tamaño = parseInt(prompt("Entrada inválida. Introduce el tamaño del tablero (mínimo 3):"));
}

//Defino el numero de minas (20% del total de casillas)
let numMinas = Math.floor(tamaño * tamaño * 0.2);

function generarTablero(tamaño) {
    let tablero = [];
    for (let i = 0; i < tamaño; i++) {
        let fila = [];
        for (let j = 0; j < tamaño; j++) {
            fila.push(0);
        }
        tablero.push(fila);
    }
    return tablero;
}

generarTablero(tamaño);

function colocarMinas(tablero, numMinas, tamaño) {
    let colocadas = 0;
    while (colocadas < numMinas) {
        let fila = Math.floor(Math.random() * tamaño);
        let col = Math.floor(Math.random() * tamaño);
        if (tablero[fila][col] === 0) {
            tablero[fila][col] = "*";
            colocadas++;
        }
    }
}

// Función para generar tablero visible (todo "X")
function generarTableroVisible(tamaño) {
    let tablero = [];
    for (let i = 0; i < tamaño; i++) {
        let fila = [];
        for (let j = 0; j < tamaño; j++) {
            fila.push("X");
        }
        tablero.push(fila);
    }
    return tablero;
}

// Función para calcular números (minas adyacentes)
function calcularNumeros(tablero, tamaño) {
    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {
            if (tablero[i][j] !== "*") {
                let minasAdyacentes = 0;
                
                // Reviso las 8 casillas adyacentes
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        let nuevaFila = i + di;
                        let nuevaColumna = j + dj;
                        
                        // Verifico que esté dentro del tablero
                        if (nuevaFila >= 0 && nuevaFila < tamaño && 
                            nuevaColumna >= 0 && nuevaColumna < tamaño) {
                            if (tablero[nuevaFila][nuevaColumna] === "*") {
                                minasAdyacentes++;
                            }
                        }
                    }
                }
                tablero[i][j] = minasAdyacentes;
            }
        }
    }
}

// Función para mostrar el tablero visible
function mostrarTablero(tablero) {
    console.clear(); // Limpiar consola para mejor visualización
    console.log("=== BUSCAMINAS ===");
    console.table(tablero);
}

// Función para validar coordenadas
function validarCoordenadas(fila, col, tamaño) {
    return !isNaN(fila) && !isNaN(col) && 
           fila >= 0 && fila < tamaño && 
           col >= 0 && col < tamaño;
}

// Función para descubrir casilla (recursiva para casillas vacías)
function descubrirCasilla(fila, col, tableroInterno, tableroVisible, tamaño) {
    // Verificar límites
    if (fila < 0 || fila >= tamaño || col < 0 || col >= tamaño) {
        return;
    }
    
    // Si ya está descubierta, no hacer nada
    if (tableroVisible[fila][col] !== "X") {
        return;
    }
    
    // Descubrir la casilla
    tableroVisible[fila][col] = tableroInterno[fila][col];
    
    // Si es una casilla vacía (0), descubrir casillas adyacentes recursivamente
    if (tableroInterno[fila][col] === 0) {
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                descubrirCasilla(fila + di, col + dj, tableroInterno, tableroVisible, tamaño);
            }
        }
    }
}

// Función para verificar si el jugador ha ganado
function verificarVictoria(tableroInterno, tableroVisible, tamaño) {
    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {
            // Si hay casillas sin descubrir que no sean minas
            if (tableroVisible[i][j] === "X" && tableroInterno[i][j] !== "*") {
                return false;
            }
        }
    }
    return true;
}

// Función para pedir coordenadas al jugador
function pedirCoordenadas(tamaño) {
    let fila = parseInt(prompt("Introduce la fila (0 a " + (tamaño - 1) + "):"));
    let col = parseInt(prompt("Introduce la columna (0 a " + (tamaño - 1) + "):"));
    return { fila, col };
}

// Función principal del juego
function jugarBuscaminas() {
    // Crear tableros
    let tableroInterno = generarTablero(tamaño);
    let tableroVisible = generarTableroVisible(tamaño);
    
    // Configurar tablero
    colocarMinas(tableroInterno, numMinas, tamaño);
    calcularNumeros(tableroInterno, tamaño);
    
    console.log("Tablero interno (para debugging):");
    console.table(tableroInterno);
    
    let juegoTerminado = false;
    
    // Bucle principal del juego
    while (!juegoTerminado) {
        // Mostrar tablero actual
        mostrarTablero(tableroVisible);
        
        // Pedir coordenadas al jugador
        let coordenadas = pedirCoordenadas(tamaño);
        let fila = coordenadas.fila;
        let col = coordenadas.col;
        
        // Validar coordenadas
        if (!validarCoordenadas(fila, col, tamaño)) {
            alert("Coordenadas inválidas. Intenta de nuevo.");
            continue;
        }
        
        // Verificar si la casilla ya está descubierta
        if (tableroVisible[fila][col] !== "X") {
            alert("Esta casilla ya está descubierta. Elige otra.");
            continue;
        }
        
        // Verificar si hay una mina
        if (tableroInterno[fila][col] === "*") {
            // ¡BOOM! El jugador perdió
            tableroVisible[fila][col] = "*";
            mostrarTablero(tableroVisible);
            alert("¡BOOM! Has perdido");
            console.log("¡BOOM! Has perdido");
            juegoTerminado = true;
        } else {
            // Descubrir la casilla (y adyacentes si es vacía)
            descubrirCasilla(fila, col, tableroInterno, tableroVisible, tamaño);
            
            // Verificar si el jugador ha ganado
            if (verificarVictoria(tableroInterno, tableroVisible, tamaño)) {
                mostrarTablero(tableroVisible);
                alert("¡Enhorabuena, has ganado!");
                console.log("¡Enhorabuena, has ganado!");
                juegoTerminado = true;
            }
        }
    }
    
    console.log("Fin del juego");
}

// Iniciar el juego
jugarBuscaminas();
 