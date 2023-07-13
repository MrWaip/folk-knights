import { Bodies, Body } from "matter-js";
import { AnimatedSprite } from "pixi.js";
import { getPlayerSpritesheet } from "../assets/spritesheets/playerSpritesheet";

export async function playerFactory(): Promise<App.ECSEntity> {
  const spritesheet = await getPlayerSpritesheet();
  const x = 100;
  const y = 0;
  const width = 128;
  const height = 128;

  const body = Bodies.rectangle(0, 0, width, height);
  const render = new AnimatedSprite(spritesheet.animations.idle);

  render.anchor.set(0.5, 0.5);

  Body.setPosition(body, { x, y });

  return {
    body,
    render,
    animated: true,
    playerInput: {
      direction: "right",
      isJumping: false,
      isMoving: false,
    },
  };
}
