// Aquí tendré todas las reglas del juego.

//--------------------------//
// model.ts <===== motor.ts //
//--------------------------//

import { points } from "./_model";

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