import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider} from 'react-redux'
import { createStore} from 'redux'

import rootReducer from './store/reducers'

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


// const x = 3;
// const element = React.createElement('div', {}, 'text');

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
