import "./style.css";
import {
  score,
  giveCardBtn,
  giveUpBtn,
  restartGameBtn,
  points
} from "./_model";
import {
  scoreDisplay,
  updateScore,
  cardList,
  createCard,
  drawCard,
  gameStatus,
  setGiveUpStatus,
  restartGame, 
  giveCardButtonOff,
  getGiveUpStatus
} from "./_ui";
import {
  getRandomNumber,
  getCard,
  getCardValue,
  sumPoints,
  setPoints
} from "./_motor";


// FUNCIONES

/* Arranca el proceso de jugar una carta más */
const getOneMoreTime = () : void => {
  const randomNumber : number = getRandomNumber();
  const card : number = getCard(randomNumber);
  const cardUrl: string = cardList(card);
  const cardValue : number = getCardValue(card)
  const playedCard : HTMLImageElement = createCard(cardUrl);
  drawCard(playedCard);

  let gameStatus = `Pues que habrías sacado un ${cardValue}.<br>Y en total tendrías ${points.totalPoints + cardValue} puntos`;
  setGiveUpStatus(gameStatus);
}

/* Inicia el proceso de plantar la partida */
const giveUp = () : void => {
  const gameStatus : string = getGiveUpStatus() // Obtengo el mensaje de estado de la partida en base a los puntos
  setGiveUpStatus(gameStatus); // Abro panel emergente mostrando el mensaje de estado de la partida
  giveCardButtonOff();
}

/* Arranca el juego */
const playGame = () : void => {
  const randomNumber : number = getRandomNumber(); // Obtengo un número aleatorio
  const card : number = getCard(randomNumber); // Obtengo el número de la carta según el número aleatorio (no su valor) 
  const cardUrl : string  = cardList(card); // Busco la url de la carta
  const playedCard : HTMLImageElement = createCard(cardUrl); // Creo la carta pero no la pinto aun
  drawCard(playedCard); // Pinto la carta en el contenedor padre

  const cardValue : number = getCardValue(card); // Obtengo el valor en puntos de la carta
  const sumScore: number = sumPoints(cardValue); // Obtengo la suma de los puntos totales + lo que vale la carta
  setPoints(sumScore); // Establezco los puntos totales

  const statusMessage : string = gameStatus(); // Verifico el estado del juego obteniendo un mensaje de victoria, gameover o los puntos
  updateScore(statusMessage); // Actualizo la puntuación
}



// ASIGNACIÓN DE FUNCIONES A LOS ELEMENTOS
if (score instanceof HTMLHeadingElement
  && score !== null && score !== undefined){
  score.addEventListener("DOMContentLoaded", () => scoreDisplay());
}

if(giveCardBtn instanceof HTMLButtonElement
  && giveCardBtn !== null && giveCardBtn !== undefined) {
  giveCardBtn.addEventListener("click", playGame);
}

if (giveUpBtn instanceof HTMLButtonElement
  && giveUpBtn !== null && giveUpBtn !== undefined) {
  giveUpBtn.addEventListener("click", giveUp);
  }
  
if(restartGameBtn instanceof HTMLButtonElement
  && restartGameBtn !== null && restartGameBtn !== undefined) {
  restartGameBtn.addEventListener("click", restartGame);
  }