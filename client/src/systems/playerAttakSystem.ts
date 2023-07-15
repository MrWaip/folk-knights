import { Body, Query } from "matter-js";

export const playerAttackSystemFactory: App.ECSSystemFactory = ({
  ecs,
  physEngine,
}) => {
  const query = ecs.with("body", "playerInput", "playerAttack", "direction");

  return () => {
    for (const { playerAttack, playerInput, body, direction } of query) {
      if (playerInput.isAttacking && !playerAttack.isAttacking) {
        playerAttack.isAttacking = true;
        playerAttack.finishTime = Date.now() + playerAttack.duration;

        let bounds;

        if (direction > 0) {
          bounds = {
            min: { x: body.bounds.max.x, y: body.bounds.min.y },
            max: {
              x: body.bounds.max.x + 128 * direction,
              y: body.bounds.max.y,
            },
          };
        } else {
          bounds = {
            min: { x: body.bounds.min.x - 128, y: body.bounds.min.y },
            max: { x: body.bounds.min.x, y: body.bounds.max.y },
          };
        }

        const touchedBodies = Query.region(physEngine.world.bodies, bounds);

        for (const touched of touchedBodies) {
          if (touched.label === "enemy") {
            Body.setVelocity(touched, { x: 1 * direction, y: -3 });
          }
        }

        continue;
      }

      if (playerAttack.isAttacking && Date.now() >= playerAttack.finishTime) {
        playerAttack.isAttacking = false;
        playerAttack.finishTime = 0;
        continue;
      }
    }
  };
};
