import { Body } from "matter-js";

export const playerMovementSystem: App.ECSSystem = ({ queries }) => {
  for (const {
    body,
    playerInput,
    jump,
    playerAttack,
  } of queries.controlledByInput) {
    const velocityMultiplier = playerInput.isRunning ? 8 : 4;

    if (playerAttack?.isAttacking) {
      continue;
    }

    if (playerInput.isMovingRight) {
      Body.setVelocity(body, {
        x: velocityMultiplier,
        y: body.velocity.y,
      });
    }

    if (playerInput.isMovingLeft) {
      Body.setVelocity(body, {
        x: -velocityMultiplier,
        y: body.velocity.y,
      });
    }

    if (playerInput.isJumping && jump && !jump.isJumping) {
      jump.isJumping = true;

      Body.setVelocity(body, { x: body.velocity.x, y: -15 });
    }
  }
};
