import { createRoot } from 'react-dom/client';

/**
 * Utility function to render React components using the createRoot API (React 18+)
 *
 * @param {React.Component} Component - The React component to render
 * @param {HTMLElement} container - The DOM element to render the component into
 * @param {Object} props - The props to pass to the component
 */
export const renderComponent = (Component, container, props = {}) => {
  if (!container) return;

  const root = createRoot(container);
  root.render(<Component {...props} />);
};

export default renderComponent;
