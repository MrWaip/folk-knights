import { Bodies, Body } from "matter-js";
import { Graphics } from "pixi.js";

export function playerFactory(): App.ECSEntity {
  const x = 100;
  const y = 0;
  const width = 50;
  const height = 50;
  const pivotX = width / 2;
  const pivotY = height / 2;

  const body = Bodies.rectangle(0, 0, width, height);
  const render = new Graphics();

  render.beginFill(0xffff);
  render.drawRect(0, 0, width, height);

  Body.setPosition(body, { x, y });
  render.x = x;
  render.y = y;
  render.pivot = { x: pivotX, y: pivotY };

  return { body, render, controlledByInput: true };
}
