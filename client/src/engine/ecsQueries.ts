export const ecsQueries = (ecs: App.ECSWorld) => {
  const bodied = ecs.with("body");
  const controlledByInput = bodied.with("controlledByInput");
  const renderable = bodied.with("render");

  return {
    bodied,
    controlledByInput,
    renderable,
  };
};
