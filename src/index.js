import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './Main.css';
import Timer from './Timer/Main';
import TimerCountDown from './TimerCountDown/Main.js';

ReactDOM.render(
  <React.StrictMode>
    <div className='main'>
      <Timer />
      <TimerCountDown />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
