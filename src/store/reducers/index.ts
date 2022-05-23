import {combineReducers} from "redux";
import {logsReducer} from "./logsReducer";


export const rootReducer = combineReducers({
logs: logsReducer
})

export type RootState = ReturnType<typeof rootReducer>
