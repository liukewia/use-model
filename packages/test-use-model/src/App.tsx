import useModel from '@liukewia/use-model';
import React from 'react';
import './App.css';

function Inside() {
  const {
    user,
    signin,
    signout,
  } = useModel('auth');

  return (
    <div onClick={() => (user ? signout() : signin('eric'))}>
      {user ? `Logged in as ${user}` : 'Not logged in'}
    </div>
  );
}

function Outside() {
  return <div>outside</div>;
}

function App(): React.ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Inside />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Outside />
    </div>
  );
}

export default App;
