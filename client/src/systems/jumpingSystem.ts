import { Events } from "matter-js";

export const jumpingSystemFactory: App.ECSSystemFactory = ({ physEngine }) => {
  let isGrounded = false;

  Events.on(physEngine, "collisionStart", ({ pairs }) => {
    for (const { bodyA, bodyB } of pairs) {
      if (
        (bodyA.label === "floor" && bodyB.label === "player") ||
        (bodyB.label === "floor" && bodyA.label === "player")
      ) {
        isGrounded = true;
      }
    }
  });

  Events.on(physEngine, "collisionEnd", ({ pairs }) => {
    for (const { bodyA, bodyB } of pairs) {
      if (
        (bodyA.label === "floor" && bodyB.label === "player") ||
        (bodyB.label === "floor" && bodyA.label === "player")
      ) {
        isGrounded = false;
      }
    }
  });

  return ({ queries }) => {
    for (const { jump } of queries.jumpers) {
      jump.isGrounded = isGrounded;
      if (isGrounded && jump.isJumping) {
        jump.isJumping = false;
      }
    }
  };
};
