import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-less/semantic.less'
// import { StateProvider } from './contextStore/state.provider';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

/* ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>,
  </React.StrictMode>,
  document.getElementById('root')
); */

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
