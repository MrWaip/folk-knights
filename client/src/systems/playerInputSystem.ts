const playerControl = {
  isMovingUp: false,
  isMovingDown: false,
  isMovingLeft: false,
  isMovingRight: false,
  isJumping: false,
  isRunning: false,
  isAttacking: false,
};

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyW":
      playerControl.isMovingUp = true;
      break;
    case "KeyS":
      playerControl.isMovingDown = true;
      break;
    case "KeyA":
      playerControl.isMovingLeft = true;
      break;
    case "KeyD":
      playerControl.isMovingRight = true;
      break;
    case "Space":
      playerControl.isJumping = true;
      break;
  }

  if (event.shiftKey) {
    playerControl.isRunning = true;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      playerControl.isMovingUp = false;
      break;
    case "KeyS":
      playerControl.isMovingDown = false;
      break;
    case "KeyA":
      playerControl.isMovingLeft = false;
      break;
    case "KeyD":
      playerControl.isMovingRight = false;
      break;
    case "Space":
      playerControl.isJumping = false;
      break;
  }

  if (!event.shiftKey) {
    playerControl.isRunning = false;
  }
});

let timeoutIndex: any = undefined;

window.addEventListener("click", (event) => {
  playerControl.isAttacking = true;
  clearTimeout(timeoutIndex);
  timeoutIndex = setTimeout(() => {
    playerControl.isAttacking = false;
    timeoutIndex = undefined;
  }, 100);
});

export const playerInputSystem: App.ECSSystem = ({ queries }) => {
  for (const { playerInput } of queries.controlledByInput) {
    Object.assign(playerInput, playerControl);
  }
};
