import { Composite } from "matter-js";
import {
  ECSWorld,
  PhysEngine,
  PhysWorld,
  RenderContainer,
} from "../re-exports";
import { ecsQueries } from "./ecsQueries";
import { registerSystems } from "../systems";

export class EntityManager {
  private ecs: App.ECSWorld;
  private queries: App.ECSQueries;
  private system: App.ECSSystem;

  constructor(
    private stage: RenderContainer,
    private physEngine: PhysEngine,
    private physWorld: PhysWorld
  ) {
    this.ecs = new ECSWorld();
    this.queries = ecsQueries(this.ecs);
    this.system = registerSystems({ physEngine: this.physEngine });
  }

  public addEntity(entity: App.ECSEntity) {
    if (entity.body) Composite.add(this.physWorld, entity.body);

    if (entity.render) this.stage.addChild(entity.render);

    this.ecs.add(entity);
  }

  public updateSystems(deltaTime: number) {
    this.system({ deltaTime, queries: this.queries });
  }
}
