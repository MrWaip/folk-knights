import { Graphics } from "pixi.js";
import { GameEngine } from "./engine/gameEngine";
import { playerFactory } from "./entities/player";
import { Bodies, Body } from "matter-js";

const gameEngine = new GameEngine();

gameEngine.addEntity(await playerFactory());

gameEngine.addEntity(
  (() => {
    const x = 400;
    const y = 630;
    const width = 300;
    const height = 20;
    const body = Bodies.rectangle(0, 0, width, height, {
      label: "floor",
      isStatic: true,
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

gameEngine.addEntity(
  (() => {
    const x = 1280 / 2;
    const y = 800;
    const width = 3280;
    const height = 20;
    const body = Bodies.rectangle(0, 0, width, height, {
      label: "floor",
      isStatic: true,
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
