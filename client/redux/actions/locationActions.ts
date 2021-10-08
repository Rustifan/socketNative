import { Dispatch } from "redux";
import {
  LocationDispatcherType,
  RemoveUserLocation,
  REMOVE_USER_LOCATION,
  SetError,
  SetLoading,
  SetLocation,
  SetLocationPermissionGranted,
  SetWatchLocation,
  SET_ERROR,
  SET_LOADING,
  SET_LOCATION,
  SET_LOCATION_PERMISSION_GRANTED,
  SET_WATCH_LOCATION,
  UpdateUserLocations,
  UPDATE_USER_LOCATIONS,
} from "./locationActionTypes";
import * as Location from "expo-location";
import { RootStore } from "../store";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export const watchPosition =
  (
    timeInterval: number,
    accuracy: Location.LocationAccuracy | undefined,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
  ) =>
  async (dispatch: Dispatch<LocationDispatcherType>) => {
    try {
      dispatch(setLoading(true));
      const watchLocation = await Location.watchPositionAsync(
        {
          timeInterval,
          accuracy,
        },
        (location) => {
          dispatch(setLocation(location));
          if (socket.connected) {
            socket.emit("sendLocation", location);
          }
        }
      );
      dispatch(setWatchLocation(watchLocation));
    } catch (error) {
      dispatch(setError(error as string));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const stopWatchingPosition =
  (socket: Socket<DefaultEventsMap, DefaultEventsMap>) =>
  (dispatch: Dispatch<LocationDispatcherType>, getState: () => RootStore) => {
    socket.emit("stopWatchingPosition");
    getState().location.watchLocation?.remove();
    dispatch(setWatchLocation(null));
    dispatch(setLocation(null));
  };

export const requestPermission =
  () =>
  async (
    dispatch: Dispatch<LocationDispatcherType>,
    getState: () => RootStore
  ) => {
    const permission = getState().location.locationPermissionGranted;
    if (permission) return;
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        return dispatch(setLocationPermissionGranted(true));
      }
      dispatch(setError("location permission denied"));
    } catch (error) {
      dispatch(setError(error as string));
    }
  };

export const setLoading = (loading: boolean): SetLoading => ({
  type: SET_LOADING,
  payload: loading,
});

export const setLocation = (
  location: Location.LocationObject | null
): SetLocation => ({
  type: SET_LOCATION,
  payload: location,
});

export const setWatchLocation = (
  watchLocation: { remove(): void } | null
): SetWatchLocation => ({
  type: SET_WATCH_LOCATION,
  payload: watchLocation,
});

export const setError = (error: string | null): SetError => ({
  type: SET_ERROR,
  payload: error,
});

export const setLocationPermissionGranted = (
  granted: boolean
): SetLocationPermissionGranted => ({
  type: SET_LOCATION_PERMISSION_GRANTED,
  payload: granted,
});

export const updateUserLocations = (
  payload: [{ user: string; location: Location.LocationObject }]
): UpdateUserLocations => ({
  type: UPDATE_USER_LOCATIONS,
  payload,
});

export const removeUserLocation = (user: string): RemoveUserLocation =>({
  type: REMOVE_USER_LOCATION,
  payload: user
});

