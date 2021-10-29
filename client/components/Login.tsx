import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  interpolateNode,
  clockRunning,
  startClock,
  timing,
  EasingNode,
  stopClock,
  debug,
  Clock,
  Extrapolate,
  concat,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";

import Svg, { Image, Circle, ClipPath } from "react-native-svg";

type RootStackParamList = {
  Login: undefined;
  GeoLocation: undefined;
  GoogleMap: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const { width, height } = Dimensions.get("window");
const Login: React.FC<Props> = ({ navigation }) => {
  const buttonOpacity = new Value(1);

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

  const buttonY = interpolateNode(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const backgroundY = interpolateNode(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputZIndex = interpolateNode(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputOpacity = interpolateNode(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputY = interpolateNode(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateCross = interpolateNode(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  const onStateChange = event<
    HandlerStateChangeEvent<TapGestureHandlerEventPayload>
  >([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0))
          ),
        ]),
    },
  ]);

  const onXTap = event<HandlerStateChangeEvent<TapGestureHandlerEventPayload>>([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1))
          ),
          cond(state, State.END),
          Animated.call([], () => {
            Keyboard.dismiss();
          }),
        ]),
    },
  ]);

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "flex-end" }}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateY: backgroundY }],
        }}
      >
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require("../assets/prvic.jpg")}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View style={{ height: height / 3 }}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{ translateY: buttonY }],
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: "blue",
            marginVertical: 20,
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }],
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            REGISTER
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            top: 0,
            justifyContent: "center",
            zIndex: textInputZIndex,
            opacity: textInputOpacity,
            transform: [{ translateY: textInputY }],
          }}
        >
          <TapGestureHandler onHandlerStateChange={onXTap}>
            <Animated.View
              style={{
                ...styles.xContainter,
                opacity: textInputOpacity,
                transform: [{ translateY: textInputY }],
              }}
            >
              <Animated.Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  transform: [{ rotateZ: concat(rotateCross, "deg") }],
                }}
              >
                x
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>

          <TextInput
            placeholder="EMAIL"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <TextInput
            placeholder="PASSWORD"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <Animated.View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Login;

const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.2,
  elevation: 3,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    ...shadow,
  },
  textInput: {

    height: 60,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
    textAlign: "center",
    
  },
  xContainter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: width / 2 - 20,
    top: -20,
    backgroundColor: "white",
    ...shadow,
  },
});
