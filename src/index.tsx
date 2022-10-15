import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Router from './router';
import store from '@store/index';

(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router />
    <Prompt /> //将此组件挂在window上
  </Provider>,
  document.getElementById('root')
);