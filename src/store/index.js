import {createStore} from "redux";
import mainReducer from "./reducers/index.js";

const store = createStore(mainReducer);

export default store;
