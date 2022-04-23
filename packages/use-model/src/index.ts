import useModel from './useModel';

export default useModel;
export { useModel };

export { default as withModelProvider } from './withModelProvider';

export type {
  ModelData,
  Models,
  Model,
  DispatcherCallbacks,
  ModelProviderProp,
  DispatcherInst,
  ModelSelector,
  ExecutorProp,
} from './types';
