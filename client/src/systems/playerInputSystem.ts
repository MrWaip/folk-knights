import { Body } from "matter-js";

export enum Actions {
  Left,
  Right,
  Jump,
  Nope,
}

let action = Actions.Nope;
let jumping = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "d") {
    action = Actions.Right;
  } else if (e.key === "a") {
    action = Actions.Left;
  } else if (e.code === "Space" && !jumping) {
    // action = Actions.Jump;
    jumping = true;
  }
});

document.addEventListener("keyup", () => {
  action = Actions.Nope;
  jumping = false;
});

export const movementSystem: App.ECSSystem = ({ queries }) => {
  for (const { body } of queries.controlledByInput) {
    if (action === Actions.Right) {
      Body.setVelocity(body, { x: 5, y: body.velocity.y });
    } else if (action === Actions.Left) {
      Body.setVelocity(body, { x: -5, y: body.velocity.y });
    } else if (jumping) {
      Body.setVelocity(body, { x: body.velocity.x, y: -10 });
    }
  }
};
