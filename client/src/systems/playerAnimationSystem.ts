import { AnimatedSprite } from "pixi.js";

enum Animation {
  Landing = "landing",
  Falling = "falling",
  Jumping = "jumping",
  Walking = "walking",
  Idle = "idle",
}

function playAnimation(
  name: Animation,
  sprite: AnimatedSprite,
  component: NonNullable<App.ECSEntity["playerAnimation"]>,
  settings: Partial<AnimatedSprite>
) {
  if (component.name === name) return;

  component.name = name;
  sprite.textures = component.spritesheet.animations[name];
  Object.assign(sprite, settings);
  sprite.gotoAndPlay(0);
}

export const playerAnimationSystem: App.ECSSystem = ({ queries }) => {
  for (const {
    render,
    jump,
    playerInput,
    playerAnimation,
  } of queries.playerAnimation) {
    if (!(render instanceof AnimatedSprite)) continue;

    if (playerInput.isMovingLeft || playerInput.isMovingRight) {
      render.scale.x =
        Math.abs(render.scale.x) * (playerInput.isMovingRight ? 1 : -1);
    }

    if (jump.isGrounded && playerAnimation.name === Animation.Falling) {
      playAnimation(Animation.Landing, render, playerAnimation, {
        loop: false,
        animationSpeed: 0.2,
      });

      continue;
    }

    if (playerAnimation.name === Animation.Landing && render.playing) {
      continue;
    }

    if (jump.isJumping) {
      playAnimation(Animation.Jumping, render, playerAnimation, {
        loop: false,
        animationSpeed: 0.05,
      });

      continue;
    }

    if (!jump.isGrounded) {
      playAnimation(Animation.Falling, render, playerAnimation, {
        loop: false,
        animationSpeed: 0,
      });

      continue;
    }

    if (playerInput.isMovingLeft || playerInput.isMovingRight) {
      playAnimation(Animation.Walking, render, playerAnimation, {
        loop: true,
        animationSpeed: 0.2,
      });

      continue;
    }

    playAnimation(Animation.Idle, render, playerAnimation, {
      loop: true,
      animationSpeed: 0.1,
    });
  }
};
