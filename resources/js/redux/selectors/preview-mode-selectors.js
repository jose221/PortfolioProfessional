// Preview Mode Selectors
export function getPreviewMode(state) {
    return state.previewMode;
}

export function isPreviewModeActive(state) {
    return state.previewMode === true;
}

export function isEditModeActive(state) {
    return state.previewMode === false;
}
