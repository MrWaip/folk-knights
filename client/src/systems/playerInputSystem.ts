const playerControl = {
  isMovingUp: false,
  isMovingDown: false,
  isMovingLeft: false,
  isMovingRight: false,
  isJumping: false,
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
});

export const playerInputSystem: App.ECSSystem = ({ queries }) => {
  for (const { playerInput } of queries.controlledByInput) {
    Object.assign(playerInput, playerControl);
  }
};
