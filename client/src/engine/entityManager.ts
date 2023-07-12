import { Composite } from "matter-js";
import { ECSWorld, PhysWorld, RenderContainer } from "../re-exports";
import { ecsQueries } from "./ecsQueries";
import { updateSystems } from "../systems";

export class EntityManager {
  private ecs: App.ECSWorld;
  private queries: App.ECSQueries;

  constructor(private stage: RenderContainer, private physWorld: PhysWorld) {
    this.ecs = new ECSWorld();
    this.queries = ecsQueries(this.ecs);
  }

  public addEntity(entity: App.ECSEntity) {
    if (entity.body) Composite.add(this.physWorld, entity.body);

    if (entity.render) this.stage.addChild(entity.render);

    this.ecs.add(entity);
  }

  public updateSystems(deltaTime: number) {
    updateSystems({ deltaTime, queries: this.queries });
  }
}
