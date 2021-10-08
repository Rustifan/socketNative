import React, { useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../redux/store";
import { requestPermission, stopWatchingPosition, watchPosition } from "../redux/actions/locationActions";
import { getSocket } from "../socket";

export default function GeoLocation() {
  const { error, loading, location, locationPermissionGranted } = useSelector(
    (state: RootStore) => state
  ).location;
  const dispatch = useDispatch();
  const socket = getSocket()
  useEffect(() => {
    dispatch(requestPermission());
  }, []);

  let text = "Waiting..";
  if (error) {
    text = error;
  } else if (location) {
    text = JSON.stringify(location);
  }else if (loading){
    text = "loading"
  }
  const handleStartTracking = ()=>{
    if(locationPermissionGranted){
     
      dispatch(watchPosition(2000, Location.Accuracy.BestForNavigation, socket))
    }else{
      dispatch(requestPermission());
    }

  }

  const handleStopTracking = ()=>{
    dispatch(stopWatchingPosition(socket));
  }
  return (
    <View style={styles.container}>
      
      <Button title={"start tracking"} onPress={handleStartTracking}/>
      <Button title={"stop tracking"} onPress={handleStopTracking}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 10,
  },
  paragraph: {
    fontSize: 20,
  },
});
