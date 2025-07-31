import { combineReducers } from "redux";
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
    data
});
export default reducers;
