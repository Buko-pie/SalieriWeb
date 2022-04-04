import { combineReducers } from "redux";
import bankReducer from "./bankReducer"
import hoverReducer from "./hoverReducer"

const reducers = combineReducers({
  bank: bankReducer,
  hover: hoverReducer
})

export default reducers

export type State = ReturnType<typeof reducers>