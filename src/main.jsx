import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
//Redux
import { Provider } from 'react-redux';
//React Router
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);