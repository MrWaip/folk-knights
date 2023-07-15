import { Graphics } from "pixi.js";
import { GameEngine } from "../src/engine/gameEngine";
import { playerFactory } from "../src/entities/player";
import { Bodies, Body } from "matter-js";

const gameEngine = new GameEngine();

gameEngine.addEntity(await playerFactory());

gameEngine.addEntity(
  (() => {
    const x = 150;
    const y = 600;
    const width = 300;
    const height = 20;
    const body = Bodies.rectangle(0, 0, width, height, {
      isStatic: true,
      frictionAir: 0.01,
    });
    const render = new Graphics();
    render.beginFill(0xffff00);
    render.drawRect(0, 0, width, height);

    Body.setPosition(body, { x, y });

    render.x = x;
    render.y = y;
    render.pivot = { x: width / 2, y: height / 2 };
    return {
      render,
      body,
    };
  })()
);

document.body.appendChild(gameEngine.view as any);

gameEngine.start();
