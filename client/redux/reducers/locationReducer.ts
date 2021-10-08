import * as Location from 'expo-location';
import { LocationDispatcherType, REMOVE_USER_LOCATION, SET_ERROR, SET_LOADING, SET_LOCATION, SET_LOCATION_PERMISSION_GRANTED, SET_WATCH_LOCATION, UPDATE_USER_LOCATIONS } from '../actions/locationActionTypes';

interface DefaultState{
    watchLocation: {remove(): void} | null;
    location: Location.LocationObject | null;
    loading: boolean;
    error: null | string;
    locationPermissionGranted: boolean;
    userLocations: Map<string, Location.LocationObject>;
}

const defaultState = {
    watchLocation: null,
    location: null,
    loading: false,
    error: null,
    locationPermissionGranted: false,
    userLocations: new Map<string, Location.LocationObject>()
}

const locationReducer = (state: DefaultState = defaultState, action: LocationDispatcherType): DefaultState=>{
    switch(action.type){
        case SET_LOCATION:
            return {...state, location: action.payload}
        case SET_WATCH_LOCATION:
            return {...state, watchLocation: action.payload}
        case SET_LOADING:
            return {...state, loading: action.payload}
        case SET_ERROR:
            return {...state, error: action.payload}
        case SET_LOCATION_PERMISSION_GRANTED:
            return {...state, locationPermissionGranted: action.payload}
        case UPDATE_USER_LOCATIONS:
            const newLocations = action.payload.reduce((newMap, curr)=>{
                return newMap.set(curr.user, curr.location)
                
            }, state.userLocations)
            return {...state, userLocations: newLocations}
        case REMOVE_USER_LOCATION:
            const removeMap = state.userLocations
            if(removeMap.has(action.payload)){
                removeMap.delete(action.payload);
            }
            return {...state, userLocations: removeMap} 
        default:
            return state;
    }
}

            

export default locationReducer;
    
   

