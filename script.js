const svg = document.querySelector(".main-svg-rect");
const tableRect = document.querySelector(".svg-rect");
const firstPlayer = document.getElementById("player1");
const secondPlayer = document.getElementById("player2");
const playBall = document.getElementById("ball");
let tableHeight = tableRect.height.baseVal.value;
let tableWidth = tableHeight * 1.5;
svg.setAttribute("width", tableWidth);
// tableRect.setAttribute('stroke-dasharray', `${tableWidth}, 72vh`);
let tablePositionX = tableRect.x.baseVal.value;
// console.log("rectwidth", tableRect.width.baseVal.value);
let batHeight = firstPlayer.height.baseVal.value;

let servePlayer1 = true;
// console.log(tableHeight, tableWidth, batHeight);

function fixInitialValue() {
  tableHeight = tableRect.height.baseVal.value;
  tableWidth = tableHeight * 1.5;
  tableRect.setAttribute("stroke-dasharray", `${tableWidth}, 72vh`);
  tablePositionX = tableRect.x.baseVal.value;
  secondPlayer.setAttribute("x", tableWidth - 20);
  playBall.setAttribute("cx", 30 + tablePositionX);
  playBall.setAttribute("cy", tableHeight / 2);
}
fixInitialValue();

function makeBallMovement() {
  let yMovement = 0;
  let currentXPosition = Number(playBall.getAttribute("cx"));
  let currentYPosition = Number(playBall.getAttribute("cy"));
  let tableYPosition = tableRect.y.baseVal.value;
  const animationTimer = setInterval(() => {
    if (servePlayer1) {
      if (currentXPosition < tableWidth - 30) {
        yMovement = (currentYPosition > (tableYPosition + tableHeight)) || (currentYPosition <= 10) ? -(yMovement) :yMovement;  
        currentXPosition = currentXPosition + 1;
        currentYPosition = currentYPosition + yMovement;
        playBall.setAttribute("cx", currentXPosition);
        playBall.setAttribute("cy", currentYPosition);
      } else {
        let batLocation = secondPlayer.y.baseVal.value;
        // console.log(secondPlayer.y);
        let ballLocation = playBall.cy.baseVal.value;
        if (
          ballLocation >= batLocation &&
          ballLocation <= batLocation + batHeight
        ) {
            let batCenter = batLocation + batHeight / 2;
            yMovement = (ballLocation - batCenter) / (batHeight / 2);
            servePlayer1 = false;
        } else {
          playBall.setAttribute("cx", currentXPosition + 5);
          playBall.style.display = "none";
          servePlayer1 = false;
          clearInterval(animationTimer);
        }
      }
    } else if (!servePlayer1) {
      if (currentXPosition > 30) {
        yMovement = (currentYPosition > (tableYPosition + tableHeight)) || (currentYPosition <= 10) ? -(yMovement) :yMovement;  
        currentXPosition = currentXPosition - 1;
        currentYPosition = currentYPosition + yMovement;
        playBall.setAttribute("cx", currentXPosition);
        playBall.setAttribute("cy", currentYPosition);
      } else {
        let batLocation = firstPlayer.y.baseVal.value;
        let ballLocation = playBall.cy.baseVal.value;
        if (
          ballLocation >= batLocation &&
          ballLocation <= batLocation + batHeight
        ) {
          let batCenter = batLocation + batHeight / 2;
          yMovement = (ballLocation - batCenter) / (batHeight / 2);
          servePlayer1 = true;
        } else {
          playBall.setAttribute("cx", currentXPosition + 5);
          playBall.style.display = "none";
          servePlayer1 = true;
          clearInterval(animationTimer);
        }
      }
    }
  }, 3);
}

function makeBatMovement(event) {
  let initPosition = 0;
  let currentPlayer;
  let batPitch = tableHeight / 5;
  if (event.code === "ArrowUp" || event.code === "ArrowDown") {
    currentPlayer = secondPlayer;
    initPosition = secondPlayer.y.baseVal.value;
  } else if (event.code === "KeyW" || event.code === "KeyS") {
    currentPlayer = firstPlayer;
    initPosition = currentPlayer.y.baseVal.value;
  }
  if (
    Math.floor(initPosition) - Math.floor(batPitch) >= 0 &&
    (event.code === "ArrowUp" || event.code === "KeyW")
  ) {
    currentPlayer.setAttribute("y", initPosition - batPitch);
    // console.log(initPosition);
  } else if (
    initPosition + batHeight <= tableHeight &&
    (event.code === "ArrowDown" || event.code === "KeyS")
  ) {
    currentPlayer.setAttribute("y", initPosition + batPitch);
  }
}

document.addEventListener("keydown", (event) => {
    // console.log(event.code);
    if (event.code === "Enter" && playBall.style.display !== "block") {
      playBall.style.display = "block";
      playBall.setAttribute("cy", tableHeight / 2);
      firstPlayer.setAttribute("y", "40%");
      secondPlayer.setAttribute("y", "40%");
      makeBallMovement();
    }
    makeBatMovement(event);
  });
