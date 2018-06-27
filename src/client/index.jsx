import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill';
import App from './app';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
);
