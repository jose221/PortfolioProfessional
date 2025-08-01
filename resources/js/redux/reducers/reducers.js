import { combineReducers } from "redux";
import previewMode from "./preview-mode-reducer.js";
function data(state = {}, action = {}) {
    switch (action.type) {
        case "ADD_TODO":
            const copy = action.payload;

            return copy;
        default:
            return state;
    }
}
const reducers = combineReducers({
    data,
    previewMode
});
export default reducers;
