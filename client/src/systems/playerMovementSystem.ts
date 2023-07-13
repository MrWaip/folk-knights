import { Body } from "matter-js";

export const movementSystem: App.ECSSystem = ({ queries }) => {
  for (const { body, playerInput } of queries.controlledByInput) {
    
    if(pla)

    // if (pl) {
    //   Body.setVelocity(body, { x: 5, y: body.velocity.y });
    // } else if (action === Actions.Left) {
    //   Body.setVelocity(body, { x: -5, y: body.velocity.y });
    // } else if (jumping) {
    //   Body.setVelocity(body, { x: body.velocity.x, y: -10 });
    // }
  }
};
