function desenhaCirculo(x, y, raio, cor) {

    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function limpaTela() {
    pincel.clearRect(0, 0, 1000, 600);
}

function desenhaAlvo(x,y){

desenhaCirculo(x, y, raio + 20, cores[posicaoCor]);
desenhaCirculo(x, y, raio + 10, 'white');
desenhaCirculo(x, y, raio, cores[posicaoCor]);

}

function sorteiaPosicao(maximo,minimo) {

    return Math.floor(Math.random()* maximo + minimo);
}

function atualizaTela()  {

    limpaTela();

    xAleatorio = sorteiaPosicao(940,30); //Tamanho da tela para não ficar escondido
    yAleatorio = sorteiaPosicao(540,30); //Tamanho da tela para não ficar escondido

    desenhaAlvo(xAleatorio, yAleatorio);
}

function dispara(evento) {

    let x = evento.pageX - tela.offsetLeft - 5;
    let y = evento.pageY - tela.offsetTop - 5;

    if ((x > xAleatorio - raio) 
        && (x < xAleatorio + raio)
            && (y > yAleatorio - raio) 
                && (y < yAleatorio + raio)) {
        hitted();            
        
    /*
        posicao++;

        if (posicao > 9){
            posicao = 0;
        } 

        */  
    }
}


const tela = document.querySelector('canvas');
const pincel = tela.getContext('2d');

pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, 1000, 600);

const raio = 10;
let xAleatorio = sorteiaPosicao(1000);
let yAleatorio = sorteiaPosicao(600);



const cores = ['red','blue', 'orange', 'green', 'black', 'grey', 'yellow', 'purple', 'brown'];
let posicaoCor = 0;


// 
let myInterval = null;
let velocidade = null;

function startTarget(){

    stopTarget();
    
    velocidade=document.querySelector('.inputSpeed');
    
  
    myInterval = setInterval(atualizaTela, velocidade.value);

    let buttonSelect = document.querySelector('.buttonSpeed');
    buttonSelect.classList.add('.stoP');

}

function stopTarget(){
    atualizaTela();
    clearInterval(myInterval);
    
}

function upLevel(){
    velocidade = velocidade - 100;
}

function hitted(){

    posicaoCor=sorteiaPosicao(9,0)

    stopTarget();
    startTarget();
    upLevel();
}


tela.onclick = dispara;

// ===== > MUDANDO O INPUT RANGE  < =======
 
const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = (() =>{
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value/20) + "%";
    slideValue.classList.add("show");
});

inputSlider.onblur = (()=> {
    slideValue.classList.remove("show");
});