import { Body } from "matter-js";

export const notOutWorldSystem: App.ECSSystem = ({ queries }) => {
  for (const { body } of queries.bodied.with("playerInput")) {
    if (body.bounds.min.x > 1280 || body.bounds.max.x < 0) {
      // Body.setPosition(body, { x: 100, y: 0 });
      // Body.setVelocity(body, { x: 0, y: 0 });
    }
    if (body.bounds.min.y > 800 || body.bounds.max.y < 0) {
      Body.setPosition(body, { x: 100, y: 0 });
      Body.setVelocity(body, { x: 0, y: 0 });
    }
  }
};
