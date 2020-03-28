import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import APIService from './services/APIService';
import { APIServiceProvider } from './components/APIService-context'

const apiService = new APIService();

ReactDOM.render(
  <React.StrictMode>
    <APIServiceProvider value={apiService}>
      <App />
    </APIServiceProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
