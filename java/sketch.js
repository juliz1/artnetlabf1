//_______________________________VARIABLES__________________________
//variables de la font i imatges que es defineixen en el preload

  var font, fondo2,fondo3,  mujer, mujeria;


/*variable per poder canviar d'estat (true /false) al fer clic (mousePressed) i mostrar diferents elements (mitjançant switch / case). En tots els casos de switch, true mostrara el borrador i false el final.*/

  let borrador = true; //variable boolerana para manejar el estado

//variables globals per controlar la rotació els cercles
  
  let rot1 = 0; // Cercle gran (circulo1)
  let rot2 = 0; // Cercle petit (circulo2)

/* LListes per guardar els angles de rotació, d'aquesta forma quan els usa a les funcions, només farà falta calcular els angles  al setup. Ho he fet d'aquesta forma per maniobrar amb més facilitat la posició i quantitat d'elements als cercles. */

  let angulos1 = [];
  let angulos2 = [];

//variables per cambiar les imatges del fons
  let fondoActual = 1; /* Variable per controlar la imatge de fondo actual, l'inicio en 1 perquè hi han tres imatges i així el controlo amb més facilitat*/
  let ultimoCambio = 0; // Variable para guardar el frame de l'ultim canvi

/*Llista amb parametres de colors per quan borrador es false, així els modifico amb facilitat per fer que el canvas resultant quedi visualment equilibrada*/
let colores = [
  //letra
  'rgb(147,45,45)', //titol
  'rgb(91,91,91)', //texto2
  
  //base
  'rgb(225,195,142)', //fondo rect
  
  //arco
  'rgb(150, 180, 200)', //triangle
  ' green', //elipses 

  //circulo

  'orange',// elipses cercle principal
  'rgb(140, 170, 150)',
    'rgba(255, 255, 255, 0.49)' /* color blanc translucid. la 'a' de 'rgba' correspond a 'alfa' i amb el  valor'0.49' estableixo el 49 % d'opacitat */
  
];

//________________________SETUP_______________________________________
function setup() {
  let c=createCanvas(1280, 720);
  c.parent("p5");

  /*En tot el codi uso angles radians, no ho aplico amb angleMode (RADIANS) perquè el sistema està predeterminat en radians*/
  
  /* Amb el bucle estableixo els cops que es realitzen les iteracions, i pertant, controlo quants elements que apareixen. Dins del bucle inicio els angles de rotació de les linees i elipses de les funcions 'circulo1' i 'circulo2'. */
  
  /* push afegeix un element al final d'una llista; en aquest cas, afegeix un nou angle a les llistes 'angulos1' i 'angulos2'. Multiplico 'i' per l'angle de rotació per incremientar l'angle (PI/8) a cada iteració.*/
  
  for (let i = 0; i < 16; i++) {
    angulos1.push(i * (PI / 8)); 
    angulos2.push(i * (PI / 8));
  }


  
}


//_______________________DRAW_____________________________
function draw() {
  background(220);
  consola ();  // Mostra l'estat actual (esborrany o final) a la consola
  base();   // Dibuixa els rectangles base
  fondo ();  // Aplica imatges al fons
  titulo();  //Dibuxa el títol

/*Cercles tots dos a posició 600,370, els vaig fer amb dos funcions i no mitjançant scale per poder aplicar diferents rotacions*/
  circulo1(600, 370);  // Dibuixa el primer cercle principal (gran)  
  circulo2 (600, 370);  // Dibuixa el segon cercle principal (petit)  
  
  persona ();  //Aplica imatges de la dona

/* Dibuixa els arcs amb els cercles i triangles al voltant de la figura, posiciono el seu punt d'origen a width/2 i quan aplico la funció ajusto el parametr x per fer que tots dos arcs es trobin a la mateixa disatnacia del cercle*/
  push();   
    translate (width /2,685);
      arco(-300,0); // Arc a la dreta de la dona
      arco (300,0); // Arc a l'esquerra de la dona
    
    scale (0.5); // Redueixo el dubuix a la mitat
      arco (0,0 +28); /*Dibuixo la funció al centre entre els arcs anteriors i ajusto Y per a que es mostri per sobre la línea*/
  pop();
  
  adapt (); // Dibuixa el text d'adaptació -per sobre dels arcs-
  cambiarImagenFondo();  // Canvia la imatge de fons
  
}


//_____________________________________FUNCIONS_________________________________________

/*___________________________________PRELOAD___________________________*/
/*Preload per carregar arxius externs abans de que el programa començi a executar-se, en aquest cas una font i 5 imatges. */

function preload() {
  font = loadFont ('font/Almendra.ttf');
  mujer = loadImage('img/mujer2.png');
  mujeria = loadImage('img/mujersita.png');
  fondo1 = loadImage ('img/playasi.jpg');
  fondo2 = loadImage ('img/playita.jpg');
  fondo3 =loadImage ('img/segat.jpg');    
}

//_____________________FONDO____________________________
function fondo (){
  switch (borrador){
    case true:
        noFill(); //Fons buit
      break;  
  
    case false:
 /* Determina quina imathe de fons es mostra segons el valor de 'fondoActual'. Aquest valor varia a la funció cambiarImagenFondo. */
    if (fondoActual == 1) {
        image(fondo1, 10, 170, 1260, 540); // Imagen 1
    } else if (fondoActual == 2) {
        image(fondo2, 10, 170, 1260, 540); // Imagen 2
    } else if (fondoActual == 3) {
        image(fondo3, 10, 170, 1260, 540); // Imagen 3, etc.
    }
    break;
}
}
//_______________________CANVIAR FONS_________________________
function cambiarImagenFondo() {
 
  /*Condició que s'executa quan borrador es fals (!borrador) i si han pasat almenys 160 frames desde l'ultim canvi.*/
  
  //Si aquesta condició es certa succeeixen dues coses. 
  /*1. Es verifica una altra condició, si la variable que controla el fons ('fondoActual') es menor a 3, s'incrementa un valor a la variable i es produeix el canvi d'imatge. Si la variable es major a 3, else, es reseteja la variable del fons a 1 i es torna a mostrar la primera imatge.*/
  
  /*2. S'actualitza el frame a la variable 'ultimoCambio' (últimoCambio = frameCount). D'aquesta manera aseguro que el proxim canvi es produeixi quan hagin pasat uns altres 160 frames*/
  
  
   
  if (!borrador && frameCount - ultimoCambio >= 160) {
    if (fondoActual < 3) {
      fondoActual++;
    } else {
      fondoActual = 1; // Si fondoActual es 3, es reseteja a 1
    }
    ultimoCambio = frameCount;  // Actualitza frame a la variable
  }
}

//______________________________________ARC_________________________________________
function arco(arcox, arcoy) {
 
  noFill(); // Sense color interior
  strokeWeight (3); //Grosor de la vora/contorn

    push();
      translate(arcox, arcoy); /* Trasllado l'origen de coordenades a aquestes variables, valors definits quan aplico la funció al draw.*/
      
  /*variables que uso per l'amplada i altura dels arcs, d'aqeusta forma ajustava més facilment el tamany i la distancia entre tots dos*/
        let tamaño1 =280;
        let tamaño2 = 260;
 
          arc (0,0,tamaño1,tamaño2,PI,0);
          arc (0,0,tamaño1 - 100,tamaño2-100, PI,0 );//medio

  /*crido a les funcions que ficaran atributs als arcs. Les he definit en funcions apart i no dins d'aquesta per poder-hi ficar diferents colors i angles de rotació més facilment */ 
          arctr (); // Dibuixa els triangles dins l'arc
          arccirc (); // Dibuixa els cercles dins l'arc

    pop ();
}

// ______________________Triangles de l'arc_____________________
function arctr (){
    //Switch per canviar de color les funcions de dibuix
    switch (borrador){
      case true:
          noFill(); //Es mostren els triangles vuits
        break;
    
      case false:
         fill(colores [3]); /*Es mostren els triangles omplerts amb el color 3 de la llista*/
        break;
  }

    push();
      translate(0,32); /*Ajusto l'origen de coordenades sobre el que rotaran els triangles. Com que la funció s'aplca sobre una altra, el punt d'origen s'aplica i es modifica en base al punt establert en la funció principal. Així doncs, ajusto el parametre Y per a que es posicionin sota dels arcs. */
      rotate (PI/2);  /* Rotate gira el sistema de coordenades 90 (pi/2) graus en sentit horari. Això significa que els triangleses dibuixaran en una orientació diferent respecte al punt d'origen. */

  
     /* El bucle while s'inicia en 0 amb la variable i, i s'executa 17 vegades. Això vol dir que dibuixarà 17 triangles, cada un girat 10 graus respecte l'anterior.*/

        let i = 0;
        while (i < 17) {

          rotate (PI / 18); /*rotate gira 10 graus (PI / 18 radians) el sistema de coordenades a cada iteacció, per tant, cada triangle q s'executa es dibuixa a 10 graus repecte l'anterior */

            triangle (0,155,0,50,20,195); /*establieixo parametres per dubuixar el triangle tenint en comple que el punt d'origen es troba a (0, 32).*/

            // Incremento el comptador per avançar en el bucle.
            i++;
 }
  pop ();
}

// _________________Cercles de l'arc__________________________
function arccirc(){
  //Switch per canviar de color les funcions de dibuix
  switch (borrador){
    case true:
        noFill();  //Es mostren els cercles vuits
      break;
      
    case false:
        fill(colores [4]);  /*Es mostren els cercles omplerts amb el color 4 de la llista*/
      break;
        
          }
  
  push ();
  
/*Estableixo el mateix punt d'origen i rotació que a la funció dels triangles, ja que vull que s'executin sobre el mateix punt i rotin en sobre les mateixes coordenades.*/
    translate(0,32);
    rotate (PI/2);

    /* El bucle while s'inicia en 0 amb la variable z, i s'executa 8 vegades. Això vol dir que dibuixarà 8 elipses, cada un girat 20 graus respecte l'anterior.*/
      let z = 0;
      while (z < 8){
        rotate (PI / 9);/*rotate gira 20 graus(PI / 9 radians) el sistema de coordenades a cada iteacció, per tant, cada elipse q s'executa es dibuixa a 20 graus repecte l'anterior*/
        
          ellipse (0,60,20,30); /*establieixo parametres per dubuixar la elipse tenint en comple que el punt d'origen es troba a (0, 32).*/
        
          // Incremento el comptador per avançar en el bucle.

          z ++
      }
  pop();

}
//_________________________CERCLES PRINCIPALS_________________________

//____________________CERCLE GRAN_________________________
function circulo1(centroX, centroY) {
  strokeWeight (3); // Grosor del contorn 3 px
  push();
    translate(centroX, centroY); // Traslladar al centre del cercle
    /*Switch per canviar de color el cercle principal i aplicar increment i rotació a la dreta a tots els elements de la funció*/
       switch (borrador){
         case true:
            fill('white'); //color blanc a l'interior dels cercles
            stroke(0); // Contorn negre
          break;
          
         case false:
            stroke ( colores [6]); //Contron linies i cercle color 6 de la llista
            fill(colores [7]); //Interior color 7 de la llista       
            rot1 += 0.002;  // Incrementar l'angle
            rotate(rot1);  /* Rotar el sistema de coordenades segons l'angle actual*/
          break;
        }
    ellipse(0, 0, 350, 350);  /* Elipse diàmetre de 350 (radi de 175)*/
  

    // LÍNIES I ELIPSES AL VOLTANT DEL CERCLE
    /* A través d'un bucle recorro la llista 'angulos1'.Length dona el número total d'elements a la llista (definit al setup) i estableixo el numero d'iteracions */

    for (let b = 0; b < angulos1.length; b++){
      rotate (angulos1[b]); /* Rota el sistema de coordenades a cada iteració. Accedeixo al element 'b' del bucle i aplico la rotació (PI/8 de 'angulos1') precalculada al setup. Afecta a cada linea i elipse.*/
        line (0,155, 0 ,175); //Dibuixo la linea que es repeteix a cada iteració.
        //Per al color de les elipses del voltant. !borrador correspon a borrador == false
        if (!borrador){
          fill (colores[5]);
        } 
      /* Omplo les el·lipses amb el color 5 de la llista quan borrador sigui false, ho aplico ara amb if i no abans al switch perquè alli he definit el color de fons dels cercles. */
          ellipse (0, 190,15,15); //Dibuixo la elipse que es repeteix a cada iteració.
      }
  pop ();
  }

//____________________CERCLE PETIT________________
function circulo2 (centroX2,centroY2){
  /*la funció 'circulo2' es igual a 'circulo1' amb la diferència que la rotació es produeix cap al cantor esquerra ja que decremento la rotacio (-=) en lloc d'incrementar-la.*/
  strokeWeight (3); // Grosor del contorn 3 px
  push();
    translate(centroX2, centroY2); // Trasllado al centre del cercle
    /*Switch per canviar de color el cercle principal i aplicar increment i rotació a la dreta a tots els elements del afunció. */
       switch (borrador){
         case true:
            fill('white'); //color blanc a l'interior dels cercles
            stroke(0); // Contorn negre
          break;

         case false:
            stroke ( colores [6]); /*Contron color 6 de la llista*/      
            fill(colores [7]); //Interior color 7 de la llista   
            rot2 -= 0.002; /*Decrementar l'angle*/
            rotate(rot2); /* Rotar el sistema de coordenades segons l'angle actual*/
          break;
        }
    ellipse(0, 0, 250, 250); // Elipse diámetro de 250 (radio de 125)

    // LÍNIES I ELIPSES AL VOLTANT DEL CERCLE
    for (let w = 0; w < angulos2.length; w++){
      rotate (angulos2[w]); /* Rota el sistema de coordenades a cada iteració. Accedeixo al element 'w' del bucle i aplico la rotació (PI/8 de 'angulos1') precalculada al setup. Afecta a cada linea i elipse.*/
        line (0,105, 0 ,125); //Dibuixo la linea que es repeteix a cada iteració.
        if (!borrador){
          fill (colores[5]);
        }
      /* Omplo les el·lipses amb el color 5 de la llista quan borrador sigui false, ho aplico ara amb if i no abans al switch perquè alli he definit el color de fons dels cercles. */
          ellipse (0, 140,10,10); //Dibuixo la elipse que es repeteix a cada iteració.
     }
  pop ();
  
}

//_________________________________CANVI D'IMAGATGES DE PERSONA__________________________________
function persona (){
  //Switch per canviar la imatge de la dona
     switch (borrador){
    case true: 
  image(mujer, 437.5, 170, 405, 540); // Imagen de la obra original centrada dentro en el rectángulo
      break;
         
     case false:
        image (mujeria, 407.5, 170, 405, 540); // Imagen de otra mujer centrada dentro en el rectángulo
      break;

     }
  
  
}

//____________________________________________RECTANGLES BASE______________________________
function base(){
  //Switch per canviar de color les funcions de dibuix
  switch (borrador){
    case true:
      noFill(); //retangles sense color a l'interior
      break;
    case false:
      fill(colores [2]); /*rectangles amb interior de color 2 de la llista 'colores'. Tot i que s'aplica a tots dos rectangles, només es visible en el del títul, ja que en el altre es mostren imatges. Vaig decidir deixar-ho així perque no afecta a la visió de les imatges i per mostrar un canvi si les imatges, per algun problema, no apareixen*/

  }
  rect (10,10,1260,150,10);//titul
  
  rect (10,170,1260,540,10);//contingut
  
}

//________________________________________LLETRA______________________________________________
//__________________________TÍTOL____________________
function titulo(){
  //Switch per canviar la font i color de la lletra
  switch (borrador) {
    case true: 
      fill (0); //interior lletra de color negre
      textFont ('Courier New'); //font del sistema
      break;
    
    case false:
      textFont(font); //font agregada i definida al setup

      fill (colores [0]); //color de la lletra 0 de la llista de 'colores' 
      
      break;
  }
  
  textSize(95); // tamany de la font
  textAlign(CENTER); //Centro el text
  text('MONACO·MONTE-CARLO',width/2,125); //text amb el títol de la obra i parametres de posició
  
  
}

//_________________________ADAPTADO POR_________________________
/*Tot i que, aquest text no es vegi molt, està fet a proposit ja que a l'obra original el text tampoc es molt llegible.*/

function adapt (){
  //Switch per canviar el color de la lletra
  switch (borrador){
    case true:
      fill (0); //interior lletra de color negre
      break;
    case false:
      fill (colores [1]); //color de la lletra 1 de la llista de 'colores' 
      break;
      
  }
  textFont ('arial'); //font del sistema
  textSize (20); //tamany de la font
  textAlign (RIGHT); //alineo el text a la dreta
  text ('Adapatada per', 1160,610 );//text i parametres de posició
  text ('Júlia Calvo', 1160,640 );
  
}




//____________________________________________CONSOLA______________________________
/*Per mostrar text a la consola faig servir console.log i l'estrucutra alternativa switch / case. D'aquesta forma aplico que si borrador es true es mostri un text (esborrany) i sino es cert (false) en mostri un altre (final)*/
function consola (){
 switch (borrador){
    case true:
     console.log ('Esborrany');
    break;
    
    case false:
    console.log ('Final');
     break;
  }}

//________________________________________________MOUSEPRESSED_________________________________  
/*Faig els canvis d'estat (esborrany /final) mitjançant '!', que nega el valor de la variable borrador i canvia de true a false i viceversa cada cop que es fa clic al canvas. */

function mousePressed (){
  borrador = !borrador;

}