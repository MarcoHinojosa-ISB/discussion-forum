import {combineReducers} from "redux";
import userReducer from "./userReducer.js";

const mainReducer = combineReducers({
  user: userReducer
});

export default mainReducer;
