import { movementSystem } from "./playerInputSystem";
import { renderSystem } from "./renderSystem";

export const updateSystems: App.ECSSystem = (ctx) => {
  movementSystem(ctx);
  renderSystem(ctx);
};
