// Aqui va la lógica de presentación (interfaz de usuario).

//-----------------------//
// model.ts <===== ui.ts //
//-----------------------//

import { score, points, giveUpBtn, giveCardBtn } from "./_model";

/* Muestra la puntuación del jugador */
export const scoreDisplay = () : void => {
    if (score instanceof HTMLHeadingElement
        && score !== null && score !== undefined) {
        score.innerHTML = points.totalPoints.toString();
    }
}

/* Genera la carta con su clase. NO la pinta aun */
export const createCard = (cardUrl : string) : HTMLImageElement => {
    const playedCard = document.createElement("img");
    if (playedCard instanceof HTMLImageElement 
        && playedCard !== null && playedCard !== undefined){
        playedCard.src = cardUrl;
        playedCard.className = ("played-card");
    }
    return playedCard
}

/* Pinta la carta en el contenedor padre */
export const drawCard = (playedCard: HTMLImageElement): void => {
    const gameBoard = document.getElementById("played-board");
    if (gameBoard instanceof HTMLDivElement
        && gameBoard !== null && gameBoard !== undefined) {
        gameBoard.appendChild(playedCard);
    }
}

/* Determina el mensaje de estado de la partida según la puntuación */
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

/* Deshabilita el botón de Pedir Carta */
export const giveCardButtonOff = () : void => {
    if (giveCardBtn instanceof HTMLButtonElement
        && giveCardBtn !== null && giveCardBtn !== undefined) {
        giveCardBtn.className = "play-btn-off";
        giveCardBtn.disabled = true;
    }  
}

/* Deshabilita el botón de Plantarse */
const giveUpButtonOff = () : void => {
    if (giveUpBtn instanceof HTMLButtonElement
        && giveUpBtn !== null && giveUpBtn !== undefined) {
        giveUpBtn.className = "play-btn-off";
        giveUpBtn.disabled = true;
    }
}

/* Evalúa el mensaje de estado de la partida al momento de plantarse */
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

/* Establece el mensaje de estado tras plantarse */
export const setGiveUpStatus = (gameStatus : string) : void => {
    const giveUpPanel = document.getElementById("give-up-panel");
    if (giveUpPanel instanceof HTMLDivElement
        && giveUpPanel !== null && giveUpPanel !== undefined) {
        giveUpPanel.className = "give-up-panel-on";
        giveUpPanel.innerHTML = gameStatus;
        oneMoreTimeButton();
    }
}

/* Actualiza el heading element del html con la puntuación */
export const updateScore = (totalPoints : string) : void => {
    if (score instanceof HTMLHeadingElement
        && score !== undefined && score !== null) {
        score.innerHTML = totalPoints.toString();
    }
}

/* Inicia el proceso de plantar la partida */
export const giveUp = () : void => {
    const gameStatus : string = getGiveUpStatus() // Obtengo el mensaje de estado de la partida en base a los puntos
    setGiveUpStatus(gameStatus); // Abro panel emergente mostrando el mensaje de estado de la partida
    giveCardButtonOff();
}

/* Recarga la página */
export const restartGame = () : void => {
    location.reload();
}