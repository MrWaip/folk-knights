import { Vector } from "matter-js";

export const renderSystem: App.ECSSystem = ({ queries }) => {
  for (const { body, render } of queries.renderable) {
    const sizes = Vector.add(
      body.bounds.min,
      Vector.div(Vector.sub(body.bounds.max, body.bounds.min), 2)
    );

    render.position.set(sizes.x, sizes.y);
    render.rotation = body.angle;
  }
};
