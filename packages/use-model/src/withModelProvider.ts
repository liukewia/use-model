import React from 'react';
import ModelProvider from './ModelProvider';
import type { Models } from './types';

export default function withModelProvider(models: Models) {
  return (container: React.FC) => {
    const App = React.createElement(container);
    const AppWithModels = React.createElement(ModelProvider, { models }, App);
    return AppWithModels;
  };
}
