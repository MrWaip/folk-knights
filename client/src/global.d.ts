import { ecsQueries } from "./engine/ecsQueries";
import { Body } from "matter-js";
import { ECSWorld as ECS, PhysEngine } from "./re-exports";
import { PlayerInputComponent } from "./components/playerInputComponent";
import { Container, Spritesheet } from "pixi.js";
import { PlayerAttackComponent } from "./components/PlayerAttackComponent";

declare global {
  namespace App {
    type ECSQueries = ReturnType<typeof ecsQueries>;

    interface ECSEntity {
      body?: Body;
      position?: { x: number; y: number };
      velocity?: { x: number; y: number };
      direction?: -1 | 1;
      playerInput?: PlayerInputComponent;
      jump?: { isJumping: boolean; velocity: number; isGrounded: boolean };
      collision?: { isGrounded: boolean };
      render?: Container;
      playerAttack?: PlayerAttackComponent;
      playerAnimation?: {
        spritesheet: Spritesheet;
        name: string;
      };
    }

    type ECSWorld = ECS<ECSEntity>;

    type ECSSystem = (ctx: { queries: ECSQueries; deltaTime: number }) => void;

    type ECSSystemFactory = (ctx: {
      physEngine: PhysEngine;
      stage: Container;
      ecs: ECSWorld;
    }) => ECSSystem;
  }
}
