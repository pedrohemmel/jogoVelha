//Criando variaveis para a logica do jogo
var toque = new Audio('click.mp3'); //audio click
var pong = new Audio('pong.mp3');
var fogos = new Audio('fogos.mp3')
var jogador1 = 'Jogador1';
var jogador2 = 'Jogador2';
var jogadorDaVez = jogador1;
var ganhou = false;
var armazenaRegistro = '';

var jogar= document.getElementById("jogar");

//criando rolagem de uma pagina para outra
jogar.addEventListener("click", function() {
  var inicio = document.getElementById("inicio");

  if(inicio.className === "inicioInvisivel") {
    inicio.className = "inicioVisivel";
  } else {
    inicio.className = "inicioInvisivel";
  }
});

function tutorial() {
  var comoJogar = document.getElementById("comoJogar");

  if(comoJogar.className === 'jogarInvisivel') {
    comoJogar.className = 'jogarVisivel';
  }
}

//aplicando funções em suas devidas ordens
atualizaVez();
detectarQuadrado();
mostraDia();


//determinei que essa função como assincrona para ela poder obedecer funções como o espera()
async function venceu() {
  //variavel que vai ser acrescentado o vendedor
  var vencer = '';
  //puxando todos ids de quadrados para cá
  var pri1 = document.getElementById('pri1').getAttribute('play');
  var pri2 = document.getElementById('pri2').getAttribute('play');
  var pri3 = document.getElementById('pri3').getAttribute('play');
  var seg1 = document.getElementById('seg1').getAttribute('play');
  var seg2 = document.getElementById('seg2').getAttribute('play');
  var seg3 = document.getElementById('seg3').getAttribute('play');
  var ter1 = document.getElementById('ter1').getAttribute('play');
  var ter2 = document.getElementById('ter2').getAttribute('play');
  var ter3 = document.getElementById('ter3').getAttribute('play');

  var vencedor = document.getElementById('vencedorRegistrado');
  //fazendo a logica de quais alternativas podem ter de ganhos, se o quadrado for diferente de vazio, ele vai para a variavel
  if((pri1 == seg1 && seg1 == ter1 && pri1 != '') || (pri1 == seg2 && seg2 == ter3 && pri1 != '') || (pri1 == pri2 && pri2 == pri3 && pri1 != '')) {
    vencer = pri1;
  }

  if((ter1 == seg2 && seg2 == pri3 && ter1 != '') || (ter1 == ter2 && ter2 == ter3 && ter1 != '')) {
    vencer = ter1;
  }

  if(ter3 == seg3 && seg3 == pri3 && ter3 != '') {
    vencer = ter3;
  }

  if(ter2 == seg2 && seg2 == pri2 && ter2 != '') {
    vencer = ter2;
  }

  if(seg3 == seg2 && seg2 == seg1 && seg3 != '') {
    vencer = seg3;
  }


  //mostrando quem venceu e trazendo uma função que espera um pouco ate o quadrado ser preenchido para efetuar o alert
  if(pri1 != '' && pri2 != '' && pri3 != '' && seg1 != '' && seg2 != '' && seg3 != '' && ter1 != '' && ter2 != '' && ter3 != '') {
    ganhou = true;
    vencedor.innerText = 'Empate! Recomece o jogo';
  } else if(vencer != '') {
    ganhou = true;
    vencedor.innerText = 'O ganhador foi o: ' + vencer;
    fogos.play();
  }

}


function mostraDia() {
  var dia = new Date();
  var diaSem = dia.getDay();
  var hora = dia.getHours();
  var resposta = document.getElementById('diaSem');
  var horaDia = '';
  var diaDaSem = '';

  
  if(diaSem == 0) {
    diaDaSem = 'Domingo';
  } else if(diaSem == 1) {
    diaDaSem = 'Segunda';
  } else if(diaSem == 2) {
    diaDaSem = 'Terça';
  } else if(diaSem == 3) {
    diaDaSem = 'Quarta';
  } else if(diaSem == 4) {
    diaDaSem = 'Quinta';
  } else if(diaSem == 5) {
    diaDaSem = 'Sexta';
  } else if(diaSem == 6) {
    diaDaSem = 'Sabado';
  }

  if(hora < 5) {
    horaDia = 'Boa Noite';
  } else if(hora < 8) {
    horaDia = 'Bom Dia';
  } else if(hora < 12) {
    horaDia = 'Bom Dia';
  } else if(hora < 18) {
    horaDia = 'Boa tarde';
  } else {
    horaDia = 'Boa noite';
  }

  resposta.innerText = horaDia + ' tenha um(a) ótimo(a) ' + diaDaSem;

}

//Essa função vai registrar todos movimentos dos jogadores
function registro(idQuadrado) {
  
  var pri1 = document.getElementById('pri1').getAttribute('play');
  var pri2 = document.getElementById('pri2').getAttribute('play');
  var pri3 = document.getElementById('pri3').getAttribute('play');
  var seg1 = document.getElementById('seg1').getAttribute('play');
  var seg2 = document.getElementById('seg2').getAttribute('play');
  var seg3 = document.getElementById('seg3').getAttribute('play');
  var ter1 = document.getElementById('ter1').getAttribute('play');
  var ter2 = document.getElementById('ter2').getAttribute('play');
  var ter3 = document.getElementById('ter3').getAttribute('play');

  var registro = document.getElementById('registro');
  var registrado = '';
  armazenaUsuario = '';
  var clique = '';
  var usuario = '';

//fazendo a condição para que saiba qual jogador está movimentando e qual é a posição
  if(idQuadrado == 'pri1') {
    clique = 'A1';
  } 
  else if(idQuadrado == 'seg1') {
    clique = 'B1';
  } 
  else if(idQuadrado == 'ter1') {
    clique = 'C1';
  } 
  else if(idQuadrado == 'pri2') {
    clique = 'A2';
  } 
  else if(idQuadrado == 'seg2') {
    clique = 'B2';
  } 
  else if(idQuadrado == 'ter2') {
    clique = 'C2';
  } 
 else if(idQuadrado == 'pri3') {
    clique = 'A3';
  } 
  else if(idQuadrado == 'seg3') {
    clique = 'B3';
  } 
  else {
    clique = 'C3';
  } 


  //armazenando e printando sequencia dos registros

    registrado = 'O ' + jogadorDaVez + ' utilizou a posição ' + clique + '\n\n';
    armazenaRegistro += registrado;
    registro.innerText = armazenaRegistro; 
    
  
  
}

//função detecta o click do usuario, aplica imagem ao toque e alternando de usuario
function detectarQuadrado() {
  var quadrados = document.getElementsByClassName('quadrado');
  //for para detectar cada quadrado
  for(var contagem = 0; contagem < quadrados.length; contagem++) {
    let quad = quadrados[contagem];
    //funcao que identifica o quadrado ao clicar (click)
    quadrados[contagem].addEventListener("click", function() {
      if(ganhou) {
        return;
      }
      /*o this no caso seria uma referencia ao quadrados[contagem] quando o click é ativo, e depois tenta achar qualquer tag img que estiver nas divs do quadrado, e se for igual a 0 (que significa q n tem nenhuma tag dentro da div) ele vai efetuar minhas ordens*/
      if(this.getElementsByTagName('img').length == 0) {
        if(jogadorDaVez == jogador1) {
          this.innerHTML = '<img src="images/x.png">';
          //jogada vai determinar quem vai ganhar no final
          this.setAttribute('play', jogador1);
          jogadorDaVez = jogador2;
        } else {
          this.innerHTML = '<img src="images/o.png">';
          //jogada vai determinar quem vai ganhar no final
          this.setAttribute('play', jogador2);
          jogadorDaVez = jogador1;
        }
        atualizaVez();
        registro(quad.id);
        venceu();
      }
    });
  }
}

function atualizaVez() {
  if(ganhou) {
    return;
  }
  if(jogadorDaVez == jogador1) {
    var imagemVez = document.querySelectorAll('div#vezJogadorOp img')[0];
    imagemVez.setAttribute('src', 'images/x.png');
  } else {
    var imagemVez = document.querySelectorAll('div#vezJogadorOp img')[0];
    imagemVez.setAttribute('src', 'images/o.png');
  }

}



 


