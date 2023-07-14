import { AnimatedSprite } from "pixi.js";

export const playerAnimationSystem: App.ECSSystem = ({ queries }) => {
  for (const {
    body,
    render,
    jump,
    playerInput,
    playerAnimation,
  } of queries.playerAnimation) {
    if (!(render instanceof AnimatedSprite)) continue;

    const name = playerAnimation.name;

    if (jump.isGrounded && (name === "falling" || name === "prizeml")) {
      if (name === "prizeml") continue;

      playerAnimation.name = "prizeml";
      render.loop = false;
      render.textures = playerAnimation.spritesheet.animations.jump;
      render.animationSpeed = 0.2;
      render.gotoAndPlay(2);

      render.onFrameChange = (currentFrame) => {
        if (currentFrame === 5) {
          playerAnimation.name = "";
          render.onFrameChange = undefined;
          console.log(playerAnimation, "");
        }
      };

      continue;
    }

    if (playerInput.isMovingLeft || playerInput.isMovingRight) {
      render.scale.x =
        Math.abs(render.scale.x) * (playerInput.isMovingRight ? 1 : -1);
    }

    if (jump.isJumping) {
      if (name === "jump") continue;

      playerAnimation.name = "jump";
      render.loop = false;
      render.textures = playerAnimation.spritesheet.animations.jump;
      render.animationSpeed = 0.05;
      render.gotoAndPlay(0);
      continue;
    }

    if (!jump.isGrounded) {
      if (name === "falling") continue;

      playerAnimation.name = "falling";
      render.loop = false;
      render.textures = playerAnimation.spritesheet.animations.jump;
      render.gotoAndPlay(2);
      render.animationSpeed = 0;
      continue;
    }

    if (playerInput.isMovingLeft || playerInput.isMovingRight) {
      if (name === "walk") continue;
      playerAnimation.name = "walk";
      render.loop = true;
      render.textures = playerAnimation.spritesheet.animations.walk;
      render.animationSpeed = 0.1;
      render.gotoAndPlay(0);
      continue;
    }

    if (name !== "idle") {
      playerAnimation.name = "idle";
      render.loop = true;

      render.textures = playerAnimation.spritesheet.animations.idle;
      render.animationSpeed = 0.1;
      render.gotoAndPlay(0);
    }
  }
};
