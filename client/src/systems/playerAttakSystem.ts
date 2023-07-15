export const playerAttackSystemFactory: App.ECSSystemFactory = ({ ecs }) => {
  const query = ecs.with("body", "playerInput", "playerAttack");

  return () => {
    for (const { playerAttack, playerInput } of query) {
      if (playerInput.isAttacking && !playerAttack.isAttacking) {
        playerAttack.isAttacking = true;
        playerAttack.finishTime = Date.now() + playerAttack.duration;
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
