import { Engine as PhysEngine } from "matter-js";
import { EntityManager } from "./entityManager";
import { RenderContainer } from "../re-exports";
import { Renderer, Ticker } from "pixi.js";

export class GameEngine {
  private stage: RenderContainer;
  private renderer: Renderer;
  private physEngine: PhysEngine;
  private entityManager: EntityManager;
  private ticker: Ticker;

  constructor() {
    this.stage = new RenderContainer();
    this.physEngine = PhysEngine.create({ gravity: { x: 0, y: 2 } });
    this.entityManager = new EntityManager(
      this.stage,
      this.physEngine,
      this.physEngine.world
    );

    this.ticker = Ticker.shared;

    this.renderer = new Renderer({
      width: 1280,
      height: 800,
      backgroundColor: 0x1099bb,
    });
  }

  public addEntity(entity: App.ECSEntity) {
    this.entityManager.addEntity(entity);
  }

  public start() {
    this.ticker.add((deltaTime) => {
      this.entityManager.updateSystems(deltaTime);

      PhysEngine.update(this.physEngine, 1000 / 60);

      this.renderer.render(this.stage);
    });

    this.ticker.start();
  }

  public get view() {
    return this.renderer.view;
  }
}
