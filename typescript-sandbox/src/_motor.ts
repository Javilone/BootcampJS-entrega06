// Aquí tendré todas las reglas del juego.

//--------------------------//
// model.ts <===== motor.ts //
// ui.ts <======== motor.ts //
//--------------------------//

import { points, cardList } from "./_model";
import { createCard, drawCard, gameStatus, updateScore, setGiveUpStatus } from "./_ui";

/* Genera un número aleatorio */
export const getRandomNumber = () : number => {
    return Math.ceil(Math.random() * 10);
}

 /* Obtiene la carta aleatoria (no su valor aun) */
export const getCard = (randomNumber: number) : number => { 
    return randomNumber > 7 ? randomNumber + 2 : randomNumber;
}

/* Determina el valor de la carta */
export const getCardValue = (card: number) : number => {
    return card > 7 ? 0.5 : card;
}

/* Obtiene el valor de la carta */
export const sumPoints = (cardValue : number) : number => {
    return points.totalPoints + cardValue;
}

/* Establece el valor de la carta en la variable totalPoints */
export const setPoints = (getPoints : number) : void =>  {
    points.totalPoints = getPoints;
}

/* Arranca el juego */
export const playGame = () : void => {
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

/* Habilita el botón de "Una más" en el panel emergente tras plantarse */
export const oneMoreTimeButton = () : void => {
    const oneMore = document.getElementById("one-more");
    if (oneMore instanceof HTMLButtonElement
        && oneMore !== null && oneMore !== undefined){
        oneMore.addEventListener("click", getOneMoreTime); // Habilita el botón de generar una carta más en el panel emergente de plantarse
    }
}

/* Arranca el proceso de jugar una carta más */
export const getOneMoreTime = () : void => {
    const randomNumber : number = getRandomNumber();
    const card : number = getCard(randomNumber);
    const cardUrl: string = cardList(card);
    const cardValue : number = getCardValue(card)
    const playedCard : HTMLImageElement = createCard(cardUrl);
    drawCard(playedCard);
    let gameStatus = `Pues que habrías sacado un ${cardValue}.<br>Y en total tendrías ${points.totalPoints + cardValue} puntos`;
    setGiveUpStatus(gameStatus);
}