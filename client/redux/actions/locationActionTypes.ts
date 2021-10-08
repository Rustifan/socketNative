import * as Location from "expo-location";

export const SET_LOCATION = "SET_LOCATION";
export interface SetLocation {
  type: typeof SET_LOCATION;
  payload: Location.LocationObject | null;
}

export const SET_LOADING = "SET_LOADING";
export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export const SET_WATCH_LOCATION = "SET_WATCH_LOCATION";
export interface SetWatchLocation {
  type: typeof SET_WATCH_LOCATION;
  payload: { remove(): void } | null;
}

export const SET_ERROR = "SET_ERROR";
export interface SetError {
  type: typeof SET_ERROR;
  payload: string | null;
}

export const SET_LOCATION_PERMISSION_GRANTED =
  "SET_LOCATION_PERMISSION_GRANTED";
export interface SetLocationPermissionGranted {
  type: typeof SET_LOCATION_PERMISSION_GRANTED;
  payload: boolean;
}

export const UPDATE_USER_LOCATIONS = "UPDATE_USER_LOCATIONS";
export interface UpdateUserLocations{
  type: typeof UPDATE_USER_LOCATIONS;
  payload: [{user: string, location: Location.LocationObject}]
}

export const REMOVE_USER_LOCATION = "REMOVE_USER_LOCATION";
export interface RemoveUserLocation{
  type: typeof REMOVE_USER_LOCATION;
  payload: string;
}

export type LocationDispatcherType =
  | SetLocation
  | SetLoading
  | SetWatchLocation
  | SetError
  | SetLocationPermissionGranted
  | UpdateUserLocations
  | RemoveUserLocation