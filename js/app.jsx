// This file bootstraps the entire application.

import React from 'react';

import App from './components/App';

if (process.env.NODE_ENV === 'development') {
  window.React = React; // export for http://fb.me/react-devtools
}

React.render(
  <App />,
  document.body
);