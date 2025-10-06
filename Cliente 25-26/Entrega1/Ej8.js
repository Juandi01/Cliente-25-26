// Aplicación para gestionar mesas de restaurante
// Cada mesa puede tener de 0 a 4 comensales

// 1. Pido el número de mesas del restaurante
let numeroMesas = parseInt(prompt("¿Cuántas mesas tiene el restaurante?"));

// Valido que sea un número válido
while (isNaN(numeroMesas) || numeroMesas <= 0) {
    alert("Debe introducir un número válido de mesas mayor que 0");
    numeroMesas = parseInt(prompt("¿Cuántas mesas tiene el restaurante?"));
}

// 2. Creo array de mesas con valores aleatorios (0-4)
let mesas = [];
for (let i = 0; i < numeroMesas; i++) {
    mesas[i] = Math.floor(Math.random() * 5); // 0, 1, 2, 3, o 4
}

// Función para mostrar el estado de las mesas
function mostrarMesas() {
    console.log("\n=== ESTADO DE LAS MESAS ===");
    document.writeln("<h3>Estado de las Mesas:</h3>");
    document.writeln("<table border='1' style='border-collapse: collapse; margin: 10px;'>");
    document.writeln("<tr><th>Mesa</th><th>Ocupación</th><th>Estado</th></tr>");
    
    for (let i = 0; i < mesas.length; i++) {
        let estado = "";
        if (mesas[i] === 0) {
            estado = "LIBRE";
        } else if (mesas[i] === 4) {
            estado = "COMPLETA";
        } else {
            estado = `${4 - mesas[i]} huecos`;
        }
        
        console.log(`Mesa ${i + 1}: ${mesas[i]}/4 personas (${estado})`);
        document.writeln(`<tr><td>Mesa ${i + 1}</td><td>${mesas[i]}/4</td><td>${estado}</td></tr>`);
    }
    document.writeln("</table>");
}

// Función para buscar mesa para un grupo
function buscarMesa(tamañoGrupo) {
    // 1. Busco primero una mesa completamente libre (0 personas)
    for (let i = 0; i < mesas.length; i++) {
        if (mesas[i] === 0) {
            return i; // Devuelve el índice de la primera mesa libre
        }
    }
    
    // 2. Si no hay mesas libres, busca una con hueco suficiente
    for (let i = 0; i < mesas.length; i++) {
        let espacioDisponible = 4 - mesas[i];
        if (espacioDisponible >= tamañoGrupo) {
            return i; // Devuelve el índice de la mesa con hueco
        }
    }
    
    // 3. Si no se encuentra mesa, devuelvo -1
    return -1;
}

// Muestro estado inicial de las mesas
document.writeln("<h2> Sistema de Gestión de Mesas del Restaurante</h2>");
document.writeln("<h3>Estado inicial de las mesas:</h3>");
mostrarMesas();

// 3. Bucle principal para atender grupos
let grupoNumero = 1;

while (true) {
    // Pido el tamaño del grupo
    let tamañoGrupo = parseInt(prompt(`Grupo #${grupoNumero}: ¿Cuántas personas son? (número negativo para salir)`));
    
    // Si es negativo, salgo del programa
    if (tamañoGrupo < 0) {
        document.writeln("<h3>Programa finalizado. ¡Gracias por usar nuestro sistema!</h3>");
        break;
    }
    
    // Compruebo que sea un número válido
    if (isNaN(tamañoGrupo)) {
        alert("Debe introducir un número válido");
        continue;
    }
    
    // Compruebo que no sea 0
    if (tamañoGrupo === 0) {
        alert("Un grupo debe tener al menos 1 persona");
        continue;
    }
    
    // Compruebo que no sea mayor que 4
    if (tamañoGrupo > 4) {
        alert(`Lo siento, no admitimos grupos de ${tamañoGrupo}, haga grupos de 4 personas como máximo e intente de nuevo`);
        continue;
    }
    
    // Buscar mesa disponible
    let mesaAsignada = buscarMesa(tamañoGrupo);
    
    if (mesaAsignada === -1) {
        // No hay mesa disponible
        alert(`Lo siento, no hay mesa disponible para ${tamañoGrupo} personas en este momento`);
        document.writeln(`<p style='color: red;'> <strong>Grupo #${grupoNumero}</strong>: No hay mesa para ${tamañoGrupo} personas</p>`);
    } else {
        // Asignar mesa
        mesas[mesaAsignada] += tamañoGrupo;
        document.writeln(`<p style='color: green;'> <strong>Grupo #${grupoNumero}</strong>: ${tamañoGrupo} personas asignadas a la Mesa ${mesaAsignada + 1}</p>`);
        console.log(`Grupo #${grupoNumero}: ${tamañoGrupo} personas sentadas en Mesa ${mesaAsignada + 1}`);
    }

    // Muestro estado actualizado de las mesas
    mostrarMesas();
    
    grupoNumero++;
}

console.log("Programa finalizado");
