// Preview Mode Actions
export function setPreviewMode(isPreview) {
    return {
        type: "SET_PREVIEW_MODE",
        payload: isPreview
    };
}

export function togglePreviewMode() {
    return {
        type: "TOGGLE_PREVIEW_MODE"
    };
}

export function enablePreviewMode() {
    return {
        type: "SET_PREVIEW_MODE",
        payload: true
    };
}

export function disablePreviewMode() {
    return {
        type: "SET_PREVIEW_MODE",
        payload: false
    };
}
