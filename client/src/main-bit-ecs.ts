import {
  IWorld,
  Types,
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  defineQuery,
  defineSystem,
  pipe,
} from "bitecs";
import { Engine, Bodies, Body, Composite } from "matter-js";
import { Renderer, Container, Ticker, Graphics } from "pixi.js";

const bodiesMap = new Map<number, Body>();
const renderMap = new Map<number, Container>();

const engine = Engine.create();
const renderer = new Renderer({ width: 800, height: 600, background: "#000" });
const stage = new Container();
const ticker = Ticker.shared;

const world = createWorld();

const Position = defineComponent({ x: Types.f32, y: Types.f32 });
const Velocity = defineComponent({ x: Types.f32, y: Types.f32 });
const BodyComponent = defineComponent();

enum BodyTypes {
  Player,
}

function createPlayer() {
  const width = 64;
  const height = 64;
  const eId = addEntity(world);

  addComponent(world, Position, eId);
  addComponent(world, Velocity, eId);
  addComponent(world, BodyComponent, eId);

  Position.x[eId] = 0;
  Position.y[eId] = 0;

  Velocity.x[eId] = 0;
  Velocity.y[eId] = 0;

  const body = Bodies.rectangle(0, 0, width, height);
  const render = new Graphics();

  bodiesMap.set(eId, body);
  render.beginFill(0xffff00);
  render.drawRect(0, 0, width, height);
  renderMap.set(eId, render);
  Composite.add(engine.world, body);
  stage.addChild(render);
}

createPlayer();

const query = defineQuery([Velocity, BodyComponent, Position]);

const bodySystem = (world: IWorld) => {
  const ents = query(world);
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[i];
    const body = bodiesMap.get(eid);

    if (!body) continue;

    // operate directly on SoA data
    Velocity.x[eid] = body.velocity.x;
    Velocity.y[eid] = body.velocity.y;
    // operate directly on SoA data
    Position.x[eid] = body.position.x;
    Position.y[eid] = body.position.y;
  }
};

const renderSystem = (world: IWorld) => {
  const ents = query(world);
  for (let i = 0; i < ents.length; i++) {
    const eid = ents[i];
    const render = renderMap.get(eid);

    console.log(render);

    if (!render) continue;

    render.x = Position.x[eid];
    render.y = Position.y[eid];
  }
};

ticker.add((time) => {
  bodySystem(world);
  renderSystem(world);

  Engine.update(engine, ticker.elapsedMS);

  renderer.render(stage);
});

ticker.start();

document.body.appendChild(renderer.view as any);
