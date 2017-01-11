import authentication from './authentication';
import signupReducer from './signupReducer';
import comment from './comment';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    authentication,
    signupReducer,
    comment
});

export default rootReducer;
