import { Body, Vector } from "matter-js";

export const playerMovementSystem: App.ECSSystem = ({ queries }) => {
  for (const {
    body,
    playerInput,
    jump,
    playerAttack,
  } of queries.controlledByInput) {
    const velocityMultiplier = playerInput.isRunning ? 8 : 4;

    if (playerAttack?.isAttacking) {
      const direction = playerInput.isMovingRight
        ? 1
        : playerInput.isMovingLeft
        ? -1
        : 0;

      Body.setVelocity(body, {
        x: Math.sign(direction) * 2,
        y: 0,
      });

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
