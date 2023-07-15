import { Events } from "matter-js";

export const jumpingSystemFactory: App.ECSSystemFactory = ({ physEngine }) => {
  let isGrounded = false;

  Events.on(physEngine, "collisionStart", ({ pairs }) => {
    for (const { bodyA, bodyB, collision } of pairs) {
      const pair = [bodyA, bodyB];
      const floor = pair.find((b) => b.label === "floor");
      const player = pair.find((b) => b.label === "player");

      if (floor && player && collision.normal.y === -1) {
        isGrounded = true;
      }
    }
  });

  Events.on(physEngine, "collisionEnd", ({ pairs }) => {
    for (const { bodyA, bodyB, collision } of pairs) {
      const pair = [bodyA, bodyB];
      const floor = pair.find((b) => b.label === "floor");
      const player = pair.find((b) => b.label === "player");

      if (floor && player && collision.normal.y === -1) {
        isGrounded = false;
      }
    }
  });

  return ({ queries }) => {
    for (const { jump, body } of queries.jumpers) {
      jump.isGrounded = isGrounded;

      if (jump.isGrounded && jump.isJumping) {
        jump.isJumping = false;
      }

      if (jump.isGrounded) {
        body.friction = 1;
      } else {
        body.friction = 0;
      }
    }
  };
};
