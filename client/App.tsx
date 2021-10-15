import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import GeoLocation from "./components/GeoLocation";
import GoogleMap from "./components/GoogleMap";
import { Asset } from "expo-asset";
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  state = {
    isReady: false
  }
  
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/prvic.jpg'),
     
    ]);
    await Promise.all([imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <>
        <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
              <Stack.Screen name="GeoLocation" component={GeoLocation} />
              <Stack.Screen name="GoogleMap" component={GoogleMap} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </>
    );
  }
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
