import { Bodies, Body } from "matter-js";
import { AnimatedSprite, Graphics } from "pixi.js";
import { getPlayerSpritesheet } from "../assets/spritesheets/playerSpritesheet";

export async function playerFactory(): Promise<App.ECSEntity> {
  const spritesheet = await getPlayerSpritesheet();
  const x = 100;
  const y = 0;
  const width = 64;
  const height = 128;

  const body = Bodies.rectangle(0, 0, width, height, {
    restitution: 0,
    friction: 1,
    inertia: Infinity,
    angle: 0,
    label: "player",
    mass: 10,
  });

  const render = new AnimatedSprite(spritesheet.animations.idle);

  const scaleX = 128 / 64;
  const scaleY = 128 / 64;
  render.scale.set(scaleX, scaleY);
  render.pivot.set(32, 96);

  Body.setPosition(body, { x, y });

  return {
    body,
    render,
    playerAnimation: {
      name: "",
      spritesheet: spritesheet,
    },
    jump: {
      isJumping: false,
      velocity: 10,
    },
    collision: { isGrounded: false },
    playerInput: {
      isMovingRight: false,
      isMovingLeft: false,
      isJumping: false,
    },
  };
}
