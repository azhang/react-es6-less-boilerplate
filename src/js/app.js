// This file bootstraps the entire application.

import React from 'react';

import App from './components/App.js';

// if (process.env.NODE_ENV === 'development') {
//   window.React = React; // export for http://fb.me/react-devtools
// }

// load all example data;
import ExampleData from './ExampleData';
ExampleData.init();

import { getAllProjects } from './utils/WebAPIUtils';
getAllProjects();

React.render(
  <App />,
  document.getElementById('content')
);