import { Body } from "matter-js";

export const playerMovementSystem: App.ECSSystem = ({ queries }) => {
  for (const { body, playerInput, jump } of queries.controlledByInput) {
    if (playerInput.isMovingRight) {
      Body.setVelocity(body, {
        x: Math.min(body.velocity.x + 4, 4),
        y: body.velocity.y,
      });
    }

    if (playerInput.isMovingLeft) {
      Body.setVelocity(body, {
        x: Math.max(body.velocity.x - 4, -4),
        y: body.velocity.y,
      });
    }

    if (playerInput.isJumping && jump && !jump.isJumping) {
      jump.isJumping = true;

      // Body.setVelocity(body, { x: body.velocity.x, y: -10 });

      Body.applyForce(body, body.position, { x: 0, y: -0.3 });
    }
  }
};
