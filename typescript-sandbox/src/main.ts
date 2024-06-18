import "./style.css";
import { score, giveCardBtn, giveUpBtn, restartGameBtn, playGame, scoreDisplay, restartGame, giveUp} from "./_ui";


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