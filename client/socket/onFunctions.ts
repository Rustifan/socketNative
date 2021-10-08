import * as Location from 'expo-location';
import { updateUserLocations, removeUserLocation } from '../redux/actions/locationActions';
import store from '../redux/store';

export const recieveLocations = (locations: [{user: string, location: Location.LocationObject}]) => {
    store.dispatch(updateUserLocations(locations))
}

export const removeLocation = (user: string)=>{
    store.dispatch(removeUserLocation(user))
}