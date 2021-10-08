import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import GeoLocation from "./components/GeoLocation";
import { getSocket } from "./socket";
import { Provider } from "react-redux";
import store from "./redux/store";
import GoogleMap from "./components/GoogleMap";
import { View, StyleSheet } from "react-native";

export default function App() {

  useEffect(() => {
    const socket = getSocket();
    socket.connect()
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <GeoLocation />
          <GoogleMap />
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontSize: 20,
  },
});