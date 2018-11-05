import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { Provider, connect } from 'react-redux';
import {searchRobots} from './reducers';

const store = createStore(searchRobots)

ReactDOM.render(<Provider>
                    <App store = { store }/>
                </Provider>, document.getElementById('root'));
serviceWorker.unregister();
