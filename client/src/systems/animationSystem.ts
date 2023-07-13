import { AnimatedSprite } from "pixi.js";

export const animationSystem: App.ECSSystem = ({ queries }) => {
  for (const { render } of queries.animated) {
    if (!(render instanceof AnimatedSprite)) continue;



    // render.position.set(body.position.x, body.position.y);
  }
};
