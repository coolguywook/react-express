import authentication from './authentication';
import signupReducer from './signupReducer';
import comment from './comment';
import search from './search';
import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

const rootReducer = combineReducers({
    authentication,
    signupReducer,
    comment,
    search,
    i18n: i18nReducer
});

export default rootReducer;
