import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Router from './router';
import store from '@store/index';

(window as any).store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router />
    <Prompt /> //�����������window��
  </Provider>,
  document.getElementById('root')
);