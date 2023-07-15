export const cameraSystemFactory: App.ECSSystemFactory = ({ stage, ecs }) => {
  const query = ecs.with("body", "playerInput");
  //   const xOffset = 200;
  //   const width = 1280 - xOffset * 2;
  //   const speed = 8;

  return () => {
    for (const { body } of query) {
      const x = body.position.x;
      //   const pivotX = stage.pivot.x;

      stage.pivot.x = x - 1280 / 2;

      //   if (x > pivotX + width + xOffset) {
      //     stage.pivot.x = pivotX + speed * deltaTime;
      //   } else if (x < pivotX + xOffset) {
      //     stage.pivot.x = pivotX - speed * deltaTime;
      //   }
    }
  };
};
