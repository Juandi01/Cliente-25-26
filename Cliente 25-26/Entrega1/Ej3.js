// Programa para calcular el presupeusto de una obra 

const MATERIALES = 0.5;
const MANO_DE_OBRA = 0.2;
const LICENCIA = 0.3; 

let presupuesto = prompt("Introduce el presupuesto de la obra: ");
console.log(presupuesto);

if (presupuesto <= 0 || isNaN(presupuesto)) {
    document.writeln("<h1>El presupuesto debe ser positivo y mayor que 0</h1>");
    console.log(presupuesto);
}else{
    document.writeln("<h1>Presupuesto de la obra</h1>");
    document.writeln("<ol>");
    document.writeln("<li>Presupuesto total: " + presupuesto + "€</li>");
    document.writeln("<li>Materiales (50%): " + (presupuesto * MATERIALES) + "€</li>");
    document.writeln("<li>Mano de obra (20%): " + (presupuesto * MANO_DE_OBRA) + "€</li>");
    document.writeln("<li>Licencia (30%): " + (presupuesto * LICENCIA) + "€</li>");
    document.writeln("</ol>");
}
