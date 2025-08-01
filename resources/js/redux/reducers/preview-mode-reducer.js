// Preview Mode Reducer
function previewMode(state = false, action = {}) {
    switch (action.type) {
        case "SET_PREVIEW_MODE":
            return action.payload;
            
        case "TOGGLE_PREVIEW_MODE":
            return !state;
            
        default:
            return state;
    }
}

export default previewMode;
