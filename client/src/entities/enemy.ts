import { Bodies, Body } from "matter-js";
import { Graphics } from "pixi.js";

export function enemyFactory(): App.ECSEntity {
  const x = 400;
  const y = 0;
  const width = 64;
  const height = 128;

  const body = Bodies.rectangle(0, 0, width, height, {
    restitution: 0,
    friction: 1,
    inertia: Infinity,
    angle: 0,
    label: "enemy",
    mass: 100,
  });

  const render = new Graphics();
  render.beginFill(0xff0000);
  render.drawRect(0, 0, width, height);
  render.pivot.set(width / 2, height / 2);

  Body.setPosition(body, { x, y });

  return {
    body,
    render,
  };
}
