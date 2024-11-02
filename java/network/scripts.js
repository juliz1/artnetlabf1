// Seleccionamos el contenedor de arte y el botón
const artContainer = document.getElementById('art-container');
const generateBtn = document.getElementById('generate-btn');

// Función para generar colores aleatorios en formato hexadecimal
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para generar formas geométricas aleatorias
function generateRandomShape() {
    // Crear un nuevo div que representará la forma
    const shape = document.createElement('div');
    
    // Definir un tamaño aleatorio para la forma
    const size = Math.floor(Math.random() * 200) + 50;
    
    // Establecer un tamaño cuadrado (ancho y alto)
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    // Colocar la forma en una posición aleatoria dentro del contenedor
    shape.style.position = 'absolute';
    shape.style.top = `${Math.random() * (artContainer.clientHeight - size)}px`;
    shape.style.left = `${Math.random() * (artContainer.clientWidth - size)}px`;

    // Establecer un color de fondo aleatorio
    shape.style.backgroundColor = randomColor();
    
    // Añadir una sombra para darle profundidad
    shape.style.boxShadow = `5px 5px 15px rgba(0, 0, 0, 0.5)`;

    // Establecer una forma aleatoria (círculo o cuadrado)
    const borderRadius = Math.random() > 0.5 ? '50%' : '0';
    shape.style.borderRadius = borderRadius;

    // Añadir un ligero efecto de glitch aleatorio
    if (Math.random() > 0.7) {
        shape.style.transform = `skew(${Math.random() * 20}deg, ${Math.random() * 20}deg)`;
    }

    // Agregar la forma al contenedor
    artContainer.appendChild(shape);
}

// Función para limpiar y generar una nueva obra de arte
function generateArt() {
    // Limpiar el contenedor antes de generar una nueva obra
    artContainer.innerHTML = '';

    // Generar entre 5 y 15 formas aleatorias
    const shapeCount = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < shapeCount; i++) {
        generateRandomShape();
    }
}

// Generar una obra de arte cuando se hace clic en el botón
generateBtn.addEventListener('click', generateArt);

// Generar una obra de arte cuando se carga la página
window.onload = generateArt;
