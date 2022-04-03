import React, { useContext } from 'react';
import Executor from './Executor';
import ModelContext from './ModelContext';
import type {
  ModelData,
  ModelProviderProp,
} from './types';

const ModelProvider = ({
  models,
  children,
}: ModelProviderProp): React.ReactElement => {
  const dispatcher = useContext(ModelContext);
  return (
    <ModelContext.Provider value={dispatcher}>
      {Object.entries(models).map(([namespace, modelData]) => (
        <Executor
          key={namespace}
          namespace={namespace}
          hook={modelData}
          onUpdate={(val: ModelData) => {
            dispatcher.data[namespace] = val;
            dispatcher.update(namespace);
          }}
        />
      ))}
      {children}
    </ModelContext.Provider>
  );
};

export default ModelProvider;
