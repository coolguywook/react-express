import authentication from './authentication';
import signupReducer from './signupReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication,
    signupReducer
});

export default rootReducer;
