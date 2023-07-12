import { movementSystem } from "./movementSystem";
import { renderSystem } from "./renderSystem";

export const updateSystems: App.ECSSystem = (ctx) => {
  movementSystem(ctx);
  renderSystem(ctx);
};
