import React, { createContext, useContext } from 'react';

// Create Context for Preview Mode
export const PreviewModeContext = createContext(false);

// Hook to use preview mode context
export const usePreviewMode = () => {
    return useContext(PreviewModeContext);
};
