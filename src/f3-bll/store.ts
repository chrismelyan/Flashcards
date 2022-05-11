import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import {exampleReducer} from "./reducers/example-reducer";

const rootReducer = combineReducers({
    example: exampleReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>
// export type AppActionsType