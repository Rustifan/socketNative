import Animated, { block, clockRunning, cond, debug, EasingNode, set, startClock, stopClock, timing, Value } from "react-native-reanimated";

const runTiming = (clock: Animated.Clock, value: any, dest: number) => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: EasingNode.inOut(EasingNode.ease),
    };

    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, debug("stop clock", stopClock(clock))),
      state.position,
    ]);
  };

  export default runTiming;