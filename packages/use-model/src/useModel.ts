import isEqual from 'fast-deep-equal';
import {
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import modelContext from './ModelContext';
import type {
  DispatcherInst,
  ModelData,
  ModelSelector,
} from './types';

export default (namespace: string, selector: ModelSelector | undefined) => {
  const dispatcher = useContext<DispatcherInst>(modelContext);
  const selectorRef = useRef(selector);
  selectorRef.current = selector;
  const [state, setState] = useState(() => (selectorRef.current
    ? selectorRef.current(dispatcher.data[namespace])
    : dispatcher.data[namespace]));

  const stateRef = useRef(state);
  stateRef.current = state;

  const isMount = useRef(false);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    const handler = (e: ModelData) => {
      if (!isMount.current) {
        setTimeout(() => {
          dispatcher.data[namespace] = e;
          dispatcher.update(namespace);
        });
      } else {
        if (selector && selectorRef?.current) {
          const currentState = selectorRef?.current(e);
          const previousState = stateRef.current;
          if (!isEqual(currentState, previousState)) {
            setState(currentState);
          }
        } else {
          setState(e);
        }
      }
    };

    try {
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.update(namespace);
    } catch (e) {
      dispatcher.callbacks[namespace] = new Set();
      dispatcher.callbacks[namespace].add(handler);
      dispatcher.update(namespace);
    }
    return () => {
      dispatcher.callbacks[namespace].delete(handler);
    };
  }, [namespace]);

  return state;
};
