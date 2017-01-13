import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {App, Home, Signin, Signup, Wall} from 'containers';
import translationsObject from 'translations';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducers from 'reducers';
import thunk from 'redux-thunk';
import {loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';

const store = createStore(rootReducers, applyMiddleware(thunk));

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));

ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="signin" component={Signin}/>
            <Route path="signup" component={Signup}/>
            <Route path="wall/:username" component={Wall}/>
        </Route>
    </Router>
</Provider>, document.getElementById('root'));
