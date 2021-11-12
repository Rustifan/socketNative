import * as React from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../redux/store";
import GeoLocation from "./GeoLocation";

export default function GoogleMap() {

    const { userLocations } = useSelector(
        (state: RootStore) => state
      ).location;
    const locations = Array.from(userLocations)
   

  return (
    <>
    <View style={styles.container}>
      <MapView
         style={styles.map}>
        {locations.map(([user, location])=>(
          <Marker
          key={user} 
          coordinate={{longitude: location.coords.longitude, latitude: location.coords.latitude}}/>
          ))}
        </MapView>
        <GeoLocation/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    zIndex: -1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
