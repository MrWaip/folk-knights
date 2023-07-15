import { Bodies, Body } from "matter-js";
import { AnimatedSprite } from "pixi.js";
import { getPlayerSpritesheet } from "../assets/spritesheets/playerSpritesheet";

export async function playerFactory(): Promise<App.ECSEntity> {
  const spritesheet = await getPlayerSpritesheet();
  const x = 100;
  const y = 0;
  const width = 64;
  const height = 128;

  const mainBody = Bodies.rectangle(0, 0, width, height, {
    isStatic: true,
    angle: 0,
    label: "playerBody",
  });

  const sensor = Bodies.rectangle(0, 54, width, 20, {
    isSensor: true,
    isStatic: true,
    label: "playerSensor",
    angle: 0,
  });

  const body = Body.create({
    parts: [mainBody, sensor],
    restitution: 0,
    friction: 0.7,
    inertia: Infinity,
    angle: 0,
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
    direction: 1,
    playerAnimation: {
      name: "",
      spritesheet: spritesheet,
    },
    jump: {
      isJumping: false,
      velocity: 10,
      isGrounded: false,
    },
    collision: { isGrounded: false },
    playerInput: {
      isRunning: false,
      isMovingRight: false,
      isMovingLeft: false,
      isJumping: false,
      isAttacking: false,
    },
    playerAttack: {
      duration: 300,
      finishTime: 0,
      isAttacking: false,
    },
  };
}
