import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css'

import App from './components/App';
import store from './redux/store'
const root =document.getElementById('root')

ReactDOM.render(
<React.StrictMode>
  <Provider store={store}>
  <App/>
  </Provider>
</React.StrictMode>,root);



