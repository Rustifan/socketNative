  
import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import userReducer from "./userReducer";


const rootReducer = combineReducers({
    user: userReducer,
    location: locationReducer
});

export default rootReducer;