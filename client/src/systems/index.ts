import { cameraSystemFactory } from "./cameraSystem";
import { jumpingSystemFactory } from "./jumpingSystem";
import { notOutWorldSystem } from "./notOutWorldSystem";
import { playerAnimationSystem } from "./playerAnimationSystem";
import { playerAttackSystemFactory } from "./playerAttakSystem";
import { playerInputSystem } from "./playerInputSystem";
import { playerMovementSystem } from "./playerMovementSystem";
import { renderSystem } from "./renderSystem";

export const registerSystems: App.ECSSystemFactory = (ctx) => {
  const jumpingSystem = jumpingSystemFactory(ctx);
  const cameraSystem = cameraSystemFactory(ctx);
  const playerAttack = playerAttackSystemFactory(ctx);

  return (ctx) => {
    playerInputSystem(ctx);
    playerAttack(ctx);
    cameraSystem(ctx);
    playerMovementSystem(ctx);
    jumpingSystem(ctx);
    notOutWorldSystem(ctx);
    renderSystem(ctx);
    playerAnimationSystem(ctx);
  };
};
