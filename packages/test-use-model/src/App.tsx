/* eslint-disable no-plusplus */
// @ts-nocheck
import { useModel } from '@liukewia/use-model';
import React, {
  useMemo,
  useEffect,
} from 'react';
import './App.css';
let ids = 0;
function App(props): React.ReactElement {
  ids++;
  console.log('appids:', ids);
  const {
    user,
    signin,
    signout,
  } = useModel('auth');

  useMemo(() => {
    console.log('parentmemo1');
  });

  useEffect(() => {
    console.log('parentEffectcreate1');
    return () => {
      console.log('parentEffectdestore1');
    };
  });

  useMemo(() => {
    console.log('parnetmemo2');
  });

  useEffect(() => {
    console.log('parentEffectcreate2');
    return () => {
      console.log('parentEffectdestore2');
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <p
          onClick={() => {
            user ? signout() : signin('eric');
          }}
        >
          欢迎{user}来到德莱联盟
        </p>
      </header>
    </div>
  );
}

export default App;
