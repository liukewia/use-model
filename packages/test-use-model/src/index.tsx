import { withModelProvider } from '@liukewia/use-model';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import models from './models';
import './index.css';

const appWithModels = withModelProvider(models)(App);

ReactDOM.render(
  <React.StrictMode>{appWithModels}</React.StrictMode>,
  document.getElementById('root'),
);
