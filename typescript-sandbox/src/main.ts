import "./style.css";
import { score, giveCardBtn, giveUpBtn, restartGameBtn } from "./_model";
import { scoreDisplay, restartGame, giveUp } from "./_ui";
import { playGame } from "./_motor";




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