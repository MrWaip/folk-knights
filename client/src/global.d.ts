import { ecsQueries } from "./engine/ecsQueries";
import { Body } from "matter-js";
import { ECSWorld as ECS } from "./re-exports";
import { PlayerInputComponent } from "./components/playerInputComponent";

declare global {
  namespace App {
    type ECSQueries = ReturnType<typeof ecsQueries>;

    interface ECSEntity {
      body?: Body;
      render?: Container;
      playerInput?: PlayerInputComponent;
      animated?: true;
    }

    type ECSWorld = ECS<ECSEntity>;

    type ECSSystem = (ctx: { queries: ECSQueries; deltaTime: number }) => void;
  }
}
