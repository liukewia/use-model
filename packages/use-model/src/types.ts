import React from 'react';
import Dispatcher from './dispatcher';

export interface ModelData {
  [key: string]: any;
}

export type Models = Record<string, () => ModelData>;

export type Model = NonNullable<Partial<Models>>;

export interface DispatcherCallbacks {
  [key: string]: Set<(e: ModelData) => void>;
}

export interface ModelProviderProp {
  models: Models;
  children?: React.ReactNode;
}

export type DispatcherInst = InstanceType<typeof Dispatcher>;

export type ModelSelector = (data: ModelData) => Partial<ModelData>;

export interface ExecutorProp {
  key: string;
  namespace: string;
  hook: () => ModelData;
  onUpdate: (val: ModelData) => void;
}
