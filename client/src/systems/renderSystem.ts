export const renderSystem: App.ECSSystem = ({ queries }) => {
  for (const { body, render } of queries.renderable) {
    render.position.set(body.position.x, body.position.y);
  }
};
