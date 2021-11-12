import React, { useState } from "react";
import { TextInput, StyleSheet, Text, Animated } from "react-native";

type FormObject = {
  name: string;
  placeholder: string;
  style?: Object;
  placeholderTextColor?: string;
};

interface Props {
  formObjects: FormObject[];
  submitButtonText?: string;
  onSubmit: (result: StringMap) => void;
  loading?: boolean;
}
interface StringMap {
  [key: string]: string;
}

export type FormRefFunctions = {
  clearState: () => void;
};

const Form: React.ForwardRefRenderFunction<FormRefFunctions, Props> = (
  { formObjects, onSubmit, loading=false, submitButtonText = "Submit" }: Props,
  forwardedRef
) => {
  const initialState = formObjects.reduce((acc, curr) => {
    return { ...acc, [curr.name]: "" };
  }, {} as StringMap);

  const [state, setState] = useState<StringMap>(initialState);
  React.useImperativeHandle(forwardedRef, ()=>({clearState(){
      setState(initialState);
  }}))
  return (
    <>
      {formObjects.map((obj) => (
        <TextInput
          key={obj.name}
          style={obj.style ? obj.style : styles.textInput}
          placeholder={obj.placeholder}
          placeholderTextColor={
            obj.placeholderTextColor ? obj.placeholderTextColor : "black"
          }
          onChange={(event) => {
            setState((old) => ({ ...old, [obj.name]: event.nativeEvent.text }));
          }}
          value={state[obj.name]}
        />
      ))}
      <Animated.View style={styles.button}>
        <Text
          onPress={() => onSubmit(state)}
          style={{ fontSize: 20, fontWeight: "bold" }}
        >
          {loading ? "Loading...": submitButtonText}
        </Text>
      </Animated.View>
    </>
  );
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.2,
  elevation: 3,
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
    textAlign: "center",
  },
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
});

export default React.forwardRef(Form);
