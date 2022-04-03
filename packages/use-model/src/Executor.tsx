import React, {
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { ExecutorProp } from './types';

const Executor = (props: ExecutorProp): React.ReactElement => {
  const {
    hook,
    onUpdate,
  } = props;
  const updateRef = useRef(onUpdate);
  updateRef.current = onUpdate;
  const initialLoad = useRef(false);
  const data = hook();

  useMemo(() => {
    updateRef.current(data);
    initialLoad.current = false;
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      updateRef.current(data);
    } else {
      initialLoad.current = true;
    }
  });

  return <></>;
};

export default Executor;
