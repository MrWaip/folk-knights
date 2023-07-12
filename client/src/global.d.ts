import { ecsQueries } from "./engine/ecsQueries";
import { Body } from "matter-js";
import { ECSWorld as ECS } from "./re-exports";

declare global {
  namespace App {
    type ECSQueries = ReturnType<typeof ecsQueries>;

    interface ECSEntity {
      body?: Body;
      render?: Container;
      controlledByInput?: true;
    }

    type ECSWorld = ECS<ECSEntity>;

    type ECSSystem = (ctx: { queries: ECSQueries; deltaTime: number }) => void;
  }
}
