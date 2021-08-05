import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';


const element = (

    <Page />

);

ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}
