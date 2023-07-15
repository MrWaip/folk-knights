export const ecsQueries = (ecs: App.ECSWorld) => {
  const bodied = ecs.with("body");
  const controlledByInput = bodied.with("playerInput").with("direction");
  const renderable = bodied.with("render");
  const jumpers = bodied.with("jump");
  const playerAnimation = ecs.with(
    "body",
    "render",
    "playerInput",
    "playerAnimation",
    "jump",
    "direction"
  );

  return {
    bodied,
    controlledByInput,
    renderable,
    playerAnimation,
    jumpers,
  };
};
