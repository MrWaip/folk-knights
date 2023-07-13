export const ecsQueries = (ecs: App.ECSWorld) => {
  const bodied = ecs.with("body");
  const controlledByInput = bodied.with("playerInput");
  const renderable = bodied.with("render");
  const animated = renderable.with("animated");

  return {
    bodied,
    controlledByInput,
    renderable,
    animated,
  };
};
