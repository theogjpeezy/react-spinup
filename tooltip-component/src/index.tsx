import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { Tooltip } from './Tooltip';

ReactDOM.render(
  <React.StrictMode>
    <div><Tooltip text="The book you're reading now" tooltipRenderAction="click" direction="down">React Quickly</Tooltip> was published in 2017.  <Tooltip text="It's kinda old actually" tooltipRenderAction="hover" direction="up">It's awesome</Tooltip></div>
  </React.StrictMode>,
  document.getElementById('tooltip')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
