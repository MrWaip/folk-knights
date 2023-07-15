export const playerDirectionSystemFactory: App.ECSSystemFactory = ({ ecs }) => {
  const query = ecs.with("playerInput", "direction");

  return () => {
    for (const entity of query) {
      if (entity.playerAttack?.isAttacking) continue;

      if (entity.playerInput.isMovingRight) {
        entity.direction = 1;
      }

      if (entity.playerInput.isMovingLeft) {
        entity.direction = -1;
      }
    }
  };
};
