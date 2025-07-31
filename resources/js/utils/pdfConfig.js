import * as pdfjs from 'pdfjs-dist';

/**
 * Configure PDF.js worker using local file to avoid browser security restrictions
 * with external CDN URLs and dynamic ES6 module imports.
 */

// Set the worker source to the local file served by our application
const LOCAL_WORKER_URL = '/js/pdf.worker.min.mjs';

// Configure PDF.js to use the local worker file
pdfjs.GlobalWorkerOptions.workerSrc = LOCAL_WORKER_URL;

console.log('PDF.js worker configured with local file:', LOCAL_WORKER_URL);

/**
 * Verify that the PDF.js worker is properly configured
 * @returns {boolean} True if worker is configured
 */
export function isPDFWorkerConfigured() {
    return !!pdfjs.GlobalWorkerOptions.workerSrc;
}

/**
 * Get the current worker source URL
 * @returns {string} Current worker source URL
 */
export function getPDFWorkerSrc() {
    return pdfjs.GlobalWorkerOptions.workerSrc;
}

/**
 * Manually reconfigure the PDF.js worker (for debugging purposes)
 * @returns {boolean} True if reconfiguration was successful
 */
export function manuallyRetryPDFConfig() {
    try {
        pdfjs.GlobalWorkerOptions.workerSrc = LOCAL_WORKER_URL;
        console.log('PDF.js worker manually reconfigured:', LOCAL_WORKER_URL);
        return true;
    } catch (error) {
        console.error('Failed to manually reconfigure PDF.js worker:', error);
        return false;
    }
}

// Export the configured pdfjs for use in components
export { pdfjs };
