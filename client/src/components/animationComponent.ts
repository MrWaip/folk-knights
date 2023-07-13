import { AnimatedSprite } from "pixi.js";

type State = {
  speed: number;
  loop?: boolean;
};

export class AnimationComponent<StateName extends string | number> {
  constructor(
    private stateMap: Record<StateName, State>,
    private currentState: StateName
  ) {}

  public playIfNotPlaying() {
    
  }
}
