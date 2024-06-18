// Aqui va la lógica de presentación (interfaz de usuario).

//-----------------------//
// model.ts <===== ui.ts //
// motor.ts <===== ui.ts //
//-----------------------//

import { points } from "./_model";
import { getRandomNumber, getCard, getCardValue, sumPoints, setPoints } from "./_motor";


// ELEMENTOS DEL DOM
export const score = document.getElementById("score");
export const giveCardBtn = document.getElementById("play-btn");
export const giveUpBtn = document.getElementById("give-up-btn");
export const restartGameBtn = document.getElementById("restart-btn");

// Listado de las cartas de juego
export const cardList = (card : number) => {
    let cardUrl = "";
    switch (card) {
        case 1:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
            break;
        case 2:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
            break;
        case 3:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
            break;
        case 4:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
            break;
        case 5:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
            break;
        case 6:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
            break;
        case 7:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
            break;
        case 10:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
            break;
        case 11:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
            break;
        case 12:
            cardUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
            break;
}
    return cardUrl;
};

// Muestra la puntuación del jugador
export const scoreDisplay = () : void => {
    if (score instanceof HTMLHeadingElement
        && score !== null && score !== undefined) {
        score.innerHTML = points.totalPoints.toString();
    }
}

// Actualiza el heading element del html con la puntuación
export const updateScore = (totalPoints : string) : void => {
    if (score instanceof HTMLHeadingElement
        && score !== undefined && score !== null) {
        score.innerHTML = totalPoints.toString();
    }
}

// Genera la carta con su clase. NO la pinta aun
export const createCard = (cardUrl : string) : HTMLImageElement => {
    const playedCard = document.createElement("img");
    if (playedCard instanceof HTMLImageElement 
        && playedCard !== null && playedCard !== undefined){
        playedCard.src = cardUrl;
        playedCard.className = ("played-card");
    }
    return playedCard
}

// Pinta la carta en el contenedor padre
export const drawCard = (playedCard: HTMLImageElement): void => {
    const gameBoard = document.getElementById("played-board");
    if (gameBoard instanceof HTMLDivElement
        && gameBoard !== null && gameBoard !== undefined) {
        gameBoard.appendChild(playedCard);
    }
}

// Determina el mensaje de estado de la partida según la puntuación
export const gameStatus = () : string => {
    let statusMessage: string = "";
    
    if(points.totalPoints === 7.5) {
        statusMessage = `¡Lo has clavado! ¡Enhorabuena! Has conseguido ${points.totalPoints} puntos!`;
        giveCardButtonOff();
        giveUpButtonOff();
    } else if (points.totalPoints > 7.5) {
        statusMessage = `¡Te pasaste! Has obtenido ${points.totalPoints} puntos.`
        giveCardButtonOff();
        giveUpButtonOff();
    } else {
        statusMessage = points.totalPoints.toString();
    }
    return statusMessage;
}

// Recarga la página
export const restartGame = () : void => {
    location.reload();
}

// Habilita el botón de "Una más" en el panel emergente tras plantarse
export const oneMoreTimeButton = () : void => {
    const oneMore = document.getElementById("one-more");
    if (oneMore instanceof HTMLButtonElement
        && oneMore !== null && oneMore !== undefined){
        oneMore.addEventListener("click", getOneMoreTime); // Habilita el botón de generar una carta más en el panel emergente de plantarse
    }
}

// Arranca el proceso de jugar una carta más
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

// Deshabilita el botón de Pedir Carta
export const giveCardButtonOff = () : void => {
    if (giveCardBtn instanceof HTMLButtonElement
        && giveCardBtn !== null && giveCardBtn !== undefined) {
        giveCardBtn.className = "play-btn-off";
        giveCardBtn.disabled = true;
    }  
}

// Deshabilita el botón de Plantarse
const giveUpButtonOff = () : void => {
    if (giveUpBtn instanceof HTMLButtonElement
        && giveUpBtn !== null && giveUpBtn !== undefined) {
        giveUpBtn.className = "play-btn-off";
        giveUpBtn.disabled = true;
    }
}

// Establece el mensaje de estado tras plantarse
export const setGiveUpStatus = (gameStatus : string) : void => {
    const giveUpPanel = document.getElementById("give-up-panel");
    if (giveUpPanel instanceof HTMLDivElement
        && giveUpPanel !== null && giveUpPanel !== undefined) {
        giveUpPanel.className = "give-up-panel-on";
        giveUpPanel.innerHTML = gameStatus;
        oneMoreTimeButton();
    }
}

// Evalúa el mensaje de estado de la partida al momento de plantarse
export const getGiveUpStatus = () : string => {
    giveUpButtonOff();
    if(points.totalPoints <= 4) {
        return `Has sido muy conservador. <br><p>Pulsa "Una más" para saber qué habrías sacado.</p><button id="one-more" class="play-btn">Una más</button>`;
    } 
    if(points.totalPoints >= 4.5 && points.totalPoints <= 5.5) {
        return `Te ha entrado el canguelo ¿eh? <br><p>Pulsa "Una más" para saber qué habrías sacado.</p><button id="one-more" class="play-btn">Una más</button>`;
    } 
    if(points.totalPoints >= 6 && points.totalPoints <= 7) {
        return `Casi casi...<br><p> Pulsa "Una más" para saber qué habrías sacado.</p><button id="one-more" class="play-btn">Una más</button>`;
    } 
    return points.totalPoints.toString();
}

// Inicia el proceso de plantar la partida
export const giveUp = () : void => {
    const gameStatus : string = getGiveUpStatus() // Obtengo el mensaje de estado de la partida en base a los puntos
    setGiveUpStatus(gameStatus); // Abro panel emergente mostrando el mensaje de estado de la partida
    giveCardButtonOff();
}

// Arranca el juego
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